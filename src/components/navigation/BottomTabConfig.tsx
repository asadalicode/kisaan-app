import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import React from 'react';

import { ViewName } from '@/constants/routes';

/**
 * Reusable configuration for bottom tab navigator
 * Centralizes tab bar styling and icon configuration
 */
export const bottomTabScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarShowLabel: false, // Hide text labels, show only icons
  tabBarActiveTintColor: '#8c43b4', // Purple for active tab
  tabBarInactiveTintColor: '#9ca3af', // Grey for inactive tabs
  tabBarStyle: {
    backgroundColor: '#047857', // Green background
    borderTopWidth: 0,
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
};

/**
 * Tab icon configuration mapping
 * Maps route names to their respective MaterialIcons
 */
export const tabIcons: Record<
  string,
  keyof typeof MaterialIcons.glyphMap
> = {
  [ViewName.Home]: 'home',
  [ViewName.Location]: 'location-on',
  [ViewName.Payment]: 'payment',
  [ViewName.Settings]: 'menu',
};

/**
 * Helper function to get tab icon component
 */
export const getTabIcon = (
  routeName: string,
  color: string,
  size: number = 24,
) => {
  const iconName = tabIcons[routeName];
  if (!iconName) {
    return null;
  }
  return <MaterialIcons name={iconName} size={size} color={color} />;
};

