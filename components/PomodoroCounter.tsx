import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { Phase } from '@/store/timerStore';

interface Props {
  completed: number;
  total: number;
  phase: Phase;
  color: string;
  trackColor: string;
}

export function PomodoroCounter({ completed, total, phase, color, trackColor }: Props) {
  // During a break after completing a full cycle (completed % total === 0),
  // show all dots filled. When back in focus at the start of a new cycle, show empty.
  const positionInCycle = completed % total;
  const cycleJustFinished = completed > 0 && positionInCycle === 0 && phase !== 'focus';
  const dotsFilled = cycleJustFinished ? total : positionInCycle;

  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[styles.dot, { backgroundColor: i < dotsFilled ? color : trackColor }]}
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
