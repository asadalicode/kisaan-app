import './src/theme';

import { useFonts } from 'expo-font';
import React from 'react';

import { DataProvider } from '@/providers/DataProvider';
import { DialogsAndAlertsProvider } from '@/providers/DialogsAndAlertsProvider';
import { ReduxProvider } from '@/providers/ReduxProvider';
import { RoutesProvider } from '@/providers/RoutesProvider';

export default function App() {
  const [fontsLoaded] = useFonts({
    // Place your actual Urdu font file at assets/fonts/urdu-heading.ttf
    'urdu-heading': require('./assets/fonts/urdu.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    <ReduxProvider>
      <DialogsAndAlertsProvider>
        <DataProvider>
          <RoutesProvider />
        </DataProvider>
      </DialogsAndAlertsProvider>
    </ReduxProvider>
  );
}


