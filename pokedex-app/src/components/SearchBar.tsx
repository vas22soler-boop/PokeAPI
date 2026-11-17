import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  loading?: boolean;
};

export function SearchBar({ value, onChangeText, onSubmit, onClear, loading = false }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Text style={styles.icon}>⌕</Text>
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder="Busque por nome ou número"
        placeholderTextColor="#94A3B8"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        style={styles.input}
      />
      {value.length > 0 ? (
        <Pressable onPress={onClear} hitSlop={12} style={styles.clearButton}>
          <Text style={styles.clearText}>×</Text>
        </Pressable>
      ) : null}
      <Pressable onPress={onSubmit} disabled={loading} style={[styles.button, loading && styles.buttonDisabled]}>
        <Text style={styles.buttonText}>{loading ? '...' : 'OK'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 6,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 2
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9'
  },
  icon: {
    color: '#64748B',
    fontSize: 22,
    fontWeight: '900',
    marginTop: -2
  },
  input: {
    flex: 1,
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  clearButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
  clearText: {
    color: '#64748B',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 26
  },
  button: {
    backgroundColor: '#EF4444',
    borderRadius: 17,
    paddingHorizontal: 14,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonDisabled: {
    opacity: 0.65
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 12
  }
});
