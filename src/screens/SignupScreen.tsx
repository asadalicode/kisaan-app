import { MaterialIcons } from '@expo/vector-icons';
import PhoneInput from '@perttu/react-native-phone-number-input';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { Button, Incubator, View as UIView } from 'react-native-ui-lib';

import { BaseScreen } from '@/components/layout/BaseScreen';
import { AppText } from '@/components/ui/AppText';
import { Chip } from '@/components/ui/Chip';
import { ViewName } from '@/constants/routes';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import type { AuthStackParamList } from '@/providers/RoutesProvider';

type SignupScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export function SignupScreen() {
  const { TextField } = Incubator;
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [phone, setPhoneInput] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [landArea, setLandArea] = useState('');
  const [crop, setCrop] = useState('گندم');
  const [showOtpView, setShowOtpView] = useState(false);
  const [otp, setOtp] = useState('');
  const phoneInputRef = useRef<PhoneInput | null>(null);
  const otpInputRef = useRef<any>(null);

  const handleSignup = () => {
    // Validate required fields
    if (!name || !phone || !landArea) {
      return;
    }

    // Normalize and validate Pakistani phone number (11 digits, starts with 03)
    let digits = phone.replace(/\D/g, '');
    if (digits.startsWith('92')) {
      digits = '0' + digits.slice(2);
    }

    const isValidPhone = /^03[0-9]{9}$/.test(digits);

    if (!isValidPhone) {
      setPhoneError('فون نمبر صحیح درج کریں');
      return;
    }

    // Save normalized phone and clear error
    setPhoneInput(digits);
    setPhoneError('');

    // Show OTP view
    setShowOtpView(true);
    // In real app, this would call an API to send OTP
    console.log('OTP sent to:', digits);
  };

  const handleOtpFilled = (text: string) => {
    setOtp(text);
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      // In real app, this would verify OTP with backend
      console.log('Verifying OTP:', {
        name,
        phone,
        landArea,
        crop,
        otp,
        timestamp: new Date().toISOString(),
      });

      // Navigate to location onboarding screen after OTP verification
      navigation.navigate(ViewName.Location);
    }
  };

  const handleBackToForm = () => {
    setShowOtpView(false);
    setOtp('');
  };

  return (
    <BaseScreen
      backgroundImage={require('../../assets/bg/bg-1.jpg')}
    >
      <UIView flex padding-30 centerV>
        {!showOtpView ? (
          <>
            {/* Heading */}
            <View className="items-end gap-2 mb-10">
              <AppText className="text-3xl font-bold text-surface-light text-right">
                کسان ایپ میں خوش آمدید
              </AppText>
              <AppText className="text-surface-light text-right text-lg font-semibold leading-6">
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
              onChangeFormattedText={value => {
                setPhoneInput(value);
                if (phoneError) {
                  setPhoneError('');
                }
              }}
            />
            {phoneError ? (
              <View className="mt-2 items-end">
                <AppText className="text-red-400 text-sm text-right">
                  {phoneError}
                </AppText>
              </View>
            ) : null}
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
              <View className="flex-row flex-wrap justify-between" style={{ rowGap: 8 }}>
                {['گندم', 'چاول', 'مکئی'].map(option => (
                  <View key={option} style={{ width: '30%' }}>
                    <Chip
                      label={option}
                      selected={crop === option}
                      onPress={() => setCrop(option)}
                    />
                  </View>
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
                className="text-white text-center text-lg font-semibold"
                style={{
                  textShadowColor: 'rgba(0, 0, 0, 0.9)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 4,
                }}
              >
                پہلے سے اکاؤنٹ ہے؟{' '}
                <AppText
                  className="text-white font-bold underline"
                  style={{
                    textShadowColor: 'rgba(0, 0, 0, 0.9)',
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 4,
                  }}
                >
                  لاگ ان کریں
                </AppText>
              </AppText>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* OTP View */}
            {/* Back Button - Top Left */}
            {/* <TouchableOpacity
              onPress={handleBackToForm}
              activeOpacity={0.7}
              style={{
                alignSelf: 'flex-start',
                marginBottom: 24,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              }}
            >
              <MaterialIcons name="arrow-back" size={20} color="white" />
              <AppText className="text-white text-base font-semibold">
                واپس
              </AppText>
            </TouchableOpacity> */}

            {/* Heading */}
            <View className="items-end gap-2 mb-10">
              <AppText className="text-3xl font-bold text-surface-light text-right">
                او ٹی پی تصدیق
              </AppText>
              <AppText className="text-surface-light/80 text-right">
                براہِ کرم {phone} پر بھیجا گیا کوڈ درج کریں
              </AppText>
            </View>

            {/* OTP Form card */}
            <View className="rounded-3xl bg-surface px-5 py-6 shadow-lg shadow-black/30 border border-white/10 mb-5">
              <View className="mb-5 items-end">
                <AppText className="text-white mb-4 text-right">او ٹی پی</AppText>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'flex-end',
                  }}
                >
                  <OtpInput
                    ref={otpInputRef}
                    numberOfDigits={6}
                    onTextChange={setOtp}
                    onFilled={handleOtpFilled}
                    type="numeric"
                    autoFocus={true}
                    focusColor="#8c43b4"
                    blurOnFilled={false}
                    hideStick={false}
                    theme={{
                      containerStyle: {
                        width: 'auto',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        gap: 8,
                      },
                      pinCodeContainerStyle: {
                        flex: 1,
                        maxWidth: 52,
                        height: 52,
                        backgroundColor: '#047857',
                        borderRadius: 12,
                        borderWidth: 0,
                        minWidth: 45,
                      },
                      pinCodeTextStyle: {
                        color: 'white',
                        fontSize: 20,
                        fontWeight: '700',
                        textAlign: 'center',
                      },
                      focusStickStyle: {
                        backgroundColor: '#8c43b4',
                        width: 2,
                      },
                      focusedPinCodeContainerStyle: {
                        backgroundColor: '#065f46',
                        borderWidth: 2,
                        borderColor: '#8c43b4',
                        borderRadius: 12,
                      },
                      filledPinCodeContainerStyle: {
                        backgroundColor: '#047857',
                      },
                    }}
                  />
                </View>
              </View>
            </View>

            {/* Verify OTP Button */}
            <Button
              label="او ٹی پی تصدیق کریں"
              onPress={handleVerifyOtp}
              disabled={otp.length !== 6}
              style={{
                borderRadius: 16,
                backgroundColor: otp.length === 6 ? '#8c43b4' : '#6b7280',
                paddingVertical: 12,
              }}
              labelStyle={{
                color: 'white',
                fontSize: 16,
              }}
            />

            {/* Back to form link at bottom */}
            <TouchableOpacity
              onPress={handleBackToForm}
              activeOpacity={0.7}
              style={{
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <MaterialIcons name="edit" size={20} color="white" />
              <AppText
                className="text-white text-center text-lg font-semibold"
                style={{
                  textShadowColor: 'rgba(0, 0, 0, 0.9)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 4,
                }}
              >
                فون نمبر تبدیل کریں
              </AppText>
            </TouchableOpacity>
          </>
        )}
      </UIView>
    </BaseScreen>
  );
}


