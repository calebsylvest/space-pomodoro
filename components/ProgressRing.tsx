import React, { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  progress: number;   // 0–1
  size: number;
  strokeWidth: number;
  color: string;
  trackColor: string;
}

// Web: plain SVG with CSS transition — avoids Reanimated SVG init bug on web
function ProgressRingWeb({ progress, size, strokeWidth, color, trackColor }: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  const dashoffset = circumference * (1 - progress);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${center}, ${center}`}
          // @ts-ignore — web-only CSS transition on SVG attribute
          style={{ transition: 'stroke-dashoffset 800ms cubic-bezier(0.33, 1, 0.68, 1)' }}
        />
      </Svg>
    </View>
  );
}

// Native: Reanimated for smooth 60fps animation
function ProgressRingNative({ progress, size, strokeWidth, color, trackColor }: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const offset = useSharedValue(circumference * (1 - progress));

  useEffect(() => {
    offset.value = withTiming(circumference * (1 - progress), {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });
  }, [progress, circumference]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: offset.value,
  }));

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          rotation="-90"
          origin={`${center}, ${center}`}
        />
      </Svg>
    </View>
  );
}

export function ProgressRing(props: Props) {
  return Platform.OS === 'web'
    ? <ProgressRingWeb {...props} />
    : <ProgressRingNative {...props} />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
