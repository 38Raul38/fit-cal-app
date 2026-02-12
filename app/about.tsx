import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

const APP_VERSION = "1.0.0";

interface TeamMember {
  name: string;
  role: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const TEAM: TeamMember[] = [
  { name: "FitCal Team", role: "Design & Development", icon: "code-slash-outline" },
];

const LINKS: { label: string; url: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { label: "Website", url: "https://fitcal.app", icon: "globe-outline" },
  { label: "Instagram", url: "https://instagram.com/fitcal.app", icon: "logo-instagram" },
  { label: "Twitter / X", url: "https://x.com/fitcalapp", icon: "logo-twitter" },
  { label: "Rate on App Store", url: "https://apps.apple.com/app/fitcal", icon: "star-outline" },
];

export default function About() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Text style={[styles.backText, { color: colors.text }]}>← Back</Text>
      </Pressable>

      {/* Logo / App Icon placeholder */}
      <View style={[styles.logoWrap, { backgroundColor: colors.card }]}>
        <Ionicons name="flame" size={48} color={colors.accent} />
      </View>

      <Text style={[styles.appName, { color: colors.text }]}>FitCal</Text>
      <Text style={[styles.version, { color: colors.textMuted }]}>
        Version {APP_VERSION}
      </Text>

      {/* Description */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.desc, { color: colors.textSecondary }]}>
          FitCal is a simple, beautiful calorie and macro tracker designed to help
          you build healthier eating habits — without the complexity.{"\n\n"}
          We believe nutrition tracking should be quick, intuitive, and
          motivating. Whether you're cutting, bulking, or just trying to eat
          better, FitCal gives you the insights you need in seconds.
        </Text>
      </View>

      {/* Features highlights */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Key Features</Text>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        {[
          { icon: "search-outline" as const, text: "Instant food search with detailed nutrition data" },
          { icon: "bar-chart-outline" as const, text: "Weekly & monthly analytics with visual charts" },
          { icon: "moon-outline" as const, text: "Beautiful dark mode for comfortable evening use" },
          { icon: "notifications-outline" as const, text: "Smart meal reminders so you never miss a log" },
          { icon: "shield-checkmark-outline" as const, text: "Privacy-first — your data stays on your device" },
        ].map((f, i) => (
          <View
            key={i}
            style={[
              styles.featureRow,
              i < 4 && { borderBottomWidth: 1, borderBottomColor: colors.border },
            ]}
          >
            <Ionicons name={f.icon} size={20} color={colors.accent} />
            <Text style={[styles.featureText, { color: colors.text }]}>{f.text}</Text>
          </View>
        ))}
      </View>

      {/* Team */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Made with ❤️ by</Text>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        {TEAM.map((m, i) => (
          <View key={i} style={styles.teamRow}>
            <View style={[styles.teamIcon, { backgroundColor: colors.cardAlt }]}>
              <Ionicons name={m.icon} size={20} color={colors.text} />
            </View>
            <View>
              <Text style={[styles.teamName, { color: colors.text }]}>{m.name}</Text>
              <Text style={[styles.teamRole, { color: colors.textSecondary }]}>{m.role}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Links */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Links</Text>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        {LINKS.map((l, i) => (
          <Pressable
            key={i}
            style={[
              styles.linkRow,
              i < LINKS.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
            ]}
            onPress={() => Linking.openURL(l.url)}
          >
            <Ionicons name={l.icon} size={20} color={colors.text} />
            <Text style={[styles.linkLabel, { color: colors.text }]}>{l.label}</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
          </Pressable>
        ))}
      </View>

      {/* Legal */}
      <View style={[styles.card, { backgroundColor: colors.card, marginTop: 6 }]}>
        <Pressable style={styles.legalRow} onPress={() => router.push("/privacy-policy")}>
          <Ionicons name="document-text-outline" size={20} color={colors.text} />
          <Text style={[styles.linkLabel, { color: colors.text }]}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
        </Pressable>
      </View>

      <Text style={[styles.copyright, { color: colors.textMuted }]}>
        © 2026 FitCal. All rights reserved.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
  },

  backBtn: { alignSelf: "flex-start", marginBottom: 20, padding: 4 },
  backText: { fontSize: 16, fontWeight: "600" },

  logoWrap: {
    width: 88,
    height: 88,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  appName: { fontSize: 28, fontWeight: "800", marginBottom: 2 },
  version: { fontSize: 14, marginBottom: 24 },

  card: {
    width: "100%",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },
  desc: { fontSize: 15, lineHeight: 23 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    alignSelf: "flex-start",
    marginBottom: 10,
    marginTop: 8,
  },

  /* Features */
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 13,
  },
  featureText: { fontSize: 14, fontWeight: "500", flex: 1 },

  /* Team */
  teamRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  teamIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  teamName: { fontSize: 15, fontWeight: "700" },
  teamRole: { fontSize: 13, marginTop: 1 },

  /* Links */
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
  },
  linkLabel: { flex: 1, fontSize: 15, fontWeight: "600" },

  legalRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 8,
  },

  copyright: { textAlign: "center", fontSize: 13, marginTop: 20 },
});
