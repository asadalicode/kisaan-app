import PhoneInput from '@perttu/react-native-phone-number-input';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import { Button, View as UIView } from 'react-native-ui-lib';

import { BaseScreen } from '@/components/layout/BaseScreen';
import { AppText } from '@/components/ui/AppText';
import { ViewName } from '@/constants/routes';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import type { AuthStackParamList } from '@/providers/RoutesProvider';
import { navigateRoot } from '@/services/NavigationService';
import { setAccessToken, setPhone } from '@/slices/sessionSlice';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const [phone, setPhoneInput] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const phoneInputRef = useRef<PhoneInput | null>(null);

  const handleSendOtp = () => {
    if (phone) {
      setShowOtpField(true);
      // In real app, this would call an API to send OTP
      console.log('OTP sent to:', phone);
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      // In real app, this would verify OTP with backend
      console.log('Verifying OTP:', {
        phone,
        otp,
        timestamp: new Date().toISOString(),
      });
      
      // Simulate successful login
      dispatch(setPhone(phone));
      dispatch(setAccessToken('demo-token'));
      navigateRoot(ViewName.Home);
    }
  };

  return (
    <BaseScreen backgroundImage={require('../../assets/bg/bg-1.jpg')}>
      <UIView flex padding-30 centerV>
        {/* Heading */}
        <View className="items-end gap-2 mb-10">
          <AppText className="text-3xl font-bold text-surface-light">
            لاگ ان کریں
          </AppText>
          <AppText className="text-surface-light/80 text-right">
            براہِ کرم اپنا فون نمبر درج کریں
          </AppText>
        </View>

        {/* Form card */}
        <View className="rounded-3xl bg-surface px-5 py-6 shadow-lg shadow-black/30 border border-white/10 mb-5">
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
          </View>

          {/* OTP field - shows after Send OTP is clicked */}
          {showOtpField && (
            <View className="mb-5 items-end">
              <AppText className="text-white mb-8 text-right">او ٹی پی</AppText>
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-end',
                }}
              >
                <OtpInputs
                  handleChange={setOtp}
                  numberOfInputs={6}
                  autofillFromClipboard={false}
                  inputContainerStyles={{
                    marginHorizontal: 4,
                  }}
                  inputStyles={{
                    backgroundColor: '#047857',
                    borderRadius: 12,
                    color: 'white',
                    fontSize: 16,
                    fontWeight: '700',
                    width: 45,
                    height: 45,
                    borderWidth: 0,
                    textAlign: 'center',
                  }}
                  focusStyles={{
                    borderWidth: 2,
                    borderColor: '#8c43b4',
                    borderRadius: 12,
                    backgroundColor: '#065f46',
                  }}
                />
              </View>
            </View>
          )}
        </View>

        {/* Buttons */}
        {!showOtpField ? (
          <Button
            label="او ٹی پی بھیجیں"
            onPress={handleSendOtp}
            disabled={!phone}
            style={{
              borderRadius: 16,
              backgroundColor: phone ? '#8c43b4' : '#6b7280',
              paddingVertical: 12,
            }}
            labelStyle={{
              color: 'white',
              fontSize: 16,
            }}
          />
        ) : (
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
        )}

        {/* Signup link */}
        <TouchableOpacity
          onPress={() => navigation.navigate(ViewName.Signup)}
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
            اکاؤنٹ نہیں ہے؟{' '}
            <AppText
              className="text-white font-bold underline"
              style={{
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 3,
              }}
            >
              سائن اپ کریں
            </AppText>
          </AppText>
        </TouchableOpacity>
      </UIView>
    </BaseScreen>
  );
}

