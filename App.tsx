import './src/theme';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DataProvider } from '@/providers/DataProvider';
import { DialogsAndAlertsProvider } from '@/providers/DialogsAndAlertsProvider';
import { ReduxProvider } from '@/providers/ReduxProvider';
import { RoutesProvider } from '@/providers/RoutesProvider';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    // Place your actual Urdu font file at assets/fonts/urdu-heading.ttf
    'urdu-heading': require('./assets/fonts/urdu.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide splash screen once fonts are loaded (or if there's an error)
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Show nothing while loading fonts (splash screen will be visible)
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ReduxProvider>
        <DialogsAndAlertsProvider>
          <DataProvider>
            <RoutesProvider />
          </DataProvider>
        </DialogsAndAlertsProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}


