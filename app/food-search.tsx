import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { FoodItem, useMeals } from "../context/MealsContext";
import { useTheme } from "../context/ThemeContext";

const FOOD_DATABASE: FoodItem[] = [
  { id: "1", name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: "100g" },
  { id: "2", name: "Rice (White)", calories: 130, protein: 2.7, carbs: 28, fat: 0.3, serving: "100g" },
  { id: "3", name: "Banana", calories: 89, protein: 1.1, carbs: 23, fat: 0.3, serving: "1 medium" },
  { id: "4", name: "Eggs", calories: 155, protein: 13, carbs: 1.1, fat: 11, serving: "2 large" },
  { id: "5", name: "Oatmeal", calories: 68, protein: 2.4, carbs: 12, fat: 1.4, serving: "100g" },
  { id: "6", name: "Greek Yogurt", calories: 100, protein: 17, carbs: 6, fat: 0.7, serving: "170g" },
  { id: "7", name: "Salmon", calories: 208, protein: 20, carbs: 0, fat: 13, serving: "100g" },
  { id: "8", name: "Broccoli", calories: 34, protein: 2.8, carbs: 7, fat: 0.4, serving: "100g" },
  { id: "9", name: "Sweet Potato", calories: 86, protein: 1.6, carbs: 20, fat: 0.1, serving: "100g" },
  { id: "10", name: "Almonds", calories: 579, protein: 21, carbs: 22, fat: 50, serving: "100g" },
  { id: "11", name: "Apple", calories: 52, protein: 0.3, carbs: 14, fat: 0.2, serving: "1 medium" },
  { id: "12", name: "Avocado", calories: 160, protein: 2, carbs: 9, fat: 15, serving: "1/2 fruit" },
  { id: "13", name: "Turkey Breast", calories: 135, protein: 30, carbs: 0, fat: 1, serving: "100g" },
  { id: "14", name: "Cottage Cheese", calories: 98, protein: 11, carbs: 3.4, fat: 4.3, serving: "100g" },
  { id: "15", name: "Brown Rice", calories: 112, protein: 2.6, carbs: 24, fat: 0.9, serving: "100g" },
  { id: "16", name: "Whole Wheat Bread", calories: 247, protein: 13, carbs: 41, fat: 3.4, serving: "100g" },
  { id: "17", name: "Pasta", calories: 131, protein: 5, carbs: 25, fat: 1.1, serving: "100g" },
  { id: "18", name: "Beef (Lean)", calories: 250, protein: 26, carbs: 0, fat: 15, serving: "100g" },
  { id: "19", name: "Tuna", calories: 132, protein: 28, carbs: 0, fat: 1.3, serving: "100g" },
  { id: "20", name: "Milk (Whole)", calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, serving: "100ml" },
  { id: "21", name: "Peanut Butter", calories: 588, protein: 25, carbs: 20, fat: 50, serving: "100g" },
  { id: "22", name: "Spinach", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, serving: "100g" },
  { id: "23", name: "Blueberries", calories: 57, protein: 0.7, carbs: 14, fat: 0.3, serving: "100g" },
  { id: "24", name: "Orange", calories: 47, protein: 0.9, carbs: 12, fat: 0.1, serving: "1 medium" },
  { id: "25", name: "Protein Shake", calories: 120, protein: 24, carbs: 3, fat: 1.5, serving: "1 scoop" },
];

type TabType = "search" | "favorites";

