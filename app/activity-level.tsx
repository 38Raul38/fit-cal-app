import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useProfile, type ActivityLevel } from "../context/ProfileContext";
import { useTheme } from "../context/ThemeContext";

const LEVELS: {
  key: ActivityLevel;
  label: string;
  desc: string;
  icon: keyof typeof Ionicons.glyphMap;
  multiplier: string;
}[] = [
  {
    key: "not_active",
    label: "Not very active",
    desc: "Spend most of the day sitting (desk job, studying)",
    icon: "bed-outline",
    multiplier: "×1.2",
  },
  {
    key: "light",
    label: "Lightly active",
    desc: "Spend a good part of the day on your feet (teacher, retail)",
    icon: "walk-outline",
    multiplier: "×1.375",
  },
  {
    key: "active",
    label: "Active",
    desc: "Physically active most of the day (construction, trainer)",
    icon: "bicycle-outline",
    multiplier: "×1.55",
  },
  {
    key: "very_active",
    label: "Very active",
    desc: "Heavy physical activity all day (athlete, manual labor)",
    icon: "barbell-outline",
    multiplier: "×1.725",
  },
];

export default function ActivityLevelScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { profile, updateProfile } = useProfile();

  const [selected, setSelected] = useState<ActivityLevel>(profile.activityLevel);

  const handleSave = () => {
    updateProfile({ activityLevel: selected });
    Alert.alert("Activity Updated", "Your activity level has been saved.", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <ScrollView
      style={[styles.flex, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Activity Level
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Not counting workouts — we'll track those separately.
      </Text>

      {LEVELS.map((lvl) => {
        const active = selected === lvl.key;
        return (
          <Pressable
            key={lvl.key}
            style={[
              styles.card,
              { backgroundColor: colors.card, borderColor: colors.border },
              active && { backgroundColor: colors.text, borderColor: colors.text },
            ]}
            onPress={() => setSelected(lvl.key)}
          >
            <View
              style={[
                styles.iconWrap,
                { backgroundColor: active ? colors.bg + "22" : colors.cardAlt },
              ]}
            >
              <Ionicons
                name={lvl.icon}
                size={24}
                color={active ? colors.bg : colors.text}
              />
            </View>

            <View style={styles.cardInfo}>
              <View style={styles.labelRow}>
                <Text
                  style={[
                    styles.cardLabel,
                    { color: active ? colors.bg : colors.text },
                  ]}
                >
                  {lvl.label}
                </Text>
                <Text
                  style={[
                    styles.multiplier,
                    { color: active ? colors.bg + "AA" : colors.textMuted },
                  ]}
                >
                  {lvl.multiplier}
                </Text>
              </View>
              <Text
                style={[
                  styles.cardDesc,
                  { color: active ? colors.bg + "BB" : colors.textSecondary },
                ]}
              >
                {lvl.desc}
              </Text>
            </View>

            <View
              style={[
                styles.radio,
                { borderColor: active ? colors.bg : colors.border },
                active && { backgroundColor: colors.bg },
              ]}
            >
              {active && (
                <View style={[styles.radioDot, { backgroundColor: colors.text }]} />
              )}
            </View>
          </Pressable>
        );
      })}

      <View style={[styles.infoBox, { backgroundColor: colors.card }]}>
        <Ionicons name="information-circle-outline" size={20} color={colors.accent} />
        <Text style={[styles.infoText, { color: colors.textSecondary }]}>
          Your activity level is used as a TDEE multiplier to calculate daily
          calorie needs. You can change this at any time.
        </Text>
      </View>

      <Pressable
        style={[styles.saveBtn, { backgroundColor: colors.text }]}
        onPress={handleSave}
      >
        <Text style={[styles.saveBtnText, { color: colors.bg }]}>
          Save Activity Level
        </Text>
      </Pressable>
    </ScrollView>
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
    paddingBottom: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { fontSize: 20, fontWeight: "700" },

  subtitle: {
    fontSize: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    lineHeight: 22,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  cardInfo: { flex: 1 },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardLabel: { fontSize: 16, fontWeight: "700" },
  multiplier: { fontSize: 13, fontWeight: "600" },
  cardDesc: { fontSize: 13, marginTop: 3, lineHeight: 18 },

  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  radioDot: { width: 10, height: 10, borderRadius: 5 },

  infoBox: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 14,
    padding: 16,
    borderRadius: 16,
    gap: 12,
    alignItems: "flex-start",
  },
  infoText: { flex: 1, fontSize: 13, lineHeight: 19 },

  saveBtn: {
    marginHorizontal: 20,
    marginTop: 24,
    height: 58,
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
  },
  saveBtnText: { fontSize: 17, fontWeight: "700" },
});
