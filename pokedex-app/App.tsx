import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { fetchPokemonByNameOrId } from './src/api/pokeApi';
import { PokemonSummary } from './src/types/pokemon';

export default function App() {
  const [pokemon, setPokemon] = useState<PokemonSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPokemonByNameOrId(25)
      .then(setPokemon)
      .catch((cause) => setError(String(cause)));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Primeira consulta real</Text>
      {!pokemon && !error ? <ActivityIndicator size="large" color="#EF4444" /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {pokemon ? (
        <>
          <Image source={{ uri: pokemon.image }} style={styles.image} />
          <Text style={styles.name}>{pokemon.displayName}</Text>
          <Text>#{pokemon.id} • {pokemon.height} m • {pokemon.weight} kg</Text>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#F8FAFC' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 18, color: '#0F172A' },
  image: { width: 240, height: 240 },
  name: { fontSize: 30, fontWeight: 'bold', marginBottom: 8 },
  error: { color: '#B91C1C', textAlign: 'center' }
});

