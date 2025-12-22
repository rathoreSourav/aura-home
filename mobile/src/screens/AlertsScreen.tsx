import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { theme } from "../design/theme";

const alerts = [
  { id: "motion-1", title: "Front Door Motion", detail: "Person detected 2m ago" },
  { id: "door-1", title: "Side Door", detail: "Left unlocked for 15m" },
];

export function AlertsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Alerts</Text>
      <Text style={styles.subtitle}>Recent events and notifications</Text>

      <View style={styles.list}>
        {alerts.map((alert) => (
          <View key={alert.id} style={styles.card}>
            <View style={styles.dot} />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{alert.title}</Text>
              <Text style={styles.cardBody}>{alert.detail}</Text>
            </View>
            <Text style={styles.link}>View</Text>
          </View>
        ))}
      </View>
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
  list: {
    gap: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  cardTitle: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 15,
  },
  cardBody: {
    color: theme.colors.muted,
    fontSize: 13,
  },
  link: {
    color: theme.colors.primary,
    fontWeight: "700",
    fontSize: 14,
  },
});
