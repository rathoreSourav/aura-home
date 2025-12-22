import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { theme } from "../design/theme";

const scenes = [
  { name: "Evening Warm", desc: "Dim living lights, set 72°, play ambient." },
  { name: "Away Arm", desc: "Lock doors, arm security, turn off lights." },
  { name: "Good Morning", desc: "Open shades, raise to 74°, turn on kitchen." },
];

export function ScenesScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Scenes</Text>
      <Text style={styles.subtitle}>Capture multi-device states with smooth transitions</Text>

      {scenes.map((scene) => (
        <View key={scene.name} style={styles.card}>
          <Text style={styles.cardTitle}>{scene.name}</Text>
          <Text style={styles.cardBody}>{scene.desc}</Text>
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
