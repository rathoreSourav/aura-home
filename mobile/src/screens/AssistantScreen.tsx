import React, { useMemo, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import { Sparkles, Bot, Send, Loader2, ShieldCheck, Video, Lightbulb, Thermometer } from "lucide-react-native";
import { theme } from "../design/theme";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const initialMessages: Message[] = [
  { role: "user", content: "Dim the living lights to 40% warm white." },
  { role: "assistant", content: "On it. Living lights are now at 40% warm white." },
  { role: "user", content: "Show me the front door camera." },
  { role: "assistant", content: "Opening live view and arming motion notifications for the next hour." },
];

export function AssistantScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const apiKey = useMemo(
    () => Constants.expoConfig?.extra?.openaiApiKey || process.env.OPENAI_API_KEY,
    [],
  );

  const systemPrompt =
    "You are Aura, a home automation assistant with emotional awareness. Respond concisely, keep a calm tone, and translate user intents into device actions (lighting, climate, locks, cameras, media, scenes). Offer to show live video when asked to see a camera, and surface motion alerts when relevant.";

  async function handleSend() {
    if (!input.trim() || sending) return;
    const nextMessages: Message[] = [...messages, { role: "user", content: input.trim() }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    try {
      if (!apiKey) {
        throw new Error("Missing OpenAI API key");
      }

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.7,
          messages: [
            { role: "system", content: systemPrompt },
            ...nextMessages.map((msg) => ({ role: msg.role, content: msg.content })),
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to contact OpenAI");
      }

      const data = await response.json();
      const reply =
        data?.choices?.[0]?.message?.content ??
        "Got it—I'll take care of that and keep an eye on motion events.";

      setMessages([...nextMessages, { role: "assistant", content: reply }]);
    } catch (error) {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "I’ll handle it using your preferred providers. (Add your OpenAI key in app config to enable live responses.)",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Assistant</Text>
            <Text style={styles.subtitle}>ChatGPT-powered control with awareness</Text>
          </View>
          <View style={styles.pill}>
            <Sparkles color={theme.colors.primary} size={14} />
            <Text style={styles.pillText}>Emotional tone on</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.titleRow}>
              <Bot color={theme.colors.text} size={18} />
              <Text style={styles.cardTitle}>Conversation</Text>
            </View>
            <Text style={styles.cardBody}>Detects calm / stress and adapts your home.</Text>
          </View>

          <View style={styles.messageStack}>
            {messages.map((msg, idx) => (
              <View
                key={`${msg.role}-${idx}`}
                style={[
                  styles.message,
                  msg.role === "assistant" && { backgroundColor: theme.colors.surface },
                  msg.role === "user" && { backgroundColor: theme.colors.card },
                ]}
              >
                <Text style={styles.messageLabel}>{msg.role === "user" ? "You" : "Aura"}</Text>
                <Text style={styles.messageBody}>{msg.content}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.intentRow}>
          <IntentPill label="See front door video" icon={<Video color={theme.colors.primary} size={14} />} />
          <IntentPill label="Dim living lights to 30%" icon={<Lightbulb color={theme.colors.primary} size={14} />} />
          <IntentPill label="Set temp to 70°F" icon={<Thermometer color={theme.colors.primary} size={14} />} />
          <IntentPill label="Arm security" icon={<ShieldCheck color={theme.colors.primary} size={14} />} />
        </View>
      </ScrollView>

      <View style={styles.composer}>
        <TextInput
          style={styles.input}
          placeholder="Ask Aura to run a scene, show a camera, or adjust comfort..."
          placeholderTextColor={theme.colors.muted}
          value={input}
          onChangeText={setInput}
        />
        <Pressable style={styles.sendButton} onPress={handleSend} disabled={sending}>
          {sending ? <Loader2 color={theme.colors.surface} size={18} /> : <Send color={theme.colors.surface} size={18} />}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

function IntentPill({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <View style={styles.intentPill}>
      {icon}
      <Text style={styles.intentText}>{label}</Text>
    </View>
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
  pill: {
    backgroundColor: theme.colors.surface,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  pillText: {
    color: theme.colors.primary,
    fontWeight: "700",
    fontSize: 12,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  cardHeader: {
    gap: 4,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
  messageStack: {
    gap: theme.spacing.sm,
  },
  message: {
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 6,
  },
  messageLabel: {
    color: theme.colors.muted,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  messageBody: {
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  intentRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  intentPill: {
    backgroundColor: theme.colors.surface,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  intentText: {
    color: theme.colors.text,
    fontWeight: "600",
    fontSize: 13,
  },
  composer: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  sendButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
});
