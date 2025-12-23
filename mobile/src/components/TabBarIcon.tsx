import React from "react";
import { View } from "react-native";
import { LucideIcon, Home, Lightbulb, Zap, Sparkles, User } from "lucide-react-native";
import { theme } from "../design/theme";

type IconName = "home" | "lightbulb" | "zap" | "sparkles" | "user";

const iconMap: Record<IconName, LucideIcon> = {
  home: Home,
  lightbulb: Lightbulb,
  zap: Zap,
  sparkles: Sparkles,
  user: User,
};

type Props = {
  name: IconName;
  color: string;
  size: number;
};

export function TabBarIcon({ name, color, size }: Props) {
  const Icon = iconMap[name];
  return (
    <View
      style={{
        backgroundColor: "transparent",
        borderRadius: theme.radius.md,
        padding: theme.spacing.xs / 2,
      }}
    >
      <Icon color={color} size={size} strokeWidth={2.25} />
    </View>
  );
}
