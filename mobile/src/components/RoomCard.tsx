import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Sofa, Bed, Utensils, Bath, LucideIcon } from "lucide-react-native";
import { theme } from "../design/theme";

type RoomIcon = "sofa" | "bed" | "utensils" | "bathtub";

type Props = {
  name: string;
  active: number;
  total: number;
  icon: RoomIcon;
  gradient: string[];
};

const iconMap: Record<RoomIcon, LucideIcon> = {
  sofa: Sofa,
  bed: Bed,
  utensils: Utensils,
  bathtub: Bath,
};

export function RoomCard({ name, active, total, icon, gradient }: Props) {
  const Icon = iconMap[icon];
  return (
    <LinearGradient colors={gradient} style={styles.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <View style={styles.card}>
        <Icon color="#fff" size={22} strokeWidth={2.2} />
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>
          {active} of {total} on
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: theme.radius.lg,
    overflow: "hidden",
    minHeight: 120,
  },
  card: {
    padding: theme.spacing.lg,
    gap: 8,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
  },
});
