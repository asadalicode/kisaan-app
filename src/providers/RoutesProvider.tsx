import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { ViewName } from '@/constants/routes';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ExploreScreen } from '@/screens/ExploreScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { LocationScreen } from '@/screens/LocationScreen';
import { LoginScreen } from '@/screens/LoginScreen';
import { ModalScreen } from '@/screens/ModalScreen';
import { PaymentScreen } from '@/screens/PaymentScreen';
import { SignupScreen } from '@/screens/SignupScreen';
import { VideoInfoScreen } from '@/screens/VideoInfoScreen';
import { navigationRef } from '@/services/NavigationService';

export type AuthStackParamList = {
  [ViewName.Login]: undefined;
  [ViewName.Signup]: undefined;
  [ViewName.Location]: undefined;
  [ViewName.VideoInfo]: undefined;
};

export type AppStackParamList = {
  [ViewName.Payment]: undefined;
  [ViewName.VideoInfo]: undefined;
  [ViewName.Home]: undefined;
  [ViewName.Explore]: undefined;
  [ViewName.Modal]: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ViewName.Login}
    >
      <AuthStack.Screen name={ViewName.Login} component={LoginScreen} />
      <AuthStack.Screen name={ViewName.Signup} component={SignupScreen} />
      <AuthStack.Screen name={ViewName.Location} component={LocationScreen} />
      <AuthStack.Screen name={ViewName.VideoInfo} component={VideoInfoScreen} />
    </AuthStack.Navigator>
  );
}

function AppNavigator() {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ViewName.Payment}
    >
      <AppStack.Screen name={ViewName.Payment} component={PaymentScreen} />
      <AppStack.Screen name={ViewName.VideoInfo} component={VideoInfoScreen} />
      <AppStack.Screen name={ViewName.Home} component={HomeScreen} />
      <AppStack.Screen name={ViewName.Explore} component={ExploreScreen} />
      <AppStack.Screen
        name={ViewName.Modal}
        component={ModalScreen}
        options={{ presentation: 'modal' }}
      />
    </AppStack.Navigator>
  );
}

export function RoutesProvider() {
  const accessToken = useAppSelector(state => state.session.accessToken);
  const isAuthenticated = !!accessToken;
  console.log('isAuthenticated', accessToken);

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer ref={navigationRef}>
        {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </>
  );
}