export default function FoodSearch() {
  const { colors } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ mealType: string; date: string }>();
  const { addEntry, favorites, toggleFavorite, isFavorite } = useMeals();

  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("search");

  const mealType = (params.mealType || "Breakfast") as "Breakfast" | "Lunch" | "Dinner" | "Snacks";
  const date = params.date || new Date().toISOString().split("T")[0];

  const filteredFoods = useMemo(() => {
    if (activeTab === "favorites") {
      if (!query.trim()) return favorites;
      return favorites.filter((f) =>
        f.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (!query.trim()) return FOOD_DATABASE;
    return FOOD_DATABASE.filter((f) =>
      f.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, activeTab, favorites]);

  const handleAddFood = useCallback(
    (food: FoodItem) => {
      addEntry({ food, quantity: 1, mealType, date });
      router.back();
    },
    [addEntry, mealType, date, router]
  );

  const renderFoodItem = ({ item }: { item: FoodItem }) => (
    <View style={[styles.foodCard, { backgroundColor: colors.card }]}>
      <Pressable
        style={styles.favoriteBtn}
        onPress={() => toggleFavorite(item)}
      >
        <Ionicons
          name={isFavorite(item.id) ? "heart" : "heart-outline"}
          size={20}
          color={isFavorite(item.id) ? "#E04040" : colors.textMuted}
        />
      </Pressable>

      <View style={styles.foodInfo}>
        <Text style={[styles.foodName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.foodServing, { color: colors.textSecondary }]}>
          {item.serving}
        </Text>
        <View style={styles.macroRow}>
          <Text style={[styles.foodCalories, { color: colors.accent }]}>
            {item.calories} kcal
          </Text>
          <Text style={[styles.macroSmall, { color: colors.textMuted }]}>
            P: {item.protein}g
          </Text>
          <Text style={[styles.macroSmall, { color: colors.textMuted }]}>
            C: {item.carbs}g
          </Text>
          <Text style={[styles.macroSmall, { color: colors.textMuted }]}>
            F: {item.fat}g
          </Text>
        </View>
      </View>

      <Pressable
        style={[styles.addFoodBtn, { backgroundColor: colors.text }]}
        onPress={() => handleAddFood(item)}
      >
        <Ionicons name="add" size={20} color={colors.bg} />
      </Pressable>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Add {mealType}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Search */}
      <View
        style={[
          styles.searchBar,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Ionicons name="search" size={20} color={colors.textMuted} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search food..."
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery("")}>
            <Ionicons name="close-circle" size={20} color={colors.textMuted} />
          </Pressable>
        )}
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Pressable
          style={[
            styles.tab,
            activeTab === "search" && [styles.tabActive, { backgroundColor: colors.text }],
          ]}
          onPress={() => setActiveTab("search")}
        >
          <Ionicons
            name="search"
            size={16}
            color={activeTab === "search" ? colors.bg : colors.textMuted}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === "search" ? colors.bg : colors.textMuted },
            ]}
          >
            All Foods
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.tab,
            activeTab === "favorites" && [styles.tabActive, { backgroundColor: colors.text }],
          ]}
          onPress={() => setActiveTab("favorites")}
        >
          <Ionicons
            name="heart"
            size={16}
            color={activeTab === "favorites" ? colors.bg : colors.textMuted}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === "favorites" ? colors.bg : colors.textMuted },
            ]}
          >
            Favorites ({favorites.length})
          </Text>
        </Pressable>
      </View>

      {/* Food list */}
      <FlatList
        data={filteredFoods}
        keyExtractor={(item) => item.id}
        renderItem={renderFoodItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons
              name={activeTab === "favorites" ? "heart-outline" : "search-outline"}
              size={56}
              color={colors.textMuted}
            />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              {activeTab === "favorites"
                ? "No favorites yet.\nTap ♡ to save foods you love!"
                : "No foods found.\nTry a different search term."}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    paddingHorizontal: 16,
    height: 52,
    borderRadius: 18,
    borderWidth: 1,
    gap: 10,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: "100%",
  },
  tabs: {
    flexDirection: "row",
    marginHorizontal: 20,
    gap: 10,
    marginBottom: 14,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: "transparent",
  },
  tabActive: {
    // backgroundColor set dynamically
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  foodCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
    marginBottom: 10,
  },
  favoriteBtn: {
    marginRight: 12,
    padding: 4,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  foodServing: {
    fontSize: 13,
    marginBottom: 6,
  },
  macroRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  foodCalories: {
    fontSize: 14,
    fontWeight: "700",
  },
  macroSmall: {
    fontSize: 12,
  },
  addFoodBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  emptyState: {
    alignItems: "center",
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 16,
    lineHeight: 22,
  },
});
