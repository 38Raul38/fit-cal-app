import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useProfile, type Goal } from "../context/ProfileContext";
import { useTheme } from "../context/ThemeContext";

const GOALS: { key: Goal; label: string; desc: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: "lose", label: "Lose weight", desc: "Cut fat and get leaner", icon: "trending-down-outline" },
  { key: "maintain", label: "Maintain weight", desc: "Stay at your current weight", icon: "reorder-two-outline" },
  { key: "gain", label: "Gain weight", desc: "Build muscle and size", icon: "trending-up-outline" },
];

export default function UpdateGoals() {
  const router = useRouter();
  const { colors } = useTheme();
  const { profile, updateProfile } = useProfile();

  const [goal, setGoal] = useState<Goal>(profile.goal);
  const [calories, setCalories] = useState("2220");
  const [protein, setProtein] = useState("150");
  const [carbs, setCarbs] = useState("240");
  const [fat, setFat] = useState("80");

  const handleSave = () => {
    updateProfile({ goal });
    Alert.alert("Goals Updated", "Your nutrition goals have been saved.", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.bg }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Update Goals</Text>
          <View style={{ width: 40 }} />
        </View>

        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
          Fitness Goal
        </Text>

        {GOALS.map((g) => {
          const selected = goal === g.key;
          return (
            <Pressable
              key={g.key}
              style={[
                styles.goalCard,
                { backgroundColor: colors.card, borderColor: colors.border },
                selected && { backgroundColor: colors.text, borderColor: colors.text },
              ]}
              onPress={() => setGoal(g.key)}
            >
              <View style={[styles.goalIcon, { backgroundColor: selected ? colors.bg + "22" : colors.cardAlt }]}>
                <Ionicons name={g.icon} size={22} color={selected ? colors.bg : colors.text} />
              </View>
              <View style={styles.goalInfo}>
                <Text style={[styles.goalLabel, { color: selected ? colors.bg : colors.text }]}>
                  {g.label}
                </Text>
                <Text style={[styles.goalDesc, { color: selected ? colors.bg + "AA" : colors.textSecondary }]}>
                  {g.desc}
                </Text>
              </View>
              <View
                style={[
                  styles.radio,
                  { borderColor: selected ? colors.bg : colors.border },
                  selected && { backgroundColor: colors.bg, borderColor: colors.bg },
                ]}
              >
                {selected && <View style={[styles.radioDot, { backgroundColor: colors.text }]} />}
              </View>
            </Pressable>
          );
        })}

        <Text style={[styles.sectionLabel, { color: colors.textSecondary, marginTop: 28 }]}>
          Daily Targets
        </Text>

        <View style={[styles.macroCard, { backgroundColor: colors.card }]}>
          <View style={styles.macroRow}>
            <View style={styles.macroLeft}>
              <Text style={styles.macroEmoji}>🔥</Text>
              <Text style={[styles.macroName, { color: colors.text }]}>Calories</Text>
            </View>
            <View style={[styles.macroInputWrap, { backgroundColor: colors.cardAlt }]}>
              <TextInput
                style={[styles.macroInput, { color: colors.text }]}
                value={calories}
                onChangeText={setCalories}
                keyboardType="numeric"
                maxLength={5}
              />
              <Text style={[styles.macroUnit, { color: colors.textMuted }]}>kcal</Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.macroRow}>
            <View style={styles.macroLeft}>
              <Text style={styles.macroEmoji}>🍎</Text>
              <Text style={[styles.macroName, { color: colors.text }]}>Protein</Text>
            </View>
            <View style={[styles.macroInputWrap, { backgroundColor: colors.cardAlt }]}>
              <TextInput
                style={[styles.macroInput, { color: colors.text }]}
                value={protein}
                onChangeText={setProtein}
                keyboardType="numeric"
                maxLength={4}
              />
              <Text style={[styles.macroUnit, { color: colors.textMuted }]}>g</Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.macroRow}>
            <View style={styles.macroLeft}>
              <Text style={styles.macroEmoji}>🌾</Text>
              <Text style={[styles.macroName, { color: colors.text }]}>Carbs</Text>
            </View>
            <View style={[styles.macroInputWrap, { backgroundColor: colors.cardAlt }]}>
              <TextInput
                style={[styles.macroInput, { color: colors.text }]}
                value={carbs}
                onChangeText={setCarbs}
                keyboardType="numeric"
                maxLength={4}
              />
              <Text style={[styles.macroUnit, { color: colors.textMuted }]}>g</Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.macroRow}>
            <View style={styles.macroLeft}>
              <Text style={styles.macroEmoji}>💧</Text>
              <Text style={[styles.macroName, { color: colors.text }]}>Fat</Text>
            </View>
            <View style={[styles.macroInputWrap, { backgroundColor: colors.cardAlt }]}>
              <TextInput
                style={[styles.macroInput, { color: colors.text }]}
                value={fat}
                onChangeText={setFat}
                keyboardType="numeric"
                maxLength={4}
              />
              <Text style={[styles.macroUnit, { color: colors.textMuted }]}>g</Text>
            </View>
          </View>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.summaryTitle, { color: colors.text }]}>Macro Split</Text>
          <View style={styles.barRow}>
            <View style={[styles.barSegment, { flex: Number(protein) || 1, backgroundColor: "#34C759" }]} />
            <View style={[styles.barSegment, { flex: Number(carbs) || 1, backgroundColor: "#FFCC00" }]} />
            <View style={[styles.barSegment, { flex: Number(fat) || 1, backgroundColor: "#FF9500" }]} />
          </View>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: "#34C759" }]} />
              <Text style={[styles.legendText, { color: colors.textSecondary }]}>
                Protein {protein}g
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: "#FFCC00" }]} />
              <Text style={[styles.legendText, { color: colors.textSecondary }]}>
                Carbs {carbs}g
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: "#FF9500" }]} />
              <Text style={[styles.legendText, { color: colors.textSecondary }]}>
                Fat {fat}g
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          style={[styles.saveBtn, { backgroundColor: colors.text }]}
          onPress={handleSave}
        >
          <Text style={[styles.saveBtnText, { color: colors.bg }]}>Save Goals</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { paddingBottom: 40 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 12,
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center" },
  headerTitle: { fontSize: 20, fontWeight: "700" },

  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
    marginTop: 20,
    paddingHorizontal: 20,
  },

  goalCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  goalIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  goalInfo: { flex: 1 },
  goalLabel: { fontSize: 16, fontWeight: "700" },
  goalDesc: { fontSize: 13, marginTop: 2 },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  radioDot: { width: 10, height: 10, borderRadius: 5 },

  macroCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 6,
  },
  macroRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  macroLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  macroEmoji: { fontSize: 20 },
  macroName: { fontSize: 16, fontWeight: "600" },
  macroInputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 4,
  },
  macroInput: { fontSize: 17, fontWeight: "700", minWidth: 50, textAlign: "right", padding: 0 },
  macroUnit: { fontSize: 14, fontWeight: "500" },
  divider: { height: 1, marginHorizontal: 16 },

  summaryCard: {
    marginHorizontal: 20,
    marginTop: 14,
    borderRadius: 20,
    padding: 18,
  },
  summaryTitle: { fontSize: 16, fontWeight: "700", marginBottom: 14 },
  barRow: { flexDirection: "row", height: 10, borderRadius: 5, overflow: "hidden", gap: 3 },
  barSegment: { borderRadius: 5 },
  legendRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, fontWeight: "600" },

  saveBtn: {
    marginHorizontal: 20,
    marginTop: 28,
    height: 58,
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
  },
  saveBtnText: { fontSize: 17, fontWeight: "700" },
});
