import { PokemonTypeName } from '../types/pokemon';

export const typeLabels: Record<PokemonTypeName, string> = {
  normal: 'Normal',
  fire: 'Fogo',
  water: 'Água',
  electric: 'Elétrico',
  grass: 'Planta',
  ice: 'Gelo',
  fighting: 'Lutador',
  poison: 'Venenoso',
  ground: 'Terrestre',
  flying: 'Voador',
  psychic: 'Psíquico',
  bug: 'Inseto',
  rock: 'Pedra',
  ghost: 'Fantasma',
  dragon: 'Dragão',
  dark: 'Sombrio',
  steel: 'Aço',
  fairy: 'Fada'
};

export const typeColors: Record<PokemonTypeName, string> = {
  normal: '#A8A77A',
  fire: '#F97316',
  water: '#3B82F6',
  electric: '#FACC15',
  grass: '#22C55E',
  ice: '#67E8F9',
  fighting: '#DC2626',
  poison: '#A855F7',
  ground: '#D97706',
  flying: '#818CF8',
  psychic: '#EC4899',
  bug: '#84CC16',
  rock: '#A16207',
  ghost: '#6D28D9',
  dragon: '#7C3AED',
  dark: '#475569',
  steel: '#64748B',
  fairy: '#F472B6'
};

export const typeSoftColors: Record<PokemonTypeName, string> = {
  normal: '#F5F5DC',
  fire: '#FFEDD5',
  water: '#DBEAFE',
  electric: '#FEF9C3',
  grass: '#DCFCE7',
  ice: '#CFFAFE',
  fighting: '#FEE2E2',
  poison: '#F3E8FF',
  ground: '#FEF3C7',
  flying: '#E0E7FF',
  psychic: '#FCE7F3',
  bug: '#ECFCCB',
  rock: '#FEF3C7',
  ghost: '#EDE9FE',
  dragon: '#EDE9FE',
  dark: '#E2E8F0',
  steel: '#F1F5F9',
  fairy: '#FCE7F3'
};

export const allTypes = Object.keys(typeLabels) as PokemonTypeName[];

export const statLabels: Record<string, string> = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  'special-attack': 'Ataque Esp.',
  'special-defense': 'Defesa Esp.',
  speed: 'Velocidade'
};
