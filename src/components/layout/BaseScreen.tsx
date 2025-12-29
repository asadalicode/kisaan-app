import React, { ReactNode } from 'react';
import {
    ImageBackground,
    ImageSourcePropType,
    KeyboardAvoidingView,
    Platform,
    StyleProp,
    ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type BaseScreenProps = {
  children: ReactNode;
  backgroundImage?: ImageSourcePropType;
  useSafeArea?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
};

export function BaseScreen({
  children,
  backgroundImage,
  useSafeArea = true,
  contentStyle,
}: BaseScreenProps) {
  const safeArea = (
    <SafeAreaView
      style={[{ flex: 1 }, contentStyle]}
      edges={useSafeArea ? ['top', 'right', 'bottom', 'left'] : []}
    >
      {children}
    </SafeAreaView>
  );

  const content = backgroundImage ? (
    <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
      {safeArea}
    </ImageBackground>
  ) : (
    safeArea
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {content}
    </KeyboardAvoidingView>
  );
}


