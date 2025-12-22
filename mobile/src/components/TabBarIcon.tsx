import React from "react";
import { View } from "react-native";
import {
  LucideIcon,
  Home,
  Lightbulb,
  MessageCircle,
  Zap,
  Bell,
} from "lucide-react-native";
import { theme } from "../design/theme";

type IconName = "home" | "lightbulb" | "message-circle" | "zap" | "bell";

const iconMap: Record<IconName, LucideIcon> = {
  home: Home,
  lightbulb: Lightbulb,
  zap: Zap,
  bell: Bell,
  "message-circle": MessageCircle,
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
