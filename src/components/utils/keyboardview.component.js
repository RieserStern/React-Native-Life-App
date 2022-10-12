import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { colors } from "../../infrastructures/theme/colors";

export const KeyboardView = ({ children }) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1, backgroundColor: colors.bg.primary }}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};
