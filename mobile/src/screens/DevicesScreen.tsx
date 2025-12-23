import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import {
  Lightbulb,
  Thermometer,
  Camera,
  Lock,
  Speaker,
  Smartphone,
  Fan,
  Droplets,
} from "lucide-react-native";
import { theme } from "../design/theme";

type DeviceTile = {
  name: string;
  location: string;
  state: string;
  accent: string;
  icon: React.ComponentType<{ color: string; size: number }>;
  status: "active" | "idle" | "alert";
};

const deviceTiles: DeviceTile[] = [
  { name: "Living Room Light", location: "Living Room", state: "80% · Warm", accent: "#FF8A3D", icon: Lightbulb, status: "active" },
  { name: "Thermostat", location: "Living Room", state: "72°F · Cooling", accent: "#36C3FF", icon: Thermometer, status: "active" },
  { name: "Front Door Camera", location: "Entrance", state: "Recording · Motion Ready", accent: "#8B5CF6", icon: Camera, status: "active" },
  { name: "Smart Lock", location: "Entrance", state: "Locked", accent: "#FCD34D", icon: Lock, status: "idle" },
  { name: "Bedroom Light", location: "Bedroom", state: "Off", accent: "#D1D5DB", icon: Lightbulb, status: "idle" },
  { name: "HomePod", location: "Living Room", state: "Playing · Focus", accent: "#EC4899", icon: Speaker, status: "active" },
  { name: "Air Purifier", location: "Office", state: "On · Auto", accent: "#34D399", icon: Fan, status: "active" },
  { name: "Sprinklers", location: "Yard", state: "Scheduled · 5:30am", accent: "#38BDF8", icon: Droplets, status: "idle" },
  { name: "Control Panel", location: "Anywhere", state: "Ready for commands", accent: "#9CA3AF", icon: Smartphone, status: "active" },
];

export function DevicesScreen() {
  const activeCount = deviceTiles.filter((device) => device.status === "active").length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>All Devices</Text>
          <Text style={styles.subtitle}>
            {activeCount} of {deviceTiles.length} active
          </Text>
        </View>
        <View style={styles.filterBadge}>
          <Text style={styles.filterText}>Sorted by room</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {deviceTiles.map((device) => {
          const Icon = device.icon;
          return (
            <View key={device.name} style={[styles.card, { backgroundColor: device.accent + "14" }]}>
              <View style={styles.cardHeader}>
                <View style={[styles.deviceIcon, { backgroundColor: device.accent + "26" }]}>
                  <Icon color={device.status === "idle" ? theme.colors.muted : device.accent} size={20} />
                </View>
                <View style={[styles.statusPill, device.status === "alert" && styles.alertPill]}>
                  <Text style={styles.statusPillText}>
                    {device.status === "active" ? "On" : device.status === "alert" ? "Alert" : "Off"}
                  </Text>
                </View>
              </View>
              <Text style={styles.deviceName}>{device.name}</Text>
              <Text style={styles.deviceMeta}>{device.location}</Text>
              <Text style={[styles.deviceState, device.status !== "idle" && { color: device.accent }]}>
                {device.state}
              </Text>
            </View>
          );
        })}
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 15,
    marginTop: 4,
  },
  filterBadge: {
    backgroundColor: theme.colors.surface,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filterText: {
    color: theme.colors.muted,
    fontWeight: "600",
    fontSize: 13,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.md,
  },
  card: {
    width: "47%",
    padding: theme.spacing.md,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 6,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deviceIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  alertPill: {
    backgroundColor: "#FDE68A",
    borderColor: "#FBBF24",
  },
  statusPillText: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 12,
  },
  deviceName: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 16,
  },
  deviceMeta: {
    color: theme.colors.muted,
    fontSize: 13,
  },
  deviceState: {
    color: theme.colors.muted,
    fontWeight: "600",
  },
});
