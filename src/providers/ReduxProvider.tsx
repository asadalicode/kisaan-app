import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store';
import { View, ActivityIndicator } from 'react-native';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" />
          </View>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
