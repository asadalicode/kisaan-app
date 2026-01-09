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
  // For confirmation dialogs with two buttons
  showCancel?: boolean;
  cancelText?: string;
  onCancel?: () => void;
};

export function CustomAlert({
  visible,
  title,
  message,
  buttonText = 'ٹھیک ہے',
  onPress,
  onDismiss,
  showCancel = false,
  cancelText = 'نہیں',
  onCancel,
}: CustomAlertProps) {
  const handlePress = () => {
    onPress?.();
    onDismiss?.();
  };

  const handleCancel = () => {
    onCancel?.();
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

          {/* Buttons */}
          {showCancel ? (
            // Two buttons layout (Yes/No)
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {/* Cancel Button (No) */}
              <TouchableOpacity
                onPress={handleCancel}
                style={{
                  flex: 1,
                  backgroundColor: '#374151',
                  borderRadius: 12,
                  paddingVertical: 12,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#4b5563',
                }}
              >
                <AppText className="text-white font-semibold text-base">
                  {cancelText}
                </AppText>
              </TouchableOpacity>

              {/* Confirm Button (Yes) */}
              <TouchableOpacity
                onPress={handlePress}
                style={{
                  flex: 1,
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
          ) : (
            // Single button layout
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
          )}
        </View>
      </View>
    </Modal>
  );
}

