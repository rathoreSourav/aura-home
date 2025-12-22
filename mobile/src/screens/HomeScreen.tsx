import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { theme } from "../design/theme";
import { QuickSceneButton } from "../components/QuickSceneButton";
import { RoomCard } from "../components/RoomCard";
import { DeviceCard } from "../components/DeviceCard";
import { quickScenes, rooms, devices } from "../data/mockData";

export function HomeScreen() {
  const favorites = devices.slice(0, 3);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.greeting}>Good Afternoon</Text>
          <Text style={styles.title}>My Home</Text>
        </View>
        <View style={styles.weatherBadge}>
          <Text style={styles.weatherIcon}>☀️</Text>
          <Text style={styles.weatherText}>72°F</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Scenes</Text>
        <View style={styles.quickGrid}>
          {quickScenes.map((scene) => (
            <QuickSceneButton key={scene.id} label={scene.label} active={scene.active} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Rooms</Text>
          <Text style={styles.link}>See All</Text>
        </View>
        <View style={styles.roomGrid}>
          {rooms.map((room) => (
            <RoomCard key={room.id} {...room} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Favorites</Text>
          <Text style={styles.link}>Edit</Text>
        </View>
        <View style={styles.deviceGrid}>
          {favorites.map((device) => (
            <DeviceCard key={device.id} {...device} />
          ))}
        </View>
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
    gap: theme.spacing.lg,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    color: theme.colors.muted,
    fontSize: 15,
  },
  title: {
    color: theme.colors.text,
    fontSize: 30,
    fontWeight: "800",
  },
  weatherBadge: {
    backgroundColor: "#FFF3E9",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  weatherIcon: {
    fontSize: 15,
  },
  weatherText: {
    fontWeight: "700",
    color: theme.colors.text,
  },
  section: {
    gap: theme.spacing.sm,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: "700",
  },
  link: {
    color: theme.colors.primary,
    fontWeight: "700",
    fontSize: 14,
  },
  quickGrid: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  roomGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.md,
  },
  deviceGrid: {
    gap: theme.spacing.md,
  },
});
