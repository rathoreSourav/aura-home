import React, { useMemo, useState } from "react";
import { ScrollView, View, Text, StyleSheet, Pressable, Switch } from "react-native";
import { theme } from "../design/theme";
import { Camera, Bell, Play, Video, Wifi } from "lucide-react-native";

type Event = {
  label: string;
  detail: string;
};

const events: Event[] = [
  { label: "Front Door", detail: "Person detected · 2m ago · Push sent" },
  { label: "Backyard Cam", detail: "Motion detected · 14m ago · Recording" },
  { label: "Garage", detail: "Package spotted · 1h ago · Snapshot saved" },
];

export function VideoScreen() {
  const [liveCamera, setLiveCamera] = useState("Front Door");
  const [pushEnabled, setPushEnabled] = useState(true);
  const [snapshotEnabled, setSnapshotEnabled] = useState(true);
  const liveHeadline = useMemo(() => `Live view · ${liveCamera}`, [liveCamera]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Video</Text>
          <Text style={styles.subtitle}>Live view, motion detection, push notifications</Text>
        </View>
        <View style={styles.badge}>
          <Wifi color={theme.colors.text} size={14} />
          <Text style={styles.badgeText}>Home LAN</Text>
        </View>
      </View>

      <View style={styles.liveCard}>
        <View style={styles.liveHeader}>
          <View style={styles.liveTitleRow}>
            <Camera color={theme.colors.text} size={16} />
            <Text style={styles.liveTitle}>{liveHeadline}</Text>
          </View>
          <Pressable style={styles.liveAction}>
            <Play color={theme.colors.text} size={16} />
            <Text style={styles.liveActionText}>Go live</Text>
          </Pressable>
        </View>
        <View style={styles.liveViewport}>
          <Video color={theme.colors.muted} size={38} />
          <Text style={styles.liveHint}>Stream HLS/WebRTC feed here</Text>
          <Text style={styles.liveSubHint}>Supports talk-back and PIP</Text>
        </View>
        <View style={styles.cameraRow}>
          {["Front Door", "Backyard", "Nursery"].map((label) => (
            <Pressable
              key={label}
              onPress={() => setLiveCamera(label)}
              style={[
                styles.cameraChip,
                liveCamera === label && { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary },
              ]}
            >
              <Text
                style={[styles.cameraChipText, liveCamera === label && { color: theme.colors.primary, fontWeight: "700" }]}
              >
                {label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Detection & push</Text>
        <Text style={styles.sectionMeta}>Turn on alerts when motion or people are detected</Text>
      </View>
      <View style={styles.toggleCard}>
        <View style={styles.toggleRow}>
          <View>
            <Text style={styles.cardTitle}>Push notifications</Text>
            <Text style={styles.cardBody}>Send a push when motion or a person is detected.</Text>
          </View>
          <Switch value={pushEnabled} onValueChange={setPushEnabled} />
        </View>
        <View style={styles.toggleRow}>
          <View>
            <Text style={styles.cardTitle}>Snapshot in alert</Text>
            <Text style={styles.cardBody}>Attach the latest frame to the notification.</Text>
          </View>
          <Switch value={snapshotEnabled} onValueChange={setSnapshotEnabled} />
        </View>
      </View>

      <Text style={styles.sectionLabel}>Recent events</Text>
      {events.map((event) => (
        <View key={event.label} style={styles.card}>
          <View style={styles.eventRow}>
            <Bell color={theme.colors.primary} size={16} />
            <Text style={styles.cardTitle}>{event.label}</Text>
          </View>
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
  badge: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  badgeText: {
    color: theme.colors.text,
    fontWeight: "600",
  },
  liveCard: {
    backgroundColor: "#0EA5E91A",
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  liveHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  liveTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  liveTitle: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 16,
  },
  liveAction: {
    backgroundColor: theme.colors.surface,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  liveActionText: {
    color: theme.colors.text,
    fontWeight: "700",
  },
  liveViewport: {
    height: 180,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  liveHint: {
    color: theme.colors.text,
    fontWeight: "700",
  },
  liveSubHint: {
    color: theme.colors.muted,
    fontSize: 13,
  },
  cameraRow: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    flexWrap: "wrap",
  },
  cameraChip: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cameraChipText: {
    color: theme.colors.text,
    fontWeight: "600",
  },
  sectionHeader: {
    gap: 4,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 18,
  },
  sectionMeta: {
    color: theme.colors.muted,
    fontSize: 13,
  },
  toggleCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  sectionLabel: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 16,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 6,
  },
  cardTitle: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 16,
  },
  cardBody: {
    color: theme.colors.muted,
    fontSize: 14,
  },
  eventRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
