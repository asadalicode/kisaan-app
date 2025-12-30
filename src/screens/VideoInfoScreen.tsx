import { ResizeMode, Video } from 'expo-av';
import React, { useRef, useState } from 'react';
import { Dimensions, Modal, TouchableOpacity, View } from 'react-native';
import { Button, View as UIView } from 'react-native-ui-lib';

import { BaseScreen } from '@/components/layout/BaseScreen';
import { AppText } from '@/components/ui/AppText';
import { CustomAlert } from '@/components/ui/CustomAlert';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setAccessToken, setPhone } from '@/slices/sessionSlice';

export function VideoInfoScreen() {
  const dispatch = useAppDispatch();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [alert, setAlert] = useState<{
    visible: boolean;
    title: string;
    message: string;
  }>({
    visible: false,
    title: '',
    message: '',
  });
  const videoRef = useRef<Video>(null);
  const screenWidth = Dimensions.get('window').width;

  // Autoplay video every time modal is opened
  React.useEffect(() => {
    if (showVideoModal && videoRef.current) {
      videoRef.current.replayAsync();
    }
  }, [showVideoModal]);

  const handlePlayVideo = () => {
    setShowVideoModal(true);
  };

  const handleCloseVideo = () => {
    setShowVideoModal(false);
    if (videoRef.current) {
      videoRef.current.pauseAsync();
    }

    // Show alert after closing video
    setAlert({
      visible: true,
      title: 'معلومات',
      message: 'AT وڈیو 21 دن میں موصول ہو جائے گی',
    });
  };

  const handleContinue = () => {
    // Set auth token and navigate to payment screen
    dispatch(setPhone('demo-user'));
    dispatch(setAccessToken('demo-token'));
    // Navigation will automatically switch to AppNavigator due to auth state change
  };

  return (
    <BaseScreen backgroundImage={require('../../assets/bg/bg-1.jpg')}>
      <UIView flex padding-30 centerV>
        <View className="mt-auto">
          {/* Heading */}
          <View className="items-end gap-2 mb-8">
            <AppText className="text-3xl font-bold text-surface-light text-right">
              ہدایات
            </AppText>
          </View>

          {/* Instructions */}
          <View className="mb-8 items-end">
            <AppText className="text-surface-light/90 text-right text-base mb-4 leading-6">
              AT وڈیو 21 دن میں موصول ہو جائے گی
            </AppText>
          </View>

          {/* Video Button */}
          <View className="mb-8 items-center">
            <Button
              label="معلوماتی وڈیو"
              onPress={handlePlayVideo}
              style={{
                borderRadius: 16,
                backgroundColor: '#8c43b4',
                paddingVertical: 14,
                paddingHorizontal: 32,
                minWidth: 200,
              }}
              labelStyle={{
                color: 'white',
                fontSize: 16,
                fontWeight: '600',
              }}
            />
          </View>
        </View>

        {/* Ad Space */}
        <View
          style={{
            width: '100%',
            marginTop: 'auto',
            marginBottom: 20,
            alignItems: 'center',
          }}
        // className="flex-1 justify-end"
        >
          <View
            style={{
              width: screenWidth - 60,
              height: 100,
              backgroundColor: '#1f2937',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#374151',
              borderStyle: 'dashed',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 16,
            }}
          >
            <AppText className="text-surface-light/60 text-center text-sm">
              اشتہار کی جگہ
            </AppText>
            <AppText className="text-surface-light/40 text-center text-xs mt-1">
              Ad Space
            </AppText>
          </View>
        </View>

        <View className="mb-auto">
          {/* Continue Button */}
          <Button
            label="جاری رکھیں"
            onPress={handleContinue}
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

        {/* Video Modal */}
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
          onDismiss={() => setAlert({ ...alert, visible: false })}
        />
      </UIView>
    </BaseScreen>
  );
}

