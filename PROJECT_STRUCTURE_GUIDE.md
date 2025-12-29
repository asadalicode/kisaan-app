# React Native Expo Project Structure Guide

This guide provides the complete structure, packages, and patterns used in this React Native Expo project. Use this as a template for setting up new projects with the same architecture.

## 📦 Core Dependencies

### Essential Packages

```json
{
  "expo": "^53.0.7",
  "react": "19.0.0",
  "react-native": "0.79.6",
  "react-dom": "19.0.0",
  "@react-native-async-storage/async-storage": "2.1.2",
  "@react-navigation/native": "^6.0.13",
  "@react-navigation/native-stack": "^6.9.1",
  "@react-navigation/bottom-tabs": "^6.4.0",
  "@react-navigation/material-top-tabs": "^6.5.1",
  "react-native-gesture-handler": "2.24.0",
  "react-native-safe-area-context": "5.4.0",
  "react-native-screens": "~4.11.1",
  "react-native-reanimated": "~3.17.4",
  "react-native-ui-lib": "^7.41.1",
  "@reduxjs/toolkit": "^1.9.1",
  "react-redux": "^8.0.5",
  "redux-persist": "^6.0.0",
  "mobx": "^5.13.1",
  "mobx-persist": "^0.4.1",
  "axios": "^1.2.1",
  "lodash": "^4.17.21",
  "moment": "^2.29.4"
}
```

### Dev Dependencies

```json
{
  "@babel/core": "^7.20.0",
  "@babel/preset-typescript": "^7.7.2",
  "@babel/plugin-proposal-decorators": "^7.27.1",
  "@babel/plugin-proposal-class-properties": "^7.18.6",
  "@babel/plugin-proposal-private-methods": "^7.18.6",
  "babel-preset-expo": "~13.0.0",
  "typescript": "~5.8.3",
  "prettier": "2.0.5"
}
```

## 📁 Project Structure

```
src/
├── App.tsx                    # Root component with providers
├── theme.tsx                  # Theme configuration (Colors, ThemeManager)
├── constants.ts              # ViewName enum for navigation
├── constants/
│   └── backendTarget.ts      # API configuration (base URL, client ID/secret)
├── types.ts                  # TypeScript type definitions
│
├── providers/                # React Context Providers
│   ├── ReduxProvider.tsx     # Redux store provider
│   ├── RoutesProvider.tsx    # Navigation container
│   ├── DialogsAndAlertsProvider.tsx  # Toast & Dialog provider
│   └── DataProvider.tsx      # App initialization & data loading
│
├── stores/                   # MobX stores (persisted)
│   ├── index.ts             # Store initialization & hydration
│   ├── SessionStore.ts      # Auth tokens, user session
│   ├── ContactsStore.ts     # Contacts data
│   └── TicketsStore.ts      # Tickets data
│
├── slices/                   # Redux slices
│   ├── appSlice.ts          # App-level state
│   └── betaSlice.ts         # Feature flags
│
├── services/                 # Business logic services
│   ├── NavigationService.ts # Navigation helper (imperative)
│   ├── StorageService.ts    # AsyncStorage wrapper
│   ├── LoginService.ts      # Authentication logic
│   ├── LogoutService.ts     # Logout logic
│   ├── LocationService.ts   # Location handling
│   ├── PermissionService.ts # Permission requests
│   └── ...                  # Other domain services
│
├── network/                  # API layer
│   ├── baseApi.ts           # Axios instance with interceptors
│   ├── loginApi.ts          # Auth endpoints
│   ├── profileApi.ts         # User profile endpoints
│   └── ...                  # Other API modules
│
├── hooks/                    # Custom React hooks
│   ├── useNavigation.ts     # Typed navigation hook
│   ├── useQuery.ts          # Data fetching hook
│   ├── useRequest.ts        # Base request hook
│   ├── useToast.ts          # Toast notification hook
│   ├── useDialog.tsx        # Dialog/Alert hook
│   ├── useFormFields.ts     # Form state management
│   ├── useDispatch.ts       # Redux dispatch hook
│   └── useSelector.ts       # Redux selector hook
│
├── ui/                       # UI Components
│   ├── components/          # Reusable components
│   ├── screens/            # Screen components
│   ├── modals/             # Modal components
│   └── 3d/                 # 3D components (if needed)
│
└── utils/                    # Utility functions
```

