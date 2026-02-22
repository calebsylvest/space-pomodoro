import React from 'react';
import { View, Text, StyleSheet, Switch, Pressable } from 'react-native';
import { ColorTokens } from '@/constants/colors';

interface BaseProps {
  label: string;
  colors: ColorTokens;
}

interface ToggleProps extends BaseProps {
  type: 'toggle';
  value: boolean;
  onChange: (v: boolean) => void;
}

interface StepperProps extends BaseProps {
  type: 'stepper';
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}

type Props = ToggleProps | StepperProps;

export function SettingRow(props: Props) {
  const { label, colors } = props;

  return (
    <View style={[styles.row, { borderBottomColor: colors.border }]}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      {props.type === 'toggle' ? (
        <Switch
          value={props.value}
          onValueChange={props.onChange}
          trackColor={{ false: colors.border, true: colors.accent }}
          thumbColor="#ffffff"
        />
      ) : (
        <View style={styles.stepper}>
          <Pressable
            style={[styles.stepBtn, { borderColor: colors.border }]}
            onPress={() => props.onChange(Math.max(props.min, props.value - (props.step ?? 1)))}
            hitSlop={8}
          >
            <Text style={[styles.stepBtnText, { color: colors.text }]}>−</Text>
          </Pressable>
          <Text style={[styles.stepValue, { color: colors.text }]}>
            {props.value}{props.unit ?? ''}
          </Text>
          <Pressable
            style={[styles.stepBtn, { borderColor: colors.border }]}
            onPress={() => props.onChange(Math.min(props.max, props.value + (props.step ?? 1)))}
            hitSlop={8}
          >
            <Text style={[styles.stepBtnText, { color: colors.text }]}>+</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontSize: 16,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '400',
  },
  stepValue: {
    fontSize: 16,
    fontWeight: '500',
    minWidth: 40,
    textAlign: 'center',
  },
});
