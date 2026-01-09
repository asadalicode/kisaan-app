import PhoneInput from '@perttu/react-native-phone-number-input';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { Button, View as UIView } from 'react-native-ui-lib';

import { BaseScreen } from '@/components/layout/BaseScreen';
import { AppText } from '@/components/ui/AppText';
import { ViewName } from '@/constants/routes';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import type { AuthStackParamList } from '@/providers/RoutesProvider';
import { navigateRoot } from '@/services/NavigationService';
import { setAccessToken, setPhone } from '@/slices/sessionSlice';
import { loginSchema } from '@/utils/validationSchemas';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [otpPhone, setOtpPhone] = useState('');
  const phoneInputRef = useRef<PhoneInput | null>(null);
  const otpInputRef = useRef<any>(null);

  const handleVerifyOtp = (phone: string) => {
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
        <Formik
          initialValues={{ phone: '' }}
          validationSchema={loginSchema}
          onSubmit={({ phone }) => {
            setShowOtpField(true);
            setOtp('');
            setOtpPhone(phone);
            console.log('OTP sent to:', phone);
          }}
        >
          {({ handleSubmit, setFieldValue, values, errors, touched }) => (
            <>
              {/* Heading */}
              <View className="items-end gap-2 mb-10">
                <AppText className="text-3xl font-bold text-surface-light text-right">
                  لاگ اِن کریں
                </AppText>
                <AppText className="text-surface-light text-right text-lg font-semibold leading-6">
                  براہِ کرم اپنا فون نمبر صحیح درج کریں
                </AppText>
              </View>

              {/* Form card */}
              <View className="rounded-3xl bg-surface px-5 py-6 shadow-lg shadow-black/30 border border-white/10 mb-5">
                {/* Phone number */}
                <View className="mb-3 items-end">
                  <AppText className="text-white mb-2 text-right">فون نمبر</AppText>
                  <PhoneInput
                    ref={phoneInputRef}
                    defaultCode="PK"
                    layout="first"
                    containerStyle={{
                      width: '100%',
                      height: 48,
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
                    value={values.phone}
                    onChangeFormattedText={value => {
                      // اگر user OTP کے بعد نمبر دوبارہ لکھے تو OTP step reset کر دیں
                      if (showOtpField) {
                        setShowOtpField(false);
                        setOtp('');
                        setOtpPhone('');
                      }

                      const normalized = value.replace(/^\+92/, '0'); // +92 کو 03... میں بدلتا ہے
                      setFieldValue('phone', normalized);
                    }}
                  />
                </View>

                {/* Phone validation error */}
                {touched.phone && errors.phone && (
                  <View className="items-end mb-3">
                    <AppText className="text-red-400 text-sm text-right">
                      {errors.phone}
                    </AppText>
                  </View>
                )}

                {/* OTP field - shows after Send OTP is clicked */}
                {showOtpField && (
                  <View className="mt-4 mb-2 items-end">
                    <AppText className="text-white mb-2 text-right">او ٹی پی</AppText>
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
                        onFilled={setOtp}
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
                )}
              </View>

              {/* Buttons */}
              {!showOtpField ? (
                <Button
                  label="او ٹی پی حاصل کریں"
                  onPress={handleSubmit as any}
                  disabled={!values.phone || !!errors.phone}
                  style={{
                    borderRadius: 16,
                    backgroundColor:
                      values.phone && !errors.phone ? '#8c43b4' : '#6b7280',
                    paddingVertical: 12,
                  }}
                  labelStyle={{
                    color: 'white',
                    fontSize: 16,
                  }}
                />
              ) : (
                (() => {
                  const canLogin =
                    otp.length === 6 &&
                    !errors.phone &&
                    !!values.phone &&
                    showOtpField &&
                    values.phone === otpPhone;

                  return (
                    <Button
                      label="لاگ اِن کریں"
                      onPress={() => handleVerifyOtp(values.phone)}
                      disabled={!canLogin}
                      style={{
                        borderRadius: 16,
                        backgroundColor: canLogin ? '#8c43b4' : '#6b7280',
                        paddingVertical: 12,
                      }}
                      labelStyle={{
                        color: 'white',
                        fontSize: 16,
                      }}
                    />
                  );
                })()
              )}

              {/* Register link */}
              <TouchableOpacity
                onPress={() => navigation.navigate(ViewName.Signup)}
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
                  اکاؤنٹ نہیں ہے؟{' '}
                  <AppText
                    className="text-white font-bold underline"
                    style={{
                      textShadowColor: 'rgba(0, 0, 0, 0.9)',
                      textShadowOffset: { width: 0, height: 1 },
                      textShadowRadius: 4,
                    }}
                  >
                    رجسٹر کریں
                  </AppText>
                </AppText>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </UIView>
    </BaseScreen>
  );
}