## 🔧 Configuration Files

### babel.config.js

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-private-methods', { loose: true }],
    ],
  };
};
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "noImplicitAny": false,
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "forceConsistentCasingInFileNames": true,
    "jsx": "react-native",
    "lib": ["es6"],
    "moduleResolution": "node",
    "noEmit": true,
    "target": "esnext",
    "module": "ES6",
    "sourceMap": true,
    "skipLibCheck": true
  },
  "include": ["src/"],
  "extends": "expo/tsconfig.base"
}
```

## 🎨 Theme Setup (src/theme.tsx)

```typescript
import { ButtonProps, Colors, Incubator, ThemeManager, ViewProps } from 'react-native-ui-lib';
import { Platform, StatusBar as RNStatusBar } from 'react-native';

Colors.loadSchemes({
  light: {
    primary: '#8c43b4', // Your brand color
    primaryContrast: Colors.white,
    highlight: Colors.grey60,
    screen: Colors.white,
    textColor: Colors.black,
    $textDefaultLight: Colors.black,
    $outlinePrimary: Colors.grey10,
  },
  dark: {
    primary: '#8c43b4',
    primaryContrast: Colors.white,
    highlight: Colors.grey10,
    screen: Colors.black,
    textColor: Colors.white,
    $textDefaultLight: Colors.white,
    $outlinePrimary: Colors.grey10,
  },
});

// Configure Button component defaults
ThemeManager.setComponentForcedTheme('Button', (props): ButtonProps => {
  const primary = !props.outline && !props.link;
  return {
    ...(primary
      ? {
          'bg-primary': true,
          color: Colors.primaryContrast,
        }
      : {}),
    ...(props.outline ? { outlineColor: Colors.$textDefaultLight } : {}),
    ...(props.outline || props.link ? { color: Colors.$textDefaultLight } : {}),
    disabled: props.loading || props.disabled,
    ...props,
  };
});

// Configure TextField component defaults
ThemeManager.setComponentForcedTheme('Incubator.TextField', props => ({
  placeholderTextColor: Colors.grey30,
  floatOnFocus: true,
  containerStyle: [{ flex: props.flex ? 1 : undefined }, props.containerStyle],
  style: [
    {
      textAlign: props.textAlign,
      borderBottomWidth: 1,
      borderColor: Colors.grey30,
    },
    props.style,
  ],
  fieldStyle: [{ height: 30 }, props.fieldStyle],
}));
```

## 🔐 Authentication & Authorization

### Session Store (MobX)

```typescript
// src/stores/SessionStore.ts
import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';

export default class SessionStore {
  @persist @observable phone: string;
  @persist @observable accessToken: string | undefined;
  @persist @observable refreshToken: string | undefined;
  @persist @observable accessTokenHasExpired: boolean;

  @action.bound setAccessToken(accessToken: string | undefined) {
    this.accessToken = accessToken;
  }

  @action.bound setRefreshToken(refreshToken: string | undefined) {
    this.refreshToken = refreshToken;
  }

  @action clear() {
    this.accessToken = '';
    this.refreshToken = '';
    this.phone = '';
  }
}
```

### Base API with Auth Interceptors

```typescript
// src/network/baseApi.ts
import axios, { AxiosInstance } from 'axios';
import { sessionStore } from '../stores';
import backendTarget from '../constants/backendTarget';

class BaseApi {
  private readonly _axios: AxiosInstance;
  private _unauthorizedHandlers: Array<(error: AxiosError) => void> = [];

