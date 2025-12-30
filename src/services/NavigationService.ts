import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { ViewName } from '@/constants/routes';

export type RootStackParamList = {
  [ViewName.Login]: undefined;
  [ViewName.Signup]: undefined;
  [ViewName.Location]: undefined;
  [ViewName.VideoInfo]: undefined;
  [ViewName.Payment]: undefined;
  [ViewName.Home]: undefined;
  [ViewName.Explore]: undefined;
  [ViewName.Modal]: undefined;
};

export const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>();

export function navigate<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName],
) {
  navigationRef.current?.navigate(name as any, params as any);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function navigateRoot<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName],
) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name: name as any, params: params as any }],
  });
}



