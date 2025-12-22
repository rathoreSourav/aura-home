import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { theme } from "../design/theme";

const mockMessages = [
  { role: "user", content: "Set the living lights to 40% warm white." },
  { role: "assistant", content: "On it. Living lights now at 40% warm white." },
  { role: "user", content: "Show me the front door camera." },
  { role: "assistant", content: "Opening live view. I’ll alert you if I detect motion." },
];

export function AssistantScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Assistant</Text>
      <Text style={styles.subtitle}>ChatGPT-powered control with awareness</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Conversation</Text>
        {mockMessages.map((msg, idx) => (
          <View key={idx} style={styles.message}>
            <Text style={styles.messageLabel}>{msg.role === "user" ? "You" : "Assistant"}</Text>
            <Text style={styles.messageBody}>{msg.content}</Text>
          </View>
        ))}
        <Text style={styles.cardBody}>
          Wire this to OpenAI with function-calling for device control, scenes, automations, and live
          video intents.
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
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 8,
  },
  cardTitle: {
    color: theme.colors.text,
    fontWeight: "600",
    fontSize: 16,
  },
  cardBody: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  message: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 4,
  },
  messageLabel: {
    color: theme.colors.muted,
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  messageBody: {
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
});
