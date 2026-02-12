import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useMeals } from "../../context/MealsContext";
import { useTheme } from "../../context/ThemeContext";

export default function Home() {
  const { colors } = useTheme();
  const { entries } = useMeals();

  const todayStr = new Date().toISOString().split("T")[0];

  const todayEntries = useMemo(
    () => entries.filter((e) => e.date === todayStr),
    [entries, todayStr]
  );

  const consumedCalories = useMemo(
    () => todayEntries.reduce((s, e) => s + e.food.calories * e.quantity, 0),
    [todayEntries]
  );
  const proteinConsumed = useMemo(
    () => todayEntries.reduce((s, e) => s + e.food.protein * e.quantity, 0),
    [todayEntries]
  );
  const carbsConsumed = useMemo(
    () => todayEntries.reduce((s, e) => s + e.food.carbs * e.quantity, 0),
    [todayEntries]
  );
  const fatConsumed = useMemo(
    () => todayEntries.reduce((s, e) => s + e.food.fat * e.quantity, 0),
    [todayEntries]
  );

  const totalCalories = 2220;
  const proteinTotal = 150;
  const carbsTotal = 240;
  const fatTotal = 80;
  const caloriesLeft = Math.max(totalCalories - consumedCalories, 0);

  const [waterGlasses, setWaterGlasses] = useState(0);
  const maxGlasses = 8;

  const addGlass = () => {
    if (waterGlasses < maxGlasses) setWaterGlasses(waterGlasses + 1);
  };
  const removeGlass = () => {
    if (waterGlasses > 0) setWaterGlasses(waterGlasses - 1);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.caloriesCard, { backgroundColor: colors.card }]}>
        <View style={styles.caloriesRow}>
          <View>
            <Text style={[styles.caloriesBig, { color: colors.text }]}>{caloriesLeft}</Text>
            <Text style={[styles.caloriesLabel, { color: colors.textSecondary }]}>Calories left</Text>
          </View>
          <View style={styles.consumedBadge}>
            <Text style={[styles.consumedNumber, { color: colors.accent }]}>{consumedCalories}</Text>
          </View>
        </View>
        <View style={[styles.caloriesBarBg, { backgroundColor: colors.cardAlt }]}>
          <View
            style={[
              styles.caloriesBarFill,
              {
                width: `${Math.min(
                  (consumedCalories / totalCalories) * 100,
                  100
                )}%`,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.macrosRow}>
        <View style={[styles.macroCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.macroValue, { color: colors.text }]}>
            {Math.max(proteinTotal - proteinConsumed, 0)}g
          </Text>
          <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>Protein left</Text>
          <View style={styles.macroIconWrap}>
            <Text style={styles.macroIcon}>🍎</Text>
          </View>
        </View>
        <View style={[styles.macroCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.macroValue, { color: colors.text }]}>{Math.max(carbsTotal - carbsConsumed, 0)}g</Text>
          <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>Carbs left</Text>
          <View style={styles.macroIconWrap}>
            <Text style={styles.macroIcon}>🌾</Text>
          </View>
        </View>
        <View style={[styles.macroCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.macroValue, { color: colors.text }]}>{Math.max(fatTotal - fatConsumed, 0)}g</Text>
          <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>Fat left</Text>
          <View style={styles.macroIconWrap}>
            <Text style={styles.macroIcon}>💧</Text>
          </View>
        </View>
      </View>

      <View style={[styles.waterCard, { backgroundColor: colors.card }]}>
        <View style={styles.waterHeader}>
          <View style={styles.waterTitleRow}>
            <Ionicons name="water-outline" size={22} color={colors.accentBlue} />
            <Text style={[styles.waterTitle, { color: colors.text }]}>Water Intake</Text>
          </View>
          <Text style={[styles.waterCount, { color: colors.textSecondary }]}>
            {waterGlasses} / {maxGlasses} glasses
          </Text>
        </View>

        <View style={[styles.waterBarBg, { backgroundColor: colors.cardAlt }]}>
          <View
            style={[
              styles.waterBarFill,
              { width: `${(waterGlasses / maxGlasses) * 100}%` },
            ]}
          />
        </View>

        <View style={styles.glassGrid}>
          {Array.from({ length: maxGlasses }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.glassItem,
                { backgroundColor: colors.cardAlt },
                i < waterGlasses && styles.glassItemFilled,
              ]}
            >
              <Ionicons
                name={i < waterGlasses ? "water" : "water-outline"}
                size={24}
                color={i < waterGlasses ? colors.accentBlue : colors.textMuted}
              />
            </View>
          ))}
        </View>

        <View style={styles.waterButtons}>
          <Pressable
            style={[styles.waterBtnRemove, { borderColor: colors.border, backgroundColor: colors.bg }]}
            onPress={removeGlass}
          >
            <Ionicons name="remove" size={18} color={colors.textSecondary} />
            <Text style={[styles.waterBtnRemoveText, { color: colors.textSecondary }]}>Remove</Text>
          </Pressable>
          <Pressable
            style={[styles.waterBtnAdd, { backgroundColor: colors.text }]}
            onPress={addGlass}
          >
            <Ionicons name="add" size={18} color={colors.bg} />
            <Text style={[styles.waterBtnAddText, { color: colors.bg }]}>Add Glass</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 30,
  },

  caloriesCard: {
    backgroundColor: "#F7F7F9",
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
  },
  caloriesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  caloriesBig: {
    fontSize: 52,
    fontWeight: "800",
    color: "#0F0F12",
    letterSpacing: -2,
  },
  caloriesLabel: {
    fontSize: 15,
    color: "#6B6B70",
    marginTop: 2,
  },
  consumedBadge: {
    marginTop: 8,
  },
  consumedNumber: {
    fontSize: 28,
    fontWeight: "800",
    color: "#E87B35",
  },
  caloriesBarBg: {
    height: 6,
    backgroundColor: "#E8E8EC",
    borderRadius: 3,
    overflow: "hidden",
  },
  caloriesBarFill: {
    height: 6,
    backgroundColor: "#E87B35",
    borderRadius: 3,
  },

  macrosRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  macroCard: {
    flex: 1,
    backgroundColor: "#F7F7F9",
    borderRadius: 20,
    padding: 16,
    minHeight: 130,
  },
  macroValue: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F0F12",
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 12,
    color: "#6B6B70",
    marginBottom: 16,
  },
  macroIconWrap: {
    marginTop: "auto",
  },
  macroIcon: {
    fontSize: 22,
  },

  waterCard: {
    backgroundColor: "#F7F7F9",
    borderRadius: 24,
    padding: 24,
  },
  waterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  waterTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  waterTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F0F12",
  },
  waterCount: {
    fontSize: 14,
    color: "#6B6B70",
  },
  waterBarBg: {
    height: 8,
    backgroundColor: "#E8E8EC",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 20,
  },
  waterBarFill: {
    height: 8,
    backgroundColor: "#4A90D9",
    borderRadius: 4,
  },
  glassGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  glassItem: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#EDEDF0",
    justifyContent: "center",
    alignItems: "center",
  },
  glassItemFilled: {
    backgroundColor: "#D6E8FA",
  },
  waterButtons: {
    flexDirection: "row",
    gap: 12,
  },
  waterBtnRemove: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: "#D0D0D5",
    backgroundColor: "#FFFFFF",
  },
  waterBtnRemoveText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6B6B70",
  },
  waterBtnAdd: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0F0F12",
  },
  waterBtnAddText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
