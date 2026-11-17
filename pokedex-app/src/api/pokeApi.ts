/**
 * Serviço de dados da PokéAPI (v2).
 * Não utiliza dados simulados: todos os Pokémon são consultados pela rede.
 * Promessas de GET ficam em cache durante esta execução do aplicativo.
 */
import { statLabels } from '../constants/pokemonTheme';
import { PokemonDetails, PokemonSummary, PokemonTypeName } from '../types/pokemon';
import { capitalize, decimetersToMeters, hectogramsToKg, sanitizeFlavorText } from '../utils/format';

const API_BASE = 'https://pokeapi.co/api/v2';
const REQUEST_TIMEOUT_MS = 15000;

export type PokemonIndexEntry = { id: number; name: string };

type NamedResource = { name: string; url: string };
type ResourceList = { count: number; results: NamedResource[] };
type TypeResponse = { pokemon: Array<{ pokemon: NamedResource }> };

type PokemonApi = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number | null;
  types: Array<{ slot: number; type: NamedResource }>;
  stats: Array<{ base_stat: number; stat: NamedResource }>;
  abilities: Array<{ ability: NamedResource }>;
  sprites?: {
    front_default?: string | null;
    other?: {
      'official-artwork'?: { front_default?: string | null; front_shiny?: string | null };
    };
  };
};

type SpeciesApi = {
  names?: Array<{ name: string; language: NamedResource }>;
  genera?: Array<{ genus: string; language: NamedResource }>;
  flavor_text_entries?: Array<{ flavor_text: string; language: NamedResource }>;
  habitat?: NamedResource | null;
  shape?: NamedResource | null;
  capture_rate?: number;
  is_legendary?: boolean;
  is_mythical?: boolean;
};

// Cache de promessas: chamadas simultâneas para a mesma URL fazem só um fetch.
const requestCache = new Map<string, Promise<unknown>>();

async function requestJson<T>(path: string): Promise<T> {
  const existing = requestCache.get(path);
  if (existing) return existing as Promise<T>;

  const promise = (async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(`${API_BASE}/${path}`, { signal: controller.signal });
      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? 'Pokémon não encontrado na PokeAPI.'
            : `PokeAPI indisponível (HTTP ${response.status}).`
        );
      }
      return (await response.json()) as T;
    } catch (error) {
      if (controller.signal.aborted) {
        throw new Error('A PokeAPI demorou demais para responder. Tente novamente.');
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  })();

  requestCache.set(path, promise);
  try {
    return await promise;
  } catch (error) {
    // Nunca guarda erros no cache: o usuário pode tentar novamente.
    requestCache.delete(path);
    throw error;
  }
}

function idFromUrl(url: string): number {
  const pieces = url.split('/').filter(Boolean);
  return Number(pieces[pieces.length - 1]);
}

/** Lista nacional de espécies: consulta real, carregada uma vez e ordenada por ID. */
export async function fetchPokemonIndex(): Promise<PokemonIndexEntry[]> {
  const response = await requestJson<ResourceList>('pokemon-species?limit=2000&offset=0');
  return response.results
    .map((item) => ({ id: idFromUrl(item.url), name: item.name }))
    .filter((item) => Number.isInteger(item.id) && item.id > 0)
    .sort((a, b) => a.id - b.id);
}

/** Filtra todas as espécies pelo tipo, sem depender dos cards já carregados. */
export async function fetchPokemonTypeIndex(
  type: PokemonTypeName,
  species: PokemonIndexEntry[]
): Promise<PokemonIndexEntry[]> {
  const response = await requestJson<TypeResponse>(`type/${type}`);
  const validIds = new Set(species.map((item) => item.id));
  const matchingIds = new Set(
    response.pokemon.map((item) => idFromUrl(item.pokemon.url)).filter((id) => validIds.has(id))
  );
  return species.filter((item) => matchingIds.has(item.id));
}

function preferredLocalizedValue<T extends { language: NamedResource }>(
  values: T[] | undefined,
  read: (value: T) => string
): string | null {
  if (!values?.length) return null;
  const preferred = ['pt-BR', 'pt', 'en'];
  for (const language of preferred) {
    const entry = values.find((item) => item.language.name.toLowerCase() === language.toLowerCase());
    if (entry) return read(entry);
  }
  return null;
}

function mapPokemon(api: PokemonApi): PokemonSummary {
  const art = api.sprites?.other?.['official-artwork'];
  const fallbackImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${api.id}.png`;
  return {
    id: api.id,
    name: api.name,
    displayName: capitalize(api.name.replaceAll('-', ' ')),
    image: art?.front_default || api.sprites?.front_default || fallbackImage,
    shinyImage: art?.front_shiny || null,
    sprite: api.sprites?.front_default || fallbackImage,
    types: [...api.types].sort((a, b) => a.slot - b.slot).map((item) => item.type.name as PokemonTypeName),
    height: decimetersToMeters(api.height),
    weight: hectogramsToKg(api.weight),
    baseExperience: api.base_experience ?? null,
    stats: api.stats.map((item) => ({
      name: item.stat.name,
      label: statLabels[item.stat.name] ?? capitalize(item.stat.name),
      value: item.base_stat
    })),
    abilities: api.abilities.map((item) => capitalize(item.ability.name.replaceAll('-', ' ')))
  };
}

export async function fetchPokemonByNameOrId(key: string | number): Promise<PokemonSummary> {
  const normalized = String(key).trim().toLowerCase();
  if (!normalized) throw new Error('Informe um nome ou número.');
  const api = await requestJson<PokemonApi>(`pokemon/${encodeURIComponent(normalized)}`);
  return mapPokemon(api);
}

/** Lotes pequenos (6 por vez) para respeitar a política de uso da PokéAPI. */
export async function fetchPokemonBatch(items: PokemonIndexEntry[]): Promise<PokemonSummary[]> {
  const found: PokemonSummary[] = [];
  for (let i = 0; i < items.length; i += 6) {
    const chunk = items.slice(i, i + 6);
    // Falhas não são ignoradas, pois isso pularia Pokémon no catálogo.
    const results = await Promise.all(chunk.map((entry) => fetchPokemonByNameOrId(entry.id)));
    found.push(...results);
  }
  return found.sort((a, b) => a.id - b.id);
}

export async function fetchPokemonDetails(pokemon: PokemonSummary): Promise<PokemonDetails> {
  const [api, species] = await Promise.all([
    requestJson<PokemonApi>(`pokemon/${pokemon.id}`),
    requestJson<SpeciesApi>(`pokemon-species/${pokemon.id}`)
  ]);
  const mapped = mapPokemon(api);
  const localizedName = preferredLocalizedValue(species.names, (item) => item.name);
  const description = preferredLocalizedValue(species.flavor_text_entries, (item) => item.flavor_text);
  const genus = preferredLocalizedValue(species.genera, (item) => item.genus);

  return {
    ...mapped,
    displayName: localizedName || mapped.displayName,
    description: description ? sanitizeFlavorText(description) : 'Descrição ainda não disponível.',
    genus: genus || 'Não informado',
    habitat: species.habitat?.name ? capitalize(species.habitat.name) : 'Não informado',
    shape: species.shape?.name ? capitalize(species.shape.name) : 'Não informado',
    captureRate: species.capture_rate ?? null,
    isLegendary: Boolean(species.is_legendary),
    isMythical: Boolean(species.is_mythical)
  };
}
