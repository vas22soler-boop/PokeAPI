export type PokemonTypeName =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy';

export type PokemonSummary = {
  id: number;
  name: string;
  displayName: string;
  image: string;
  shinyImage: string | null;
  sprite: string;
  types: PokemonTypeName[];
  height: number;
  weight: number;
  baseExperience: number | null;
  stats: PokemonStat[];
  abilities: string[];
};

export type PokemonDetails = PokemonSummary & {
  description: string;
  genus: string;
  habitat: string;
  shape: string;
  captureRate: number | null;
  isLegendary: boolean;
  isMythical: boolean;
};

export type PokemonStat = {
  name: string;
  label: string;
  value: number;
};

export type ApiListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
};
