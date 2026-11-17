import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ title, message, actionLabel, onAction }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>!</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} style={styles.button}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 44,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  icon: {
    color: '#EF4444',
    fontSize: 28,
    fontWeight: '900'
  },
  title: {
    color: '#0F172A',
    fontSize: 19,
    fontWeight: '900',
    marginBottom: 7,
    textAlign: 'center'
  },
  message: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 18
  },
  button: {
    backgroundColor: '#EF4444',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900'
  }
});
