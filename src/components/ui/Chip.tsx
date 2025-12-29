import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export function Chip({ label, selected, onPress }: ChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`px-5 rounded-full border items-center justify-center py-1 min-h-[40px] ${
        selected ? 'bg-primary border-primary' : 'bg-surface-light border-surface-light'
      }`}
    >
      <Text
        // Use system font here to avoid Urdu font ascent issues inside tight chips
        allowFontScaling={false}
        style={{
          color: 'white',
          fontSize: 14,
          textAlign: 'center',
        //   @ts-ignore Android-only; reduces extra vertical padding
          includeFontPadding: false,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}


