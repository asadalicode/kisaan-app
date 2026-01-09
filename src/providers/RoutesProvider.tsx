import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { bottomTabScreenOptions, getTabIcon } from '@/components/navigation/BottomTabConfig';
import { ViewName } from '@/constants/routes';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ExploreScreen } from '@/screens/ExploreScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { LocationScreen } from '@/screens/LocationScreen';
import { LoginScreen } from '@/screens/LoginScreen';
import { ModalScreen } from '@/screens/ModalScreen';
import { PaymentScreen } from '@/screens/PaymentScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
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
  [ViewName.Settings]: undefined;
  [ViewName.Profile]: undefined;
};

export type AppTabParamList = {
  [ViewName.Home]: undefined;
  [ViewName.Location]: undefined;
  [ViewName.Payment]: undefined;
  [ViewName.Settings]: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();
const AppTab = createBottomTabNavigator<AppTabParamList>();

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

/**
 * Bottom Tab Navigator for main app screens
 * Shows 4 tabs: Home, Location, Payment, Settings
 * Uses reusable bottom tab configuration with safe area insets
 */
function AppTabNavigator() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 8);
  
  return (
    <AppTab.Navigator
      initialRouteName={ViewName.Home}
      screenOptions={{
        ...bottomTabScreenOptions,
        tabBarStyle: {
          backgroundColor: '#047857',
          borderTopWidth: 0,
          height: 60 + bottomPadding,
          paddingBottom: bottomPadding,
          paddingTop: 8,
        },
      }}
    >
      <AppTab.Screen
        name={ViewName.Home}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => getTabIcon(ViewName.Home, color, size),
        }}
      />
      <AppTab.Screen
        name={ViewName.Location}
        component={LocationScreen}
        options={{
          tabBarIcon: ({ color, size }) => getTabIcon(ViewName.Location, color, size),
        }}
      />
      <AppTab.Screen
        name={ViewName.Payment}
        component={PaymentScreen}
        options={{
          tabBarIcon: ({ color, size }) => getTabIcon(ViewName.Payment, color, size),
        }}
      />
      <AppTab.Screen
        name={ViewName.Settings}
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => getTabIcon(ViewName.Settings, color, size),
        }}
      />
    </AppTab.Navigator>
  );
}

/**
 * Stack Navigator for app screens that need stack navigation
 * (e.g., modals, nested screens like Profile)
 * Profile screen is in stack so it doesn't show bottom tabs
 */
function AppNavigator() {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AppStack.Screen name={ViewName.Home} component={AppTabNavigator} />
      <AppStack.Screen name={ViewName.Profile} component={ProfileScreen} />
      <AppStack.Screen name={ViewName.VideoInfo} component={VideoInfoScreen} />
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


