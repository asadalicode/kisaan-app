import React from 'react';
import { ImageBackground, ImageSourcePropType, KeyboardAvoidingView, Platform } from 'react-native';
import { View, ViewProps } from 'react-native-ui-lib';

interface Props extends ViewProps {
  backgroundImage?: ImageSourcePropType;
  children: React.ReactNode;
}

export function BaseScreen({ useSafeArea = true, backgroundImage, ...props }: Props) {
  return backgroundImage ? (
    <ImageBackground
      source={backgroundImage}
      style={{
        flex: 1,
      }}
    >
      <View flex useSafeArea>
        <View flex {...props} />
      </View>
    </ImageBackground>
  ) : (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <View bg-screen flex useSafeArea={useSafeArea}>
        <View flex {...props} />
      </View>
    </KeyboardAvoidingView>
  );
}
