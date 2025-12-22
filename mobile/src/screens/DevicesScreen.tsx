import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { theme } from "../design/theme";
import { devices } from "../data/mockData";
import { DeviceCard } from "../components/DeviceCard";

export function DevicesScreen() {
  const activeCount = devices.filter((d) => d.active).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>All Devices</Text>
      <Text style={styles.subtitle}>
        {activeCount} of {devices.length} active
      </Text>

      <View style={styles.grid}>
        {devices.map((device) => (
          <DeviceCard key={device.id} {...device} />
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
  grid: {
    gap: theme.spacing.md,
  },
});