  constructor() {
    this._axios = axios.create({
      baseURL: backendTarget.API_BASE_URL,
      timeout: 300000,
    });

    // Request interceptor: Add auth token
    this._axios.interceptors.request.use(config => {
      if (sessionStore.accessToken && !sessionStore.accessTokenHasExpired) {
        config.headers['Authorization'] = `Bearer ${sessionStore.accessToken}`;
      }
      return config;
    });

    // Response interceptor: Handle 401 errors
    this._axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          this._unauthorizedHandlers.forEach(handler => handler(error));
        }
        return Promise.reject(error);
      }
    );
  }

  get axios(): AxiosInstance {
    return this._axios;
  }

  registerUnauthorizedHandler(handler: (error: AxiosError) => void) {
    this._unauthorizedHandlers.push(handler);
  }
}

export default new BaseApi();
```

### Login Service Pattern

```typescript
// src/services/LoginService.ts
import LoginApi from '../network/loginApi';
import { sessionStore } from '../stores';
import NavigationService from './NavigationService';

class LoginService {
  async login(refresh: boolean, username?: string, password?: string): Promise<void> {
    const { access_token, refresh_token } = await LoginApi.login(refresh, username, password);
    await sessionStore.setAccessToken(access_token);
    await sessionStore.setRefreshToken(refresh_token);
    await sessionStore.setAccessTokenHasExpired(false);
    NavigationService.showFeed(); // Navigate to main app
    await this.initialize();
  }

  async initialize() {
    // Initialize app state, permissions, etc.
  }
}

export default new LoginService();
```

## 🗄️ Storage Pattern

### StorageService (AsyncStorage wrapper)

```typescript
// src/services/StorageService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  private _myStoreKey = 'MyStore';
  private _keyDeviceId = 'deviceId';

  async saveDeviceId(deviceId: string): Promise<void> {
    try {
      await AsyncStorage.setItem(this._myStoreKey + this._keyDeviceId, deviceId);
    } catch (error) {
      return;
    }
  }

  async getDeviceId(): Promise<string> {
    try {
      const value = await AsyncStorage.getItem(this._myStoreKey + this._keyDeviceId);
      return value || '';
    } catch (error) {
      return '';
    }
  }
}

export default new StorageService();
```

## 🧭 Navigation Pattern

### Navigation Service (Imperative)

```typescript
// src/services/NavigationService.ts
import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { ViewName } from '../constants';
import { ParamsList } from '../hooks/useNavigation';

export const navigationRef = React.createRef<NavigationContainerRef<ParamsList>>();

class NavigationService {
  navigate<RouteName extends keyof ParamsList>(
    name: RouteName,
    params?: ParamsList[RouteName]
  ): void {
    navigationRef.current?.navigate<any>({ name, params });
  }

  goBack() {
    navigationRef.current?.goBack();
  }

  navigateRoot(name: string, params?: any): void {
    navigationRef.current?.resetRoot({
      index: 0,
      routes: [{ name, params }],
    });
  }

  showLogin(): void {
    this.navigateRoot(ViewName.Login);
  }
}

export default new NavigationService();
```

### Typed Navigation Hook

```typescript
// src/hooks/useNavigation.ts
import {
  useNavigation as useNativeNavigation,
  useRoute as useNativeRoute,
} from '@react-navigation/native';
import { ViewName } from '../constants';

export interface ParamsList extends ParamListBase {
  [ViewName.Login]: {};
  [ViewName.Feed]: { token?: string };
  // ... other routes
}

export function useNavigation() {
  return useNativeNavigation<NavigationProp<ParamsList>>();
}

export function useRoute<T extends keyof ParamsList>() {
  return useNativeRoute<RouteProp<ParamsList, T>>();
}
```

### Routes Provider

```typescript
// src/providers/RoutesProvider.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '../services/NavigationService';
import { ViewName } from '../constants';
import LoginScreen from '../ui/screens/LoginScreen';
import FeedScreen from '../ui/screens/FeedScreen';

const Stack = createNativeStackNavigator();

