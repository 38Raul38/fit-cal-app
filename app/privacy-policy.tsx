import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface Section {
  title: string;
  body: string;
}

const LAST_UPDATED = "February 1, 2026";

const SECTIONS: Section[] = [
  {
    title: "1. Information We Collect",
    body: `We collect information you provide directly when you create an account and use FitCal:

• Personal details — name, email address, gender, age, height, and weight.
• Nutrition data — meals you log, calorie and macro totals.
• Usage data — app interactions, feature usage, and crash reports.

We do NOT collect payment information, precise GPS location, or contacts.`,
  },
  {
    title: "2. How We Use Your Information",
    body: `Your data is used to:

• Calculate personalized calorie and macro targets.
• Display your nutrition history and analytics.
• Improve app performance and fix bugs.
• Send optional meal reminders and notifications (you can opt out anytime in Settings).

We never sell your personal data to third parties.`,
  },
  {
    title: "3. Data Storage & Security",
    body: `Your nutrition logs and profile data are stored locally on your device by default. If you enable cloud sync, data is encrypted in transit (TLS 1.3) and at rest (AES-256) on our servers.

We follow industry-standard security practices including regular audits, access controls, and automatic vulnerability scanning.`,
  },
  {
    title: "4. Third-Party Services",
    body: `FitCal may use the following third-party services:

• Food database API — to provide nutritional information for food search. Only the search query is shared; no personal data is sent.
• Analytics (anonymized) — to understand feature usage and improve the app. All data is aggregated and cannot identify individual users.`,
  },
  {
    title: "5. Your Rights",
    body: `You have the right to:

• Access — view all personal data we store about you.
• Correct — update inaccurate information from your profile.
• Delete — permanently erase your account and all associated data.
• Export — download a copy of your data in a portable format.

To exercise any of these rights, contact us at privacy@fitcal.app.`,
  },
  {
    title: "6. Data Retention",
    body: `We retain your data for as long as your account is active. If you delete your account, all personal data is permanently removed within 30 days. Anonymized, aggregated analytics data may be retained indefinitely.`,
  },
  {
    title: "7. Children's Privacy",
    body: `FitCal is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with data, please contact us immediately and we will delete it.`,
  },
  {
    title: "8. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top and notify you via in-app notification if the changes are material.`,
  },
  {
    title: "9. Contact Us",
    body: `If you have questions or concerns about this Privacy Policy, please reach out:

Email: privacy@fitcal.app
Website: fitcal.app/privacy`,
  },
];

export default function PrivacyPolicy() {
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

      <Text style={[styles.title, { color: colors.text }]}>Privacy Policy</Text>
      <Text style={[styles.updated, { color: colors.textMuted }]}>
        Last updated: {LAST_UPDATED}
      </Text>

      <Text style={[styles.intro, { color: colors.textSecondary }]}>
        Your privacy matters to us. This policy explains what data FitCal
        collects, how we use it, and what choices you have.
      </Text>

      {/* Sections */}
      {SECTIONS.map((s, i) => (
        <View key={i} style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{s.title}</Text>
          <Text style={[styles.sectionBody, { color: colors.textSecondary }]}>{s.body}</Text>
        </View>
      ))}

      <Text style={[styles.footer, { color: colors.textMuted }]}>
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
  },

  backBtn: { alignSelf: "flex-start", marginBottom: 20, padding: 4 },
  backText: { fontSize: 16, fontWeight: "600" },

  title: { fontSize: 30, fontWeight: "800", marginBottom: 4 },
  updated: { fontSize: 13, marginBottom: 16 },
  intro: { fontSize: 15, lineHeight: 22, marginBottom: 24 },

  section: { borderRadius: 18, padding: 18, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 10 },
  sectionBody: { fontSize: 14, lineHeight: 22 },

  footer: { textAlign: "center", fontSize: 13, marginTop: 16 },
});
