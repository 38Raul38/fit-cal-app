import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getWeekDays(date: Date) {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);

  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

export default function Meals() {
  const { colors } = useTheme();
  const router = useRouter();
  const { getEntriesForDate, removeEntry, entries } = useMeals();

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [weekOffset, setWeekOffset] = useState(0);

  const currentWeek = useMemo(() => {
    const ref = new Date(today);
    ref.setDate(today.getDate() + weekOffset * 7);
    return getWeekDays(ref);
  }, [weekOffset]);

  const displayMonth = currentWeek[0].getMonth();
  const displayYear = currentWeek[0].getFullYear();

  const isToday = (date: Date) =>
    date.toDateString() === today.toDateString();
  const isSelected = (date: Date) =>
    date.toDateString() === selectedDate.toDateString();

  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snacks"] as const;
  const mealIcons: Record<string, string> = {
    Breakfast: "☀️",
    Lunch: "🍱",
    Dinner: "🌙",
    Snacks: "🍪",
  };

  const dateStr = selectedDate.toISOString().split("T")[0];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: colors.text }]}>Daily Meals</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>Track your meals throughout the day</Text>

      <View style={[styles.calendarCard, { backgroundColor: colors.card }]}>
        <View style={styles.calendarHeader}>
          <Text style={[styles.monthText, { color: colors.text }]}>
            {MONTHS[displayMonth]} {displayYear}
          </Text>
          <View style={styles.arrowRow}>
            <Pressable
              style={[styles.arrowBtn, { backgroundColor: colors.cardAlt }]}
              onPress={() => setWeekOffset(weekOffset - 1)}
            >
              <Ionicons name="chevron-back" size={18} color={colors.text} />
            </Pressable>
            <Pressable
              style={[styles.arrowBtn, { backgroundColor: colors.cardAlt }]}
              onPress={() => setWeekOffset(weekOffset + 1)}
            >
              <Ionicons name="chevron-forward" size={18} color={colors.text} />
            </Pressable>
          </View>
        </View>

        <View style={styles.weekRow}>
          {currentWeek.map((date, i) => {
            const selected = isSelected(date);
            return (
              <Pressable
                key={i}
                style={[
                  styles.dayCol,
                  selected && [styles.dayColSelected, { backgroundColor: colors.text }],
                ]}
                onPress={() => setSelectedDate(date)}
              >
                <Text
                  style={[
                    styles.dayLabel,
                    { color: colors.textSecondary },
                    selected && { color: colors.bg },
                  ]}
                >
                  {DAYS[i]}
                </Text>
                <Text
                  style={[
                    styles.dayNumber,
                    { color: colors.text },
                    selected && { color: colors.bg },
                  ]}
                >
                  {date.getDate()}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {isToday(selectedDate) && (
          <Text style={[styles.todayLabel, { color: colors.textSecondary }]}>Today</Text>
        )}
      </View>

      {mealTypes.map((mealType) => {
        const mealEntries = getEntriesForDate(dateStr, mealType);
        const totalCals = mealEntries.reduce((s, e) => s + e.food.calories * e.quantity, 0);

        return (
          <View key={mealType} style={[styles.mealCard, { backgroundColor: colors.card }]}>
            <View style={styles.mealHeader}>
              <View style={styles.mealTitleRow}>
                <Text style={styles.mealIcon}>{mealIcons[mealType]}</Text>
                <View>
                  <Text style={[styles.mealTitle, { color: colors.text }]}>{mealType}</Text>
                  <Text style={[styles.mealCalories, { color: colors.textSecondary }]}>
                    {totalCals} Calories
                  </Text>
                </View>
              </View>
              <Pressable
                style={[styles.addBtn, { backgroundColor: colors.cardAlt }]}
                onPress={() =>
                  router.push({
                    pathname: "/food-search",
                    params: { mealType, date: dateStr },
                  })
                }
              >
                <Ionicons name="add" size={22} color={colors.text} />
              </Pressable>
            </View>

            {mealEntries.length === 0 ? (
              <View style={styles.emptyMeal}>
                <Ionicons name="heart-outline" size={48} color={colors.textMuted} />
                <Text style={[styles.emptyText, { color: colors.textMuted }]}>No Meals Today</Text>
              </View>
            ) : (
              mealEntries.map((entry, i) => {
                const globalIdx = entries.indexOf(entry);
                return (
                  <View
                    key={i}
                    style={[styles.mealItemRow, { borderTopColor: colors.border }]}
                  >
                    <View style={styles.mealItemInfo}>
                      <Text style={[styles.mealItemName, { color: colors.text }]}>
                        {entry.food.name}
                      </Text>
                      <Text style={[styles.mealItemCals, { color: colors.textSecondary }]}>
                        {entry.food.calories * entry.quantity} kcal · {entry.food.serving}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => removeEntry(globalIdx)}
                      style={styles.removeBtn}
                    >
                      <Ionicons name="trash-outline" size={18} color={colors.danger} />
                    </Pressable>
                  </View>
                );
              })
            )}
          </View>
        );
      })}
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
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F0F12",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#A0A0A5",
    marginBottom: 24,
  },

  /* Calendar */
  calendarCard: {
    backgroundColor: "#F7F7F9",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F0F12",
  },
  arrowRow: {
    flexDirection: "row",
    gap: 8,
  },
  arrowBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#EDEDF0",
    justifyContent: "center",
    alignItems: "center",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayCol: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  dayColSelected: {
    backgroundColor: "#0F0F12",
  },
  dayLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B6B70",
    marginBottom: 6,
  },
  dayLabelSelected: {
    color: "#FFFFFF",
  },
  dayNumber: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F0F12",
  },
  dayNumberSelected: {
    color: "#FFFFFF",
  },
  todayLabel: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: "#6B6B70",
    marginTop: 12,
  },

  /* Meal cards */
  mealCard: {
    backgroundColor: "#F7F7F9",
    borderRadius: 24,
    padding: 20,
    marginBottom: 14,
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  mealTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  mealIcon: {
    fontSize: 28,
  },
  mealTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F0F12",
  },
  mealCalories: {
    fontSize: 14,
    color: "#6B6B70",
    marginTop: 2,
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#EDEDF0",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMeal: {
    alignItems: "center",
    paddingVertical: 28,
  },
  emptyText: {
    fontSize: 15,
    marginTop: 10,
  },
  mealItemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  mealItemInfo: {
    flex: 1,
  },
  mealItemName: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  mealItemCals: {
    fontSize: 13,
  },
  removeBtn: {
    padding: 6,
  },
});
