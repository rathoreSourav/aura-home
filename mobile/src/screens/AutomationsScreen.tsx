import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { theme } from "../design/theme";
import { automations } from "../data/mockData";
import { AutomationCard } from "../components/AutomationCard";

export function AutomationsScreen() {
  const active = automations.length - 1;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Automations</Text>
      <Text style={styles.subtitle}>
        {active} of {automations.length} active
      </Text>

      <Text style={styles.sectionLabel}>Quick Actions</Text>
      <View style={styles.list}>
        {automations.map((automation, idx) => (
          <AutomationCard
            key={automation.id}
            emphasis={idx === 0}
            name={automation.name}
            mode={automation.mode}
            actions={automation.actions}
            gradient={automation.gradient}
          />
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
  sectionLabel: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "700",
    marginTop: theme.spacing.sm,
  },
  list: {
    gap: theme.spacing.md,
  },
});
