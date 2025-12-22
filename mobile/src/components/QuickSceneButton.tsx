import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { theme } from "../design/theme";

type Props = {
  label: string;
  active?: boolean;
  onPress?: () => void;
};

export function QuickSceneButton({ label, active, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: active ? "#FFF3E9" : "#F6F7FB",
          borderColor: active ? "#FFD3A0" : "#ECECF2",
        },
      ]}
    >
      <Text style={[styles.label, active && { color: theme.colors.primary }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontWeight: "600",
    color: theme.colors.muted,
  },
});
