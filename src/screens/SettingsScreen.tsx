import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { View as UIView } from 'react-native-ui-lib';

import { BaseScreen } from '@/components/layout/BaseScreen';
import { AppText } from '@/components/ui/AppText';
import { CustomAlert } from '@/components/ui/CustomAlert';
import { ViewName } from '@/constants/routes';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import type { AppStackParamList } from '@/providers/RoutesProvider';
import { navigateRoot } from '@/services/NavigationService';
import { clearSession } from '@/slices/sessionSlice';

type SettingsScreenNavigationProp = NativeStackNavigationProp<AppStackParamList>;

const screenWidth = Dimensions.get('window').width;

/**
 * Settings Screen - Main settings page with 3 options:
 * 1. Profile
 * 2. Package
 * 3. Logout (with confirmation popup)
 * 
 * Design: Side panel card on right (60% width, full height)
 */
export function SettingsScreen() {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const [alert, setAlert] = useState<{
    visible: boolean;
    title: string;
    message: string;
  }>({
    visible: false,
    title: '',
    message: '',
  });

  const handleLogout = () => {
    setAlert({
      visible: true,
      title: 'لاگ آؤٹ',
      message: 'کیا آپ لاگ آؤٹ کرنا چاہتے ہیں؟',
    });
  };

  const handleConfirmLogout = () => {
    setAlert({ ...alert, visible: false });
    dispatch(clearSession());
    navigateRoot(ViewName.Login);
  };

  const handleNavigateToProfile = () => {
    navigation.navigate(ViewName.Profile);
  };

  const handleNavigateToPackage = () => {
    // TODO: Navigate to Package screen when implemented
    // navigation.navigate(ViewName.Package);
  };

  return (
    <BaseScreen backgroundImage={require('../../assets/bg/bg-1.jpg')}>
      <UIView flex>
        {/* Left empty space (40%) - shows background */}
        <View style={{ width: screenWidth * 0.4 }} />

        {/* Right side card (60% width, full height) */}
        <View
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: screenWidth * 0.6,
            backgroundColor: '#064e3b', // surface color
            borderTopLeftRadius: 24,
            borderBottomLeftRadius: 24,
            shadowColor: '#000',
            shadowOffset: { width: -4, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 10,
          }}
        >
          <View style={{ flex: 1, paddingTop: 60, paddingHorizontal: 24 }}>
            {/* Heading - Right Aligned */}
            <View className="items-end mb-16">
              <AppText className="text-3xl font-bold text-white text-right">
                ترتیبات
              </AppText>
            </View>

            {/* Settings Options - Top Section */}
            <View style={{ flex: 1 }}>
              <View style={{ gap: 12 }}>
                {/* Profile Option - RTL Layout */}
                <TouchableOpacity
                  onPress={handleNavigateToProfile}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingVertical: 18,
                    paddingHorizontal: 20,
                    borderRadius: 16,
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <AppText className="text-white text-lg font-semibold text-right">
                    پروفائل
                  </AppText>
                  <MaterialIcons name="person" size={26} color="#10b981" style={{ marginLeft: 12 }} />
                </TouchableOpacity>

                {/* Package Option - RTL Layout */}
                <TouchableOpacity
                  onPress={handleNavigateToPackage}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingVertical: 18,
                    paddingHorizontal: 20,
                    borderRadius: 16,
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <AppText className="text-white text-lg font-semibold text-right">
                    پیکج
                  </AppText>
                  <MaterialIcons name="inventory" size={26} color="#10b981" style={{ marginLeft: 12 }} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Logout Option - Bottom Section - RTL Layout */}
            <View style={{ paddingBottom: 40 }}>
              <TouchableOpacity
                onPress={handleLogout}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingVertical: 18,
                  paddingHorizontal: 20,
                  borderRadius: 16,
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  borderWidth: 1,
                  borderColor: 'rgba(239, 68, 68, 0.4)',
                }}
              >
                <AppText className="text-red-300 text-lg font-semibold text-right">
                  لاگ آؤٹ
                </AppText>
                <MaterialIcons name="logout" size={26} color="#f87171" style={{ marginLeft: 12 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Logout Confirmation Alert */}
        <CustomAlert
          visible={alert.visible}
          title={alert.title}
          message={alert.message}
          buttonText="جی"
          showCancel={true}
          cancelText="نہیں"
          onPress={handleConfirmLogout}
          onCancel={() => setAlert({ ...alert, visible: false })}
          onDismiss={() => setAlert({ ...alert, visible: false })}
        />
      </UIView>
    </BaseScreen>
  );
}
