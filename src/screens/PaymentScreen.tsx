import { ResizeMode, Video } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { Button, Incubator, View as UIView } from 'react-native-ui-lib';

import { BaseScreen } from '@/components/layout/BaseScreen';
import { AppText } from '@/components/ui/AppText';
import { CustomAlert } from '@/components/ui/CustomAlert';

/**
 * Payment Screen - For making payments in main app
 * Works in tab navigator context (no navigation to other screens)
 */
export function PaymentScreen() {
  const { TextField } = Incubator;
  const [paymentAmount, setPaymentAmount] = useState('');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [alert, setAlert] = useState<{
    visible: boolean;
    title: string;
    message: string;
    onPress?: () => void;
  }>({
    visible: false,
    title: '',
    message: '',
  });
  const videoRef = useRef<Video>(null);

  // Auto-play video when screen loads
  useEffect(() => {
    setShowVideoModal(true);
  }, []);

  // Autoplay video every time modal is opened
  useEffect(() => {
    if (showVideoModal && videoRef.current) {
      videoRef.current.replayAsync();
    }
  }, [showVideoModal]);

  const handleCloseVideo = () => {
    setShowVideoModal(false);
    if (videoRef.current) {
      videoRef.current.pauseAsync();
    }
  };

  const handlePayment = () => {
    if (!paymentAmount) {
      setAlert({
        visible: true,
        title: 'خرابی',
        message: 'براہِ کرم رقم درج کریں',
      });
      return;
    }

    setAlert({
      visible: true,
      title: 'کامیابی',
      message: 'ادائیگی کامیابی سے ہو گئی',
      onPress: () => {
        setAlert({ ...alert, visible: false });
        setPaymentAmount(''); // Clear amount after successful payment
      },
    });
  };

  return (
    <BaseScreen backgroundImage={require('../../assets/bg/bg-1.jpg')}>
      <UIView flex padding-30 centerV>
        {/* Heading */}
        <View className="items-end gap-2 mb-8">
          <AppText className="text-3xl font-bold text-surface-light text-right">
            ادائیگی
          </AppText>
        </View>

        {/* Instructions */}
        <View className="mb-8 items-end">
          <AppText className="text-surface-light/90 text-right text-base mb-4 leading-6">
            یہ رقم وڈیوز کے لیے استعمال ہوگی
          </AppText>
        </View>

        {/* Payment Form Card */}
        <View className="rounded-3xl bg-surface px-5 py-6 shadow-lg shadow-black/30 border border-white/10 mb-5">
          {/* Amount Input */}
          <View className="mb-5 items-end">
            <AppText className="text-white mb-2 text-right">رقم</AppText>
            <TextField
              value={paymentAmount}
              onChangeText={setPaymentAmount}
              placeholder="رقم درج کریں"
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
        </View>

        {/* Submit Button */}
        <Button
          label="پیسے بھیجیں"
          onPress={handlePayment}
          disabled={!paymentAmount}
          style={{
            borderRadius: 16,
            backgroundColor: paymentAmount ? '#8c43b4' : '#6b7280',
            paddingVertical: 12,
          }}
          labelStyle={{
            color: 'white',
            fontSize: 16,
          }}
        />

        {/* Video Modal - Auto-opens on screen load */}
        <Modal
          visible={showVideoModal}
          animationType="fade"
          transparent={true}
          onRequestClose={handleCloseVideo}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            }}
          >
            <View
              style={{
                width: '100%',
                maxWidth: 400,
                backgroundColor: '#1f2937',
                borderRadius: 16,
                overflow: 'hidden',
              }}
            >
              {/* Video Player */}
              <Video
                ref={videoRef}
                source={{
                  uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                }}
                style={{
                  width: '100%',
                  height: 250,
                }}
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                shouldPlay={false}
              />

              {/* Close Button */}
              <View style={{ padding: 16, alignItems: 'flex-end' }}>
                <TouchableOpacity
                  onPress={handleCloseVideo}
                  style={{
                    backgroundColor: '#8c43b4',
                    paddingHorizontal: 24,
                    paddingVertical: 12,
                    borderRadius: 12,
                  }}
                >
                  <AppText className="text-white font-semibold">بند کریں</AppText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Custom Alert */}
        <CustomAlert
          visible={alert.visible}
          title={alert.title}
          message={alert.message}
          onPress={alert.onPress}
          onDismiss={() => setAlert({ ...alert, visible: false })}
        />
      </UIView>
    </BaseScreen>
  );
}

