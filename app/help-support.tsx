import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface FaqItem {
  q: string;
  a: string;
}

const FAQ: FaqItem[] = [
  {
    q: "How do I log a meal?",
    a: 'Go to the Meals tab, tap "+ Add Food", search for a food item, and select it. You can adjust the serving size before adding.',
  },
  {
    q: "How are my daily calorie goals calculated?",
    a: "We use the Mifflin-St Jeor equation based on your gender, age, height, weight, and activity level to estimate your Total Daily Energy Expenditure (TDEE).",
  },
  {
    q: "Can I edit or delete a logged meal?",
    a: "Yes! On the Meals tab, swipe left on any entry to reveal the delete option, or tap the entry to edit the serving size.",
  },
  {
    q: "How do I change my goals?",
    a: 'Head to Settings → Update Goals. You can adjust your calorie target and macro split at any time.',
  },
  {
    q: "Why is my weight not updating on the chart?",
    a: "Make sure you log your weight regularly. The Analytics chart only displays data points you've entered. Try adding a new entry from the Home screen.",
  },
  {
    q: "Does FitCal work offline?",
    a: "Most features work offline. Your meals and data are stored locally on your device. An internet connection is only needed for food search and syncing across devices.",
  },
];

const CONTACT_EMAIL = "support@fitcal.app";

export default function HelpSupport() {
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

      <Text style={[styles.title, { color: colors.text }]}>Help & Support</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Find answers to common questions or reach out to us directly.
      </Text>

      {/* FAQ */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Frequently Asked Questions
      </Text>

      {FAQ.map((item, i) => (
        <View
          key={i}
          style={[
            styles.faqCard,
            { backgroundColor: colors.card },
            i < FAQ.length - 1 && { marginBottom: 10 },
          ]}
        >
          <View style={styles.faqRow}>
            <Ionicons name="help-circle" size={20} color={colors.accent} />
            <Text style={[styles.faqQ, { color: colors.text }]}>{item.q}</Text>
          </View>
          <Text style={[styles.faqA, { color: colors.textSecondary }]}>{item.a}</Text>
        </View>
      ))}

      {/* Contact */}
      <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 28 }]}>
        Still need help?
      </Text>

      <View style={[styles.contactCard, { backgroundColor: colors.card }]}>
        <Pressable
          style={styles.contactRow}
          onPress={() => Linking.openURL(`mailto:${CONTACT_EMAIL}`)}
        >
          <Ionicons name="mail-outline" size={22} color={colors.text} />
          <View style={styles.contactInfo}>
            <Text style={[styles.contactLabel, { color: colors.text }]}>Email us</Text>
            <Text style={[styles.contactValue, { color: colors.textSecondary }]}>
              {CONTACT_EMAIL}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </Pressable>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <Pressable
          style={styles.contactRow}
          onPress={() => Linking.openURL("https://fitcal.app/help")}
        >
          <Ionicons name="globe-outline" size={22} color={colors.text} />
          <View style={styles.contactInfo}>
            <Text style={[styles.contactLabel, { color: colors.text }]}>Help Center</Text>
            <Text style={[styles.contactValue, { color: colors.textSecondary }]}>
              fitcal.app/help
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </Pressable>
      </View>

      <Text style={[styles.footer, { color: colors.textMuted }]}>
        We usually reply within 24 hours.
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

  title: { fontSize: 30, fontWeight: "800", marginBottom: 6 },
  subtitle: { fontSize: 15, marginBottom: 28, lineHeight: 22 },

  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 14 },

  /* FAQ */
  faqCard: { borderRadius: 18, padding: 16 },
  faqRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  faqQ: { fontSize: 15, fontWeight: "700", flex: 1 },
  faqA: { fontSize: 14, lineHeight: 21, marginLeft: 30 },

  /* Contact */
  contactCard: { borderRadius: 18, padding: 6 },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 14,
  },
  contactInfo: { flex: 1 },
  contactLabel: { fontSize: 15, fontWeight: "600" },
  contactValue: { fontSize: 13, marginTop: 2 },
  divider: { height: 1, marginHorizontal: 14 },

  footer: { textAlign: "center", fontSize: 13, marginTop: 20 },
});
