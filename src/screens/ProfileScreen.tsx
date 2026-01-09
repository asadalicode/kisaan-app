import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Incubator, View as UIView } from 'react-native-ui-lib';

import { BaseScreen } from '@/components/layout/BaseScreen';
import { AppText } from '@/components/ui/AppText';
import { useAppSelector } from '@/hooks/useAppSelector';
import type { AppStackParamList } from '@/providers/RoutesProvider';

type ProfileScreenNavigationProp = NativeStackNavigationProp<AppStackParamList>;

const { TextField } = Incubator;

/**
 * Profile Screen - Displays user's personal information
 * Shows: Name, Phone Number, Village, Tehsil, District, Crop, Area
 * Has a back button (icon only) to return to Settings
 * Does NOT show bottom tabs (stack navigation)
 * Full screen green background matching signup screen theme
 */
export function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const phone = useAppSelector(state => state.session.phone);

  // TODO: Get actual user data from API/Redux
  // For now, using placeholder data
  const userData = {
    name: '', // نام - Will be fetched from API
    phone: phone || '', // فون نمبر
    village: '', // گاؤں - Will be fetched from API
    tehsil: '', // تحصیل - Will be fetched from API
    zila: '', // ضلع - Will be fetched from API
    fasal: '', // فصل - Will be fetched from API
    raqba: '', // رقبہ - Will be fetched from API
  };

  const handleUpdate = () => {
    // TODO: Implement update functionality
    console.log('Update profile');
  };

  return (
    <BaseScreen>
      <UIView flex style={{ backgroundColor: '#064e3b' }}>
        {/* Fixed Header Section */}
        <View style={{ paddingTop: 60, paddingHorizontal: 30, paddingBottom: 20 }}>
          {/* Heading with Back Icon */}
          <View className="items-end gap-2" style={{ position: 'relative', width: '100%' }}>
            {/* Back Button - On card's top left, near heading */}
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                padding: 8,
              }}
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <AppText className="text-3xl font-bold text-white text-right">
              پروفائل
            </AppText>
          </View>
        </View>

        {/* Scrollable Form Section - Takes available space */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 30,
            paddingTop: 10,
            paddingBottom: 80, // Bottom padding for safe area
          }}
        >
          {/* Form card - Matching Signup Screen Style */}
          <View className="rounded-3xl bg-surface px-5 py-4 shadow-lg shadow-black/30 border border-white/10">
          {/* Name */}
          <View className="mb-4 items-end">
            <AppText className="text-white mb-2 text-right">نام</AppText>
            <TextField
              value={userData.name}
              editable={false}
              placeholder=""
              textAlign="right"
              color="white"
              containerStyle={{
                borderRadius: 16,
                backgroundColor: '#047857',
                paddingHorizontal: 12,
                paddingVertical: 0,
                height: 44,
                width: '100%',
                justifyContent: 'center',
              }}
            />
          </View>

          {/* Phone Number */}
          <View className="mb-4 items-end">
            <AppText className="text-white mb-2 text-right">فون نمبر</AppText>
            <TextField
              value={userData.phone}
              editable={false}
              placeholder=""
              textAlign="right"
              color="white"
              containerStyle={{
                borderRadius: 16,
                backgroundColor: '#047857',
                paddingHorizontal: 12,
                paddingVertical: 0,
                height: 44,
                width: '100%',
                justifyContent: 'center',
              }}
            />
          </View>

   

          {/* Village */}
          <View className="mb-4 items-end">
            <AppText className="text-white mb-2 text-right">گاؤں</AppText>
            <TextField
              value={userData.village}
              editable={false}
              placeholder=""
              textAlign="right"
              color="white"
              containerStyle={{
                borderRadius: 16,
                backgroundColor: '#047857',
                paddingHorizontal: 12,
                paddingVertical: 0,
                height: 44,
                width: '100%',
                justifyContent: 'center',
              }}
            />
          </View>

          {/* Tehsil */}
          <View className="mb-4 items-end">
            <AppText className="text-white mb-2 text-right">تحصیل</AppText>
            <TextField
              value={userData.tehsil}
              editable={false}
              placeholder=""
              textAlign="right"
              color="white"
              containerStyle={{
                borderRadius: 16,
                backgroundColor: '#047857',
                paddingHorizontal: 12,
                paddingVertical: 0,
                height: 44,
                width: '100%',
                justifyContent: 'center',
              }}
            />
          </View>

          {/* District (Zila) */}
          <View className="mb-4 items-end">
            <AppText className="text-white mb-2 text-right">ضلع</AppText>
            <TextField
              value={userData.zila}
              editable={false}
              placeholder=""
              textAlign="right"
              color="white"
              containerStyle={{
                borderRadius: 16,
                backgroundColor: '#047857',
                paddingHorizontal: 12,
                paddingVertical: 0,
                height: 44,
                width: '100%',
                justifyContent: 'center',
              }}
            />
          </View>

          {/* Crop (Fasal) */}
          <View className="mb-4 items-end">
            <AppText className="text-white mb-2 text-right">فصل</AppText>
            <TextField
              value={userData.fasal}
              editable={false}
              placeholder=""
              textAlign="right"
              color="white"
              containerStyle={{
                borderRadius: 16,
                backgroundColor: '#047857',
                paddingHorizontal: 12,
                paddingVertical: 0,
                height: 44,
                width: '100%',
                justifyContent: 'center',
              }}
            />
          </View>

          {/* Area (Raqba) */}
          <View className="mb-5 items-end">
            <AppText className="text-white mb-2 text-right">رقبہ</AppText>
            <TextField
              value={userData.raqba}
              editable={false}
              placeholder=""
              textAlign="right"
              color="white"
              containerStyle={{
                borderRadius: 16,
                backgroundColor: '#047857',
                paddingHorizontal: 12,
                paddingVertical: 0,
                height: 44,
                width: '100%',
                justifyContent: 'center',
              }}
            />
          </View>
          </View>

          {/* Update Button - Inside ScrollView */}
          <View style={{ marginTop: 20 }}>
            <Button
              label="اپ ڈیٹ کریں"
              onPress={handleUpdate}
              style={{
                borderRadius: 16,
                backgroundColor: '#8c43b4',
                paddingVertical: 12,
              }}
              labelStyle={{
                color: 'white',
                fontSize: 16,
              }}
            />
          </View>
        </ScrollView>
      </UIView>
    </BaseScreen>
  );
}
