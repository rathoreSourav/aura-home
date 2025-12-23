import React, { useMemo, useState } from "react";
import { ScrollView, View, Text, StyleSheet, Pressable } from "react-native";
import {
  Home as HomeIcon,
  ShieldCheck,
  Sunrise,
  Moon,
  Thermometer,
  Flame,
  Sofa,
  BedDouble,
  Utensils,
  ShowerHead,
  Speaker,
  Camera,
  Lightbulb,
  Play,
} from "lucide-react-native";
import { theme } from "../design/theme";

type QuickScene = {
  label: string;
  icon: React.ComponentType<{ color: string; size: number }>;
};

type Room = {
  name: string;
  devicesOn: number;
  totalDevices: number;
  accent: string;
  icon: React.ComponentType<{ color: string; size: number }>;
};

type Favorite = {
  name: string;
  location: string;
  state: string;
  icon: React.ComponentType<{ color: string; size: number }>;
  accent: string;
};

const quickScenes: QuickScene[] = [
  { label: "Away", icon: ShieldCheck },
  { label: "Home", icon: HomeIcon },
  { label: "Morning", icon: Sunrise },
  { label: "Night", icon: Moon },
];

const rooms: Room[] = [
  { name: "Living Room", devicesOn: 3, totalDevices: 8, accent: "#FF9A5F", icon: Sofa },
  { name: "Bedroom", devicesOn: 1, totalDevices: 5, accent: "#9D7BFF", icon: BedDouble },
  { name: "Kitchen", devicesOn: 2, totalDevices: 6, accent: "#40C7A3", icon: Utensils },
  { name: "Bathroom", devicesOn: 0, totalDevices: 3, accent: "#40B5FF", icon: ShowerHead },
];

const favorites: Favorite[] = [
  { name: "Thermostat", location: "Main Floor", state: "72°F · Cooling", icon: Thermometer, accent: "#0EA5E9" },
  { name: "Living Lights", location: "Living Room", state: "80% · Warm", icon: Lightbulb, accent: "#F59E0B" },
  { name: "Media", location: "HomePod", state: "Playing · Calm Focus", icon: Speaker, accent: "#EC4899" },
  { name: "Front Door", location: "Camera", state: "Recording · Motion ready", icon: Camera, accent: "#8B5CF6" },
];

export function HomeScreen() {
  const [activeScene, setActiveScene] = useState("Home");

  const statusLine = useMemo(() => {
    const comfort = "Comfortable at 72°F";
    const security = "Secure · Doors locked";
    return `${comfort} • ${security}`;
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>Good Afternoon</Text>
          <Text style={styles.title}>My Home</Text>
        </View>
        <View style={styles.badge}>
          <Thermometer color={theme.colors.text} size={16} />
          <Text style={styles.badgeText}>72°F</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Scenes</Text>
          <Play color={theme.colors.muted} size={16} />
        </View>
        <View style={styles.quickScenesRow}>
          {quickScenes.map((scene) => {
            const Icon = scene.icon;
            const active = activeScene === scene.label;
            return (
              <Pressable
                key={scene.label}
                onPress={() => setActiveScene(scene.label)}
                style={[
                  styles.quickScene,
                  active && { backgroundColor: theme.colors.surface, borderColor: scene.label === "Home" ? "#FCE7D8" : theme.colors.border },
                ]}
              >
                <Icon color={active ? theme.colors.primary : theme.colors.muted} size={20} />
                <Text style={[styles.quickSceneLabel, active && { color: theme.colors.primary }]}>{scene.label}</Text>
              </Pressable>
            );
          })}
        </View>
        <Text style={styles.statusLine}>{statusLine}</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Rooms</Text>
        <Text style={styles.link}>See All</Text>
      </View>
      <View style={styles.roomGrid}>
        {rooms.map((room) => {
          const Icon = room.icon;
          return (
            <View key={room.name} style={[styles.roomCard, { backgroundColor: room.accent + "1A" }]}>
              <View style={[styles.roomIcon, { backgroundColor: room.accent + "33" }]}>
                <Icon color={theme.colors.surface} size={18} />
              </View>
              <Text style={styles.roomName}>{room.name}</Text>
              <Text style={styles.roomMeta}>
                {room.devicesOn} of {room.totalDevices} on
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Favorites</Text>
        <Text style={styles.link}>Edit</Text>
      </View>
      <View style={styles.favorites}>
        {favorites.map((fav) => {
          const Icon = fav.icon;
          return (
            <View key={fav.name} style={styles.favoriteCard}>
              <View style={[styles.favoriteIcon, { backgroundColor: fav.accent + "1A" }]}>
                <Icon color={fav.accent} size={18} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.favoriteName}>{fav.name}</Text>
                <Text style={styles.favoriteMeta}>{fav.location}</Text>
              </View>
              <Text style={styles.favoriteState}>{fav.state}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.promo}>
        <View style={styles.pill}>
          <Flame color={theme.colors.primary} size={16} />
          <Text style={styles.pillText}>Adaptive Comfort</Text>
        </View>
        <Text style={styles.promoTitle}>Intelligent automation</Text>
        <Text style={styles.promoBody}>
          Aura tunes scenes, HVAC, and lighting based on presence, schedules, and emotional tone from
          conversations with the assistant.
        </Text>
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    color: theme.colors.muted,
    fontSize: 14,
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: "700",
  },
  badge: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.sm,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  badgeText: {
    color: theme.colors.text,
    fontWeight: "600",
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 18,
  },
  link: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
  quickScenesRow: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    flexWrap: "wrap",
  },
  quickScene: {
    flex: 1,
    minWidth: 140,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  quickSceneLabel: {
    color: theme.colors.text,
    fontWeight: "600",
  },
  statusLine: {
    color: theme.colors.muted,
    fontSize: 14,
  },
  roomGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.md,
  },
  roomCard: {
    width: "47%",
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    gap: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  roomIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  roomName: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 16,
  },
  roomMeta: {
    color: theme.colors.muted,
    fontSize: 14,
  },
  favorites: {
    gap: theme.spacing.sm,
  },
  favoriteCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  favoriteIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteName: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 16,
  },
  favoriteMeta: {
    color: theme.colors.muted,
    fontSize: 13,
  },
  favoriteState: {
    color: theme.colors.primary,
    fontWeight: "600",
    textAlign: "right",
  },
  promo: {
    backgroundColor: "#0EA5E91A",
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    gap: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  pill: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: theme.colors.surface,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  pillText: {
    color: theme.colors.primary,
    fontWeight: "700",
    fontSize: 12,
  },
  promoTitle: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 18,
  },
  promoBody: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
});
