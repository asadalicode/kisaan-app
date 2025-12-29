import { styled } from 'nativewind';
import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

function AppTextBase(props: TextProps) {
  // Keep it simple: NativeWind will apply any Tailwind classes via `className`
  // (including font-urdu). We only turn off font scaling here.
  return <RNText {...props} allowFontScaling={false} />;
}

export const AppText = styled(AppTextBase);
