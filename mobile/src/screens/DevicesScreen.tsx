import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { theme } from "../design/theme";

const deviceTiles = [
  { name: "Living Room Lamp", status: "On · 72% · Warm" },
  { name: "Kitchen Spots", status: "Off" },
  { name: "Hallway Lock", status: "Locked" },
  { name: "Thermostat", status: "Cooling to 72°" },
];

export function DevicesScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Devices</Text>
      <Text style={styles.subtitle}>Capability-driven controls (power, level, temp, lock)</Text>

      {deviceTiles.map((device) => (
        <View key={device.name} style={styles.card}>
          <Text style={styles.cardTitle}>{device.name}</Text>
          <Text style={styles.cardBody}>{device.status}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 15,
    marginBottom: theme.spacing.sm,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 4,
  },
  cardTitle: {
    color: theme.colors.text,
    fontWeight: "600",
    fontSize: 16,
  },
  cardBody: {
    color: theme.colors.muted,
    fontSize: 14,
  },
});
