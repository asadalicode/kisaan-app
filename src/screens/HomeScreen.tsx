import { Image } from 'expo-image';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ViewName } from '@/constants/routes';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { navigate } from '@/services/NavigationService';
import { clearSession } from '@/slices/sessionSlice';

export function HomeScreen() {
  const accessToken = useAppSelector(state => state.session.accessToken);
  const dispatch = useAppDispatch();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('../../assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <View className="flex-1 items-center justify-center bg-slate-900 px-4 py-6">
        <Text className="text-3xl font-bold text-white mb-2">
          Kisaan Weather
        </Text>
        <Text className="text-base text-slate-200">
          Styled with Tailwind via NativeWind
        </Text>
      </View>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
        <ThemedText
          type="defaultSemiBold"
          onPress={() => dispatch(clearSession())}
          style={{ marginLeft: 'auto', textDecorationLine: 'underline' }}
        >
          Logout
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">src/screens/HomeScreen.tsx</ThemedText> to see
          changes. Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText
          type="subtitle"
          onPress={() => navigate(ViewName.Modal)}
          style={{ textDecorationLine: 'underline' }}
        >
          Step 2: Open modal
        </ThemedText>
        <ThemedText>
          {`Tap to open the modal screen.\nUse the Explore screen to see more examples.`}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});


