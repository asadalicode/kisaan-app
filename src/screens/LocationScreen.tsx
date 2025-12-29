import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import { Video, ResizeMode } from 'expo-av';
import React, { useState, useRef } from 'react';
import { Alert, Modal, TouchableOpacity, View } from 'react-native';
import { Button, View as UIView } from 'react-native-ui-lib';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { BaseScreen } from '@/components/layout/BaseScreen';
import { AppText } from '@/components/ui/AppText';
import { ViewName } from '@/constants/routes';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import type { AuthStackParamList } from '@/providers/RoutesProvider';
import { navigateRoot } from '@/services/NavigationService';
import { setAccessToken, setPhone } from '@/slices/sessionSlice';

type LocationScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export function LocationScreen() {
  const navigation = useNavigation<LocationScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const videoRef = useRef<Video>(null);
  const scale = useSharedValue(1);

  // Animated play button
  React.useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.1, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // Autoplay video every time modal is opened
  React.useEffect(() => {
    if (showVideoModal && videoRef.current) {
      // Restart from beginning and play
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
  };

  const handleConfirmLocation = async () => {
    try {
      // Check if location permission is granted
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'اجازت درکار',
          'مقام کی تصدیق کے لیے لوکیشن کی اجازت درکار ہے۔ براہِ کرم اپنی سیٹنگز میں جا کر اجازت دیں۔',
          [{ text: 'ٹھیک ہے', style: 'default' }]
        );
        return;
      }

      // Get current location
      let location = await Location.getCurrentPositionAsync({});
      
      // Show success alert with tick
      Alert.alert(
        '✓',
        'مقام کی تصدیق ہو گئی',
        [
          {
            text: 'ٹھیک ہے',
            onPress: () => {
              // Navigate to home after confirmation
              dispatch(setPhone('demo-user'));
              dispatch(setAccessToken('demo-token'));
              navigateRoot(ViewName.Home);
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert(
        'خرابی',
        'مقام حاصل کرنے میں مسئلہ آیا۔ براہِ کرم دوبارہ کوشش کریں۔',
        [{ text: 'ٹھیک ہے' }]
      );
    }
  };

  return (
    <BaseScreen backgroundImage={require('../../assets/bg/bg-1.jpg')}>
      <UIView flex padding-30 centerV>
        {/* Heading */}
        <View className="items-end gap-2 mb-8">
          <AppText className="text-3xl font-bold text-surface-light text-right">
            ہدایات
          </AppText>
        </View>

        {/* Instructions */}
        <View className="mb-8 items-end">
          <AppText className="text-surface-light/90 text-right text-base mb-4 leading-6">
            اپنے کھیت میں جا کر نیچے لال بٹن دبائیں
          </AppText>
        </View>

        {/* Video Instructions Section */}
        <View className="mb-8 items-center">
          <AppText className="text-white mb-4 text-right text-lg font-semibold">
            وڈیو ہدایات
          </AppText>
          
          {/* Animated Play Button */}
          <TouchableOpacity
            onPress={handlePlayVideo}
            activeOpacity={0.8}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: '#dc2626',
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <Animated.View style={animatedStyle}>
              <View
                style={{
                  width: 0,
                  height: 0,
                  borderLeftWidth: 20,
                  borderRightWidth: 0,
                  borderTopWidth: 12,
                  borderBottomWidth: 12,
                  borderLeftColor: 'white',
                  borderTopColor: 'transparent',
                  borderBottomColor: 'transparent',
                  marginLeft: 4,
                }}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Confirm Location Button */}
        <Button
          label="مقام کی تصدیق"
          onPress={handleConfirmLocation}
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
      </UIView>
    </BaseScreen>
  );
}

