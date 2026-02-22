import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  completed: number;
  total: number;
  color: string;
  trackColor: string;
}

export function PomodoroCounter({ completed, total, color, trackColor }: Props) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            { backgroundColor: i < completed % total || (completed > 0 && completed % total === 0) ? color : trackColor },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
