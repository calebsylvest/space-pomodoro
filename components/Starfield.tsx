import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

interface Star {
  x: number; // percentage 0–100
  y: number; // percentage 0–100
  size: number; // 1, 1.5, or 2px
  opacity: number;
}

const STAR_COUNT = 160;

function generateStars(): Star[] {
  return Array.from({ length: STAR_COUNT }, () => {
    const r = Math.random();
    return {
      x: Math.random() * 100,
      y: Math.random() * 100,
      // 60% tiny, 25% small, 15% medium
      size: r < 0.6 ? 1 : r < 0.85 ? 1.5 : 2,
      // Most stars are dim; a few are bright
      opacity: r < 0.5 ? 0.1 + Math.random() * 0.25 : 0.4 + Math.random() * 0.55,
    };
  });
}

export function Starfield() {
  const stars = useMemo(() => generateStars(), []);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {stars.map((star, i) => (
        <View
          key={i}
          style={[
            styles.star,
            {
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              borderRadius: star.size / 2,
              opacity: star.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  star: {
    position: 'absolute',
    backgroundColor: '#ffffff',
  },
});
