import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Results() {
  const router = useRouter();
  
  // Здесь будет логика расчёта калорий на основе данных пользователя
  const dailyCalories = 2450; // Пример расчёта
  const protein = 180; // г
  const carbs = 250; // г
  const fats = 70; // г

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Personalized Plan</Text>
      <Text style={styles.subtitle}>
        Based on your goals and lifestyle
      </Text>

      <View style={styles.resultCard}>
        <View style={styles.mainResult}>
          <Text style={styles.caloriesNumber}>{dailyCalories}</Text>
          <Text style={styles.caloriesLabel}>calories per day</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.macros}>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{protein}g</Text>
            <Text style={styles.macroLabel}>Protein</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{carbs}g</Text>
            <Text style={styles.macroLabel}>Carbs</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{fats}g</Text>
            <Text style={styles.macroLabel}>Fats</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>💡 Remember</Text>
        <Text style={styles.infoText}>
          These are your baseline calories. We'll adjust them based on your daily
          activity and workouts for more accurate tracking.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.buttonBack}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonBackText}>Back</Text>
        </Pressable>

        <Pressable
          style={styles.buttonNext}
          onPress={() => router.replace("/(tabs)/home")}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 80,
    justifyContent: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F0F12",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#6B6B70",
    marginBottom: 32,
  },

  resultCard: {
    backgroundColor: "#0F0F12",
    borderRadius: 32,
    padding: 32,
    marginBottom: 20,
  },

  mainResult: {
    alignItems: "center",
    marginBottom: 24,
  },

  caloriesNumber: {
    fontSize: 64,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -2,
  },

  caloriesLabel: {
    fontSize: 18,
    color: "#FFFFFF",
    opacity: 0.7,
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: "#FFFFFF",
    opacity: 0.2,
    marginBottom: 24,
  },

  macros: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  macroItem: {
    alignItems: "center",
  },

  macroValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },

  macroLabel: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.7,
  },

  infoCard: {
    backgroundColor: "#F5F5F7",
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F0F12",
    marginBottom: 8,
  },

  infoText: {
    fontSize: 15,
    color: "#6B6B70",
    lineHeight: 22,
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },

  buttonBack: {
    flex: 1,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#0F0F12",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonBackText: {
    color: "#0F0F12",
    fontSize: 18,
    fontWeight: "700",
  },

  buttonNext: {
    flex: 1,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#0F0F12",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});