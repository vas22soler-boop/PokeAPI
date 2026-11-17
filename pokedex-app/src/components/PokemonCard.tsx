import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { typeColors, typeLabels, typeSoftColors } from '../constants/pokemonTheme';
import { PokemonSummary } from '../types/pokemon';
import { formatPokemonId } from '../utils/format';

type Props = {
  pokemon: PokemonSummary;
  onPress: (pokemon: PokemonSummary) => void;
};

function PokemonCardComponent({ pokemon, onPress }: Props) {
  const mainType = pokemon.types[0];
  const accent = typeColors[mainType];
  const soft = typeSoftColors[mainType];

  return (
    <Pressable
      onPress={() => onPress(pokemon)}
      style={({ pressed }) => [styles.card, { backgroundColor: soft }, pressed && styles.pressed]}
    >
      <View style={[styles.decorativeCircle, { borderColor: accent }]} />
      <View style={styles.content}>
        <Text style={styles.number}>{formatPokemonId(pokemon.id)}</Text>
        <Text numberOfLines={1} style={styles.name}>
          {pokemon.displayName}
        </Text>
        <View style={styles.tags}>
          {pokemon.types.map((type) => (
            <View key={type} style={[styles.tag, { backgroundColor: typeColors[type] }]}>
              <Text style={styles.tagText}>{typeLabels[type]}</Text>
            </View>
          ))}
        </View>
      </View>
      <Image source={{ uri: pokemon.image }} style={styles.image} resizeMode="contain" />
    </Pressable>
  );
}

export const PokemonCard = memo(PokemonCardComponent);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 160,
    borderRadius: 20,
    margin: 7,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 4
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.88
  },
  content: {
    padding: 16,
    paddingRight: 82,
    zIndex: 2
  },
  number: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 8
  },
  name: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.4,
    marginBottom: 12
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    alignItems: 'flex-start'
  },
  tag: {
    height: 24,
    borderRadius: 999,
    paddingHorizontal: 9,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 11,
    lineHeight: 12,
    fontWeight: '800',
    includeFontPadding: false
  },
  image: {
    position: 'absolute',
    right: -2,
    bottom: -4,
    width: 150,
    height: 150,
    zIndex: 3
  },
  decorativeCircle: {
    position: 'absolute',
    right: -50,
    bottom: -68,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 24,
    opacity: 0.16
  }
});
