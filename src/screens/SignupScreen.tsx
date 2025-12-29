import PhoneInput from '@perttu/react-native-phone-number-input';
import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Incubator, View as UIView } from 'react-native-ui-lib';

import { BaseScreen } from '@/components/layout/BaseScreen';
import { AppText } from '@/components/ui/AppText';
import { Chip } from '@/components/ui/Chip';
import { ViewName } from '@/constants/routes';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import type { AuthStackParamList } from '@/providers/RoutesProvider';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SignupScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export function SignupScreen() {
  const { TextField } = Incubator;
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const [name, setName] = React.useState('');
  const [phone, setPhoneInput] = React.useState('');
  const [landArea, setLandArea] = React.useState('');
  const [crop, setCrop] = React.useState('گندم');
  const phoneInputRef = useRef<PhoneInput | null>(null);

  const handleSignup = () => {
    // Navigate to location onboarding screen
    navigation.navigate(ViewName.Location);
  };

  return (
    <BaseScreen
      backgroundImage={require('../../assets/bg/bg-1.jpg')}
    >
      <UIView flex padding-30 centerV>
          {/* Heading */}
          <View className="items-end gap-2 mb-10">
            <AppText className="text-3xl font-bold text-surface-light">
              کسان ایپ میں خوش آمدید
            </AppText>
            <AppText className="text-surface-light/80 text-right">
              براہِ کرم اپنی معلومات درج کریں
            </AppText>
          </View>

          {/* Form card */}
          <View className="rounded-3xl bg-surface px-5 py-6 shadow-lg shadow-black/30 border border-white/10 mb-5">
          {/* Name */}
          <View className="mb-5 items-end">
            <AppText className="text-white mb-2 text-right">نام</AppText>
            <TextField
              value={name}
              onChangeText={setName}
              placeholder="اپنا نام لکھیں"
              placeholderTextColor="#bbf7d0"
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

          {/* Phone number */}
          <View className="mb-5 items-end">
            <AppText className="text-white mb-2 text-right">فون نمبر</AppText>
            <PhoneInput
              ref={phoneInputRef}
              defaultCode="PK"
              layout="first"
              containerStyle={{
                width: '100%',
                height: 44,
                borderRadius: 16,
                backgroundColor: '#047857',
              }}
              textContainerStyle={{
                borderTopRightRadius: 16,
                borderBottomRightRadius: 16,
                backgroundColor: 'transparent',
                paddingVertical: 0,
              }}
              textInputProps={{
                placeholder: '',
                keyboardType: 'phone-pad',
                textContentType: 'telephoneNumber',
              }}
              textInputStyle={{
                color: 'white',
                fontSize: 15,
                textAlignVertical: 'center',
              }}
              codeTextStyle={{ color: 'white', fontSize: 14 }}
              value={phone}
              onChangeFormattedText={setPhoneInput}
            />
            {/* {!phone && (
              <View className="mt-1 items-end">
                <AppText className="text-xs text-emerald-100">
                  مثال: 0300 1234567
                </AppText>
              </View>
            )} */}
          </View>

          {/* Land area */}
          <View className="mb-5 items-end">
            <AppText className="text-white mb-2 text-right">زمین کا رقبہ</AppText>
            <View className="flex-row items-center w-full" style={{ gap: 8 }}>
              <View className="flex-1">
                <TextField
                  value={landArea}
                  onChangeText={setLandArea}
                  placeholder="0"
                  placeholderTextColor="#bbf7d0"
                  textAlign="right"
                  keyboardType="numeric"
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
              <View
                style={{
                  borderRadius: 16,
                  backgroundColor: '#047857',
                  height: 44,
                  paddingHorizontal: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <AppText className="text-white text-base">ایکڑ</AppText>
              </View>
            </View>
          </View>

          {/* Crop selection */}
          <View className="items-end mb-4">
            <AppText className="text-white mb-3 text-right">فصل کا نام</AppText>
            <View className="w-full rounded-xl bg-surface-light px-4 py-3">
              <AppText className="text-emerald-50 text-right mb-3">
                {crop}
              </AppText>
              <View className="flex-row justify-between">
                {['گندم', 'چاول', 'مکئی'].map(option => (
                  <Chip
                    key={option}
                    label={option}
                    selected={crop === option}
                    onPress={() => setCrop(option)}
                  />
                ))}
              </View>
            </View>
          </View>
          </View>

          {/* Submit button */}
          <Button
            label="تصدیق کریں"
            onPress={handleSignup}
            style={{
              marginTop: 16,
              borderRadius: 16,
              backgroundColor: '#8c43b4',
              paddingVertical: 12,
            }}
            labelStyle={{
              color: 'white',
              fontSize: 16,
            }}
          />

          {/* Login link */}
          <TouchableOpacity
            onPress={() => navigation.navigate(ViewName.Login)}
            activeOpacity={0.7}
            style={{ marginTop: 16 }}
          >
            <AppText
              className="text-white text-center text-base"
              style={{
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 3,
              }}
            >
              پہلے سے اکاؤنٹ ہے؟{' '}
              <AppText
                className="text-white font-bold underline"
                style={{
                  textShadowColor: 'rgba(0, 0, 0, 0.75)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 3,
                }}
              >
                لاگ ان کریں
              </AppText>
            </AppText>
          </TouchableOpacity>
        </UIView>
    </BaseScreen>
  );
}


