import React from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { AppText } from './AppText';

type CustomAlertProps = {
  visible: boolean;
  title: string;
  message: string;
  buttonText?: string;
  onPress?: () => void;
  onDismiss?: () => void;
};

export function CustomAlert({
  visible,
  title,
  message,
  buttonText = 'ٹھیک ہے',
  onPress,
  onDismiss,
}: CustomAlertProps) {
  const handlePress = () => {
    onPress?.();
    onDismiss?.();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <View
          style={{
            backgroundColor: '#1f2937',
            borderRadius: 16,
            padding: 24,
            width: '100%',
            maxWidth: 350,
            borderWidth: 1,
            borderColor: '#374151',
          }}
        >
          {/* Title - Centered */}
          <View className="items-center mb-4">
            <AppText className="text-white text-xl font-bold text-center">
              {title}
            </AppText>
          </View>

          {/* Message - Right aligned for Urdu */}
          <View className="items-end mb-6">
            <AppText className="text-surface-light/90 text-base text-right leading-6">
              {message}
            </AppText>
          </View>

          {/* Button */}
          <TouchableOpacity
            onPress={handlePress}
            style={{
              backgroundColor: '#8c43b4',
              borderRadius: 12,
              paddingVertical: 12,
              alignItems: 'center',
            }}
          >
            <AppText className="text-white font-semibold text-base">
              {buttonText}
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

