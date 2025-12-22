import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Lightbulb,
  Thermometer,
  Video,
  Lock,
  Speaker,
  Power,
  LucideIcon,
} from "lucide-react-native";
import { theme } from "../design/theme";

type DeviceType = "light" | "thermostat" | "camera" | "lock" | "speaker";

type Props = {
  name: string;
  room: string;
  status: string;
  type: DeviceType;
  active?: boolean;
  tint: string[];
};

const iconMap: Record<DeviceType, LucideIcon> = {
  light: Lightbulb,
  thermostat: Thermometer,
  camera: Video,
  lock: Lock,
  speaker: Speaker,
};

export function DeviceCard({ name, room, status, type, active, tint }: Props) {
  const Icon = iconMap[type];
  return (
    <LinearGradient
      colors={tint}
      style={[styles.card, !active && styles.inactive]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Icon color={active ? theme.colors.primary : "#C7C7CC"} size={20} strokeWidth={2.2} />
        </View>
        <View style={styles.texts}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{room}</Text>
          <Text style={[styles.status, active ? styles.statusActive : styles.statusInactive]}>
            {status}
          </Text>
        </View>
        <View style={[styles.powerWrap, active ? styles.powerOn : styles.powerOff]}>
          <Power color="#fff" size={16} strokeWidth={2.2} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    minHeight: 120,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  inactive: {
    opacity: 0.8,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  iconWrap: {
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
  },
  texts: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 16,
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 14,
  },
  status: {
    fontSize: 13,
  },
  statusActive: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
  statusInactive: {
    color: theme.colors.muted,
  },
  powerWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  powerOn: {
    backgroundColor: theme.colors.primary,
  },
  powerOff: {
    backgroundColor: "#D1D5DB",
  },
});
