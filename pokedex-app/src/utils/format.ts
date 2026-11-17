export const formatPokemonId = (id: number) => `#${String(id).padStart(3, '0')}`;

export const capitalize = (value: string) =>
  value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

export const sanitizeFlavorText = (text: string) =>
  text.replace(/\f/g, ' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

export const hectogramsToKg = (value: number) => Number((value / 10).toFixed(1));
export const decimetersToMeters = (value: number) => Number((value / 10).toFixed(1));
