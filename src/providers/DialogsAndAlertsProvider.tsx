import React, { createContext, useCallback, useState } from 'react';
import { View } from 'react-native';

type DialogsAndAlertsContextValue = {
  // Placeholder for future toast/dialog APIs
  showPlaceholder: () => void;
};

export const DialogsAndAlertsContext =
  createContext<DialogsAndAlertsContextValue>({
    showPlaceholder: () => {},
  });

export function DialogsAndAlertsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [_, setState] = useState(false);

  const showPlaceholder = useCallback(() => {
    setState(s => !s);
  }, []);

  return (
    <DialogsAndAlertsContext.Provider value={{ showPlaceholder }}>
      <View style={{ flex: 1 }}>{children}</View>
    </DialogsAndAlertsContext.Provider>
  );
}


