import React from "react";
import { ScrollView, View, Text, StyleSheet, Pressable } from "react-native";
import { theme } from "../design/theme";
import { Clock, Sparkles, Play, Power, ShieldCheck, Sun, Home } from "lucide-react-native";

type Automation = {
  name: string;
  detail: string;
  actions: number;
  accent: string;
  status?: string;
};

const quickActions: Automation[] = [
  { name: "Movie Night", detail: "Manual", actions: 3, accent: "#F97380", status: "Run Now" },
  { name: "Focus Time", detail: "Manual", actions: 3, accent: "#CBD5E1", status: "Run Now" },
];

const scheduled: Automation[] = [
  { name: "Morning", detail: "Weekdays · 6:30 AM", actions: 4, accent: "#FBBF24" },
  { name: "Arriving Home", detail: "Presence · Anyone arrives", actions: 5, accent: "#34D399" },
  { name: "Secure Night", detail: "11:00 PM · Arm, lock, dim", actions: 6, accent: "#A78BFA" },
];

export function ScenesScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Automations</Text>
      <Text style={styles.subtitle}>Quick actions, schedules, and presence-aware routines</Text>

      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Sparkles color={theme.colors.primary} size={18} />
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        <Text style={styles.sectionMeta}>6 of 7 active</Text>
      </View>
      {quickActions.map((item) => (
        <View key={item.name} style={[styles.actionCard, { backgroundColor: item.accent + "1A" }]}>
          <View style={styles.actionTop}>
            <View>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardBody}>{item.detail}</Text>
            </View>
            <View style={styles.actionsBadge}>
              <Text style={styles.actionsBadgeText}>{item.actions} actions</Text>
            </View>
          </View>
          <View style={styles.actionBottom}>
            <Pressable style={styles.runButton}>
              <Play color={theme.colors.text} size={16} />
              <Text style={styles.runButtonText}>{item.status ?? "Run"}</Text>
            </Pressable>
            <Pressable style={styles.powerButton}>
              <Power color={theme.colors.surface} size={18} />
            </Pressable>
          </View>
        </View>
      ))}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Scheduled</Text>
        <Text style={styles.sectionMeta}>Presence, time, motion</Text>
      </View>
      {scheduled.map((item) => (
        <View key={item.name} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconChip, { backgroundColor: item.accent + "1A" }]}>
              {item.name.includes("Morning") ? (
                <Sun color={theme.colors.primary} size={16} />
              ) : item.name.includes("Home") ? (
                <Home color={theme.colors.primary} size={16} />
              ) : (
                <ShieldCheck color={theme.colors.primary} size={16} />
              )}
            </View>
            <View style={styles.actionsBadge}>
              <Text style={styles.actionsBadgeText}>{item.actions} actions</Text>
            </View>
          </View>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardBody}>{item.detail}</Text>
        </View>
      ))}

      <View style={styles.helperCard}>
        <Clock color={theme.colors.text} size={16} />
        <View style={{ flex: 1 }}>
          <Text style={styles.helperTitle}>Emotional awareness</Text>
          <Text style={styles.helperBody}>
            When the assistant senses stress or calm in a conversation, it can dial scenes up or down
            (lighting, music, temperature) before running the routine.
          </Text>
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.sm,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
  actionCard: {
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 10,
  },
  actionTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionBottom: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 8,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  actionsBadge: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  actionsBadgeText: {
    color: theme.colors.muted,
    fontWeight: "700",
    fontSize: 12,
  },
  runButton: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  runButtonText: {
    color: theme.colors.text,
    fontWeight: "700",
  },
  powerButton: {
    marginLeft: "auto",
    backgroundColor: theme.colors.text,
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  helperCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  helperTitle: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 16,
  },
  helperBody: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  iconChip: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
