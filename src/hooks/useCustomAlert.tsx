import { useState } from 'react';
import { CustomAlert } from '@/components/ui/CustomAlert';

type AlertOptions = {
  title: string;
  message: string;
  buttonText?: string;
  onPress?: () => void;
};

export function useCustomAlert() {
  const [alert, setAlert] = useState<AlertOptions | null>(null);

  const showAlert = (options: AlertOptions) => {
    setAlert(options);
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const AlertComponent = () => {
    if (!alert) return null;

    return (
      <CustomAlert
        visible={!!alert}
        title={alert.title}
        message={alert.message}
        buttonText={alert.buttonText}
        onPress={alert.onPress}
        onDismiss={hideAlert}
      />
    );
  };

  return { showAlert, AlertComponent };
}

