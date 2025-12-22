import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { theme } from "../design/theme";

const events = [
  { label: "Front Door", detail: "Motion detected · 2m ago" },
  { label: "Backyard Cam", detail: "Person detected · 14m ago" },
];

export function VideoScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Video</Text>
      <Text style={styles.subtitle}>Live view and motion alerts</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Live view</Text>
        <Text style={styles.cardBody}>Wire WebRTC/HLS URLs here; add PIP and talk-back.</Text>
      </View>

      <Text style={styles.sectionLabel}>Recent events</Text>
      {events.map((event) => (
        <View key={event.label} style={styles.card}>
          <Text style={styles.cardTitle}>{event.label}</Text>
          <Text style={styles.cardBody}>{event.detail}</Text>
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
  sectionLabel: {
    color: theme.colors.text,
    fontWeight: "600",
    fontSize: 15,
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