export function RoutesProvider() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.screen },
        }}
      >
        <Stack.Screen name={ViewName.Login} component={LoginScreen} />
        <Stack.Screen name={ViewName.Feed} component={FeedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## 📡 API Request Pattern

### Base API Module Pattern

```typescript
// src/network/weatherApi.ts
import BaseApi from './baseApi';

class WeatherApi {
  async getCurrentWeather(city: string) {
    return BaseApi.axios({
      method: 'get',
      url: '/weather/current',
      params: { city },
    }).then(res => res.data);
  }

  async getForecast(city: string, days: number) {
    return BaseApi.axios({
      method: 'get',
      url: '/weather/forecast',
      params: { city, days },
    }).then(res => res.data);
  }
}

export default new WeatherApi();
```

### Service Layer Pattern

```typescript
// src/services/WeatherService.ts
import WeatherApi from '../network/weatherApi';

class WeatherService {
  async getCurrentWeather(city: string) {
    return WeatherApi.getCurrentWeather(city);
  }

  async getForecast(city: string, days: number = 7) {
    return WeatherApi.getForecast(city, days);
  }
}

export default new WeatherService();
```

## 🎣 Data Fetching Hooks

### useQuery Hook (for data fetching)

```typescript
// src/hooks/useQuery.ts
import { useRequest } from './useRequest';
import { useState } from 'react';

export function useQuery<T, R = T>(
  callback: (...args) => Promise<R>,
  initialValue?: T,
  options: RequestOptions<T, R> = {}
) {
  return useRequest(callback, {
    initialValue,
    loadOnMount: true,
    notifyOnError: false,
    ...options,
  });
}

// Usage in component:
const { data, isLoading, errorMessage, reload } = useQuery<Weather>(() =>
  WeatherService.getCurrentWeather('New York')
);
```

### useRequest Hook (base)

```typescript
// src/hooks/useRequest.ts
export function useRequest<T, R = T>(
  callback: (...args) => Promise<R>,
  options: RequestOptions<T, R> = {}
) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [data, setData] = useState<T>(options.initialValue);

  const reload = async (...args) => {
    try {
      setIsLoading(true);
      const res = await callback(...args);
      setData(res as T);
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, errorMessage, data, setData, reload };
}
```

## 🔔 Toast & Dialog Pattern

### Toast Hook

```typescript
// src/hooks/useToast.ts
import { useContext } from 'react';
import { ToastProps } from 'react-native-ui-lib';
import { DialogsAndAlertsContext } from '../providers/DialogsAndAlertsProvider';

export const useToast = () => {
  const { setToastProps, hideToast } = useContext(DialogsAndAlertsContext);
  return (message: string, props?: Partial<ToastProps>) => {
    setToastProps({
      visible: true,
      message,
      autoDismiss: 3000,
      swipeable: true,
      action: { label: 'Dismiss', onPress: hideToast },
      ...props,
    });
  };
};

// Usage:
const showToast = useToast();
showToast('Success message', { preset: ToastPresets.SUCCESS });
```

### Dialog Hook

```typescript
// src/hooks/useDialog.tsx
import { useContext } from 'react';
import { DialogsAndAlertsContext } from '../providers/DialogsAndAlertsProvider';

export function useDialog() {
  const { showDialog } = useContext(DialogsAndAlertsContext);

  return {
    alert: (title: string, message: string, options?: { actions?: any[] }) => {
      showDialog({ title, message, ...options });
    },
    confirm: (title: string, message: string, options?: { onConfirm?: () => void }) => {
      showDialog({
        title,
        message,
        actions: [
          { label: 'Cancel', outline: true },
          { label: 'Confirm', onPress: options?.onConfirm },
        ],
      });
    },
  };
}
```

## 🗃️ State Management

### Redux Setup

```typescript
// src/providers/ReduxProvider.tsx
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appSlice } from '../slices/appSlice';

const rootReducer = combineReducers({
  app: appSlice.reducer,
});

export const store = configureStore({
  reducer: persistReducer(
    { key: 'root', storage: AsyncStorage },
    rootReducer
  ),
});

const persistor = persistStore(store);

export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
```

### MobX Stores Setup

```typescript
// src/stores/index.ts
import { configure } from 'mobx';
import { create } from 'mobx-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SessionStore from './SessionStore';

configure({
  computedRequiresReaction: true,
  enforceActions: 'observed',
});

const hydrate = create({ storage: AsyncStorage });

export const sessionStore = new SessionStore();

export const hydrateStorages = async () => {
  await hydrate('sessionStore', sessionStore);
};
```

## 📱 App.tsx Structure

```typescript
// src/App.tsx
import './theme';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ReduxProvider } from './providers/ReduxProvider';
import { DialogsAndAlertsProvider } from './providers/DialogsAndAlertsProvider';
import { DataProvider } from './providers/DataProvider';
import { RoutesProvider } from './providers/RoutesProvider';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ReduxProvider>
        <DialogsAndAlertsProvider>
          <DataProvider>
            <RoutesProvider />
          </DataProvider>
        </DialogsAndAlertsProvider>
      </ReduxProvider>
    </>
  );
}
```

## 🎯 Key Patterns

### 1. **Service Layer Pattern**

- `services/` contains business logic
- `network/` contains API calls only
- Services orchestrate API calls and handle side effects

### 2. **Typed Navigation**

- Use `ViewName` enum for route names
- Define `ParamsList` interface for route params
- Use `useNavigation()` and `useRoute()` hooks for typed navigation

### 3. **Custom Hooks for Data**

- `useQuery()` for data fetching with loading/error states
- `useRequest()` as base hook for custom request logic
- `usePaginatedQuery()` for paginated lists

### 4. **Storage Pattern**

- Use `StorageService` for AsyncStorage operations
- Use MobX stores with `@persist` for reactive persisted state
- Use Redux Persist for Redux state persistence

### 5. **Error Handling**

- BaseApi interceptors handle 401 (unauthorized) globally
- Register unauthorized handlers in DataProvider
- Components use `errorMessage` from hooks for display

### 6. **UI Component Library**

- Use `react-native-ui-lib` for base components
- Customize via `ThemeManager.setComponentForcedTheme()`
- Create reusable components in `ui/components/`

## 📝 Constants Pattern

```typescript
// src/constants.ts
export enum ViewName {
  Login = 'Login',
  Feed = 'Feed',
  WeatherDetail = 'WeatherDetail',
  // ... other routes
}

// src/constants/backendTarget.ts
interface BackendConfig {
  API_BASE_URL: string;
  API_CLIENT_ID: string;
  API_CLIENT_SECRET: string;
}

const production: BackendConfig = {
  API_BASE_URL: 'https://api.yourapp.com',
  API_CLIENT_ID: 'your-client-id',
  API_CLIENT_SECRET: 'your-client-secret',
};

export default production;
```

## 🚀 Setup Checklist

1. ✅ Install all core dependencies
2. ✅ Configure Babel with decorators support
3. ✅ Set up TypeScript config
4. ✅ Create folder structure (providers, services, network, hooks, stores, slices, ui)
5. ✅ Set up theme.tsx with Colors and ThemeManager
6. ✅ Create BaseApi with interceptors
7. ✅ Set up SessionStore (MobX)
8. ✅ Set up Redux store with persistence
9. ✅ Create NavigationService and RoutesProvider
10. ✅ Set up StorageService
11. ✅ Create custom hooks (useQuery, useToast, useDialog, useNavigation)
12. ✅ Set up DialogsAndAlertsProvider
13. ✅ Create DataProvider for app initialization
14. ✅ Set up App.tsx with all providers
15. ✅ Create constants (ViewName enum, backendTarget)

## 📚 Additional Notes

- **MobX**: Used for session/auth state (persisted)
- **Redux**: Used for app-level state (persisted)
- **React Navigation**: Native stack navigator for routing
- **react-native-ui-lib**: Primary UI component library
- **AsyncStorage**: For local storage (via StorageService)
- **Axios**: HTTP client with interceptors for auth
- **TypeScript**: Full type safety with typed navigation

This structure provides a scalable, maintainable architecture with clear separation of concerns.
