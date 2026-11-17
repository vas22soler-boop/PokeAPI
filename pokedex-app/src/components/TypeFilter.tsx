import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { allTypes, typeColors, typeLabels } from '../constants/pokemonTheme';
import { PokemonTypeName } from '../types/pokemon';

type Props = {
  selectedType: PokemonTypeName | 'all';
  onSelect: (type: PokemonTypeName | 'all') => void;
};

const options: Array<PokemonTypeName | 'all'> = ['all', ...allTypes];

export function TypeFilter({ selectedType, onSelect }: Props) {
  return (
    <FlatList
      horizontal
      data={options}
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => {
        const selected = selectedType === item;
        const color = item === 'all' ? '#0F172A' : typeColors[item];
        const label = item === 'all' ? 'Todos' : typeLabels[item];

        return (
          <Pressable
            onPress={() => onSelect(item)}
            style={({ pressed }) => [
              styles.option,
              { borderColor: selected ? color : '#E2E8F0', backgroundColor: selected ? color : '#FFFFFF' },
              pressed && styles.pressed
            ]}
          >
            <View style={[styles.dot, { backgroundColor: selected ? '#FFFFFF' : color }]} />
            <Text style={[styles.label, { color: selected ? '#FFFFFF' : '#334155' }]}>{label}</Text>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 8,
    paddingVertical: 16,
    paddingRight: 18,
    marginBottom: 30,
  },
  option: {
    height: 38,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7
  },
  pressed: {
    opacity: 0.8
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4
  },
  label: {
    fontSize: 12,
    fontWeight: '900'
  }
});
