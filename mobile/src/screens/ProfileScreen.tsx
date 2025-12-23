import React from "react";
import { ScrollView, View, Text, StyleSheet, Switch, Pressable } from "react-native";
import { Bell, ShieldCheck, User, CreditCard, ChevronRight, LogOut } from "lucide-react-native";
import { theme } from "../design/theme";

const preferences = [
  { label: "Push notifications", description: "Motion alerts and camera snapshots", icon: Bell, enabled: true },
  { label: "Security mode", description: "Arm when away and after bedtime", icon: ShieldCheck, enabled: false },
];

const menuItems = [
  { label: "Account & Subscription", description: "Plan, payment, and usage", icon: CreditCard },
  { label: "Home members", description: "Invite family or guests", icon: User },
];

export function ProfileScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <User color={theme.colors.primary} size={22} />
        </View>
        <View>
          <Text style={styles.title}>Samantha Lee</Text>
          <Text style={styles.subtitle}>Owner · Living Room Hub</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        {preferences.map((item) => {
          const Icon = item.icon;
          return (
            <View key={item.label} style={styles.preferenceRow}>
              <View style={styles.preferenceInfo}>
                <View style={styles.preferenceIcon}>
                  <Icon color={theme.colors.primary} size={18} />
                </View>
                <View>
                  <Text style={styles.preferenceLabel}>{item.label}</Text>
                  <Text style={styles.preferenceDescription}>{item.description}</Text>
                </View>
              </View>
              <Switch value={item.enabled} trackColor={{ true: theme.colors.primary, false: theme.colors.border }} />
            </View>
          );
        })}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Account</Text>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Pressable key={item.label} style={styles.menuRow}>
              <View style={styles.menuInfo}>
                <View style={styles.preferenceIcon}>
                  <Icon color={theme.colors.text} size={18} />
                </View>
                <View>
                  <Text style={styles.preferenceLabel}>{item.label}</Text>
                  <Text style={styles.preferenceDescription}>{item.description}</Text>
                </View>
              </View>
              <ChevronRight color={theme.colors.muted} size={18} />
            </Pressable>
          );
        })}
      </View>

      <Pressable style={styles.logoutRow}>
        <LogOut color={theme.colors.muted} size={18} />
        <Text style={styles.logoutText}>Sign out</Text>
      </Pressable>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.text,
  },
  subtitle: {
    color: theme.colors.muted,
    marginTop: 4,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
  },
  preferenceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.xs,
  },
  preferenceInfo: {
    flexDirection: "row",
    gap: theme.spacing.md,
    alignItems: "center",
    flex: 1,
  },
  preferenceIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  preferenceLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.text,
  },
  preferenceDescription: {
    color: theme.colors.muted,
    marginTop: 2,
  },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.xs,
  },
  menuInfo: {
    flexDirection: "row",
    gap: theme.spacing.md,
    alignItems: "center",
    flex: 1,
  },
  logoutRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    justifyContent: "center",
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
  },
  logoutText: {
    color: theme.colors.muted,
    fontWeight: "600",
  },
});
