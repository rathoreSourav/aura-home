import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Play, Power } from "lucide-react-native";
import { theme } from "../design/theme";

type Props = {
  name: string;
  mode: string;
  actions: number;
  gradient: string[];
  emphasis?: boolean;
};

export function AutomationCard({ name, mode, actions, gradient, emphasis }: Props) {
  return (
    <LinearGradient
      colors={gradient}
      style={[styles.card, emphasis && styles.emphasis]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <Text style={styles.mode}>{mode}</Text>
        <Text style={styles.actions}>{actions} actions</Text>
      </View>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.footer}>
        <Pressable style={styles.runButton}>
          <Play color="#fff" size={16} strokeWidth={2.4} />
          <Text style={styles.runLabel}>Run Now</Text>
        </Pressable>
        <View style={styles.power}>
          <Power color="#fff" size={16} strokeWidth={2.3} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  emphasis: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mode: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
  },
  actions: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
    fontWeight: "600",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: theme.spacing.sm,
  },
  runButton: {
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: theme.radius.md,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  runLabel: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  power: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
});
