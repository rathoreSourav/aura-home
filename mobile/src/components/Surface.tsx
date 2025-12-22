import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { theme } from "../design/theme";

type Props = {
  children: ReactNode;
  style?: ViewStyle;
};

export function Surface({ children, style }: Props) {
  return <View style={[styles.surface, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  surface: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
  },
});
