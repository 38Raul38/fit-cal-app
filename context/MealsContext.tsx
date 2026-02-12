import React, { createContext, useCallback, useContext, useState } from "react";

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
}

export interface MealEntry {
  food: FoodItem;
  quantity: number;
  mealType: "Breakfast" | "Lunch" | "Dinner" | "Snacks";
  date: string; // YYYY-MM-DD
}

interface MealsContextType {
  entries: MealEntry[];
  favorites: FoodItem[];
  addEntry: (entry: MealEntry) => void;
  removeEntry: (index: number) => void;
  toggleFavorite: (food: FoodItem) => void;
  isFavorite: (foodId: string) => boolean;
  getEntriesForDate: (date: string, mealType: string) => MealEntry[];
}

const MealsContext = createContext<MealsContextType>({
  entries: [],
  favorites: [],
  addEntry: () => {},
  removeEntry: () => {},
  toggleFavorite: () => {},
  isFavorite: () => false,
  getEntriesForDate: () => [],
});

export function MealsProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<MealEntry[]>([]);
  const [favorites, setFavorites] = useState<FoodItem[]>([]);

  const addEntry = useCallback((entry: MealEntry) => {
    setEntries((prev) => [...prev, entry]);
  }, []);

  const removeEntry = useCallback((index: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const toggleFavorite = useCallback((food: FoodItem) => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.id === food.id);
      if (exists) return prev.filter((f) => f.id !== food.id);
      return [...prev, food];
    });
  }, []);

  const isFavorite = useCallback(
    (foodId: string) => favorites.some((f) => f.id === foodId),
    [favorites]
  );

  const getEntriesForDate = useCallback(
    (date: string, mealType: string) =>
      entries.filter((e) => e.date === date && e.mealType === mealType),
    [entries]
  );

  return (
    <MealsContext.Provider
      value={{
        entries,
        favorites,
        addEntry,
        removeEntry,
        toggleFavorite,
        isFavorite,
        getEntriesForDate,
      }}
    >
      {children}
    </MealsContext.Provider>
  );
}

export function useMeals() {
  return useContext(MealsContext);
}
