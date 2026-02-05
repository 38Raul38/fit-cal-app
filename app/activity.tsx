import { useRouter } from "expo-router";
import { useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

type ActivityLevel = "not_active" | "light" | "active" | "very_active";

export default function Activity() {
  const router = useRouter();
  const [activity, setActivity] = useState<ActivityLevel | null>(null);
  const [scaleAnim] = useState({
    not_active: new Animated.Value(1),
    light: new Animated.Value(1),
    active: new Animated.Value(1),
    very_active: new Animated.Value(1),
  });

  const handlePressIn = (activityLevel: ActivityLevel) => {
    Animated.spring(scaleAnim[activityLevel], {
      toValue: 0.90,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (activityLevel: ActivityLevel) => {
    Animated.spring(scaleAnim[activityLevel], {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's your lifestyle like?</Text>
      <Text style={styles.subtitle}>
        Not counting workouts—we'll track those separately
      </Text>

      <Animated.View style={{ transform: [{ scale: scaleAnim.not_active }] }}>
        <Pressable
          style={[
            styles.option,
            activity === "not_active" && styles.optionSelected,
          ]}
          onPress={() => setActivity("not_active")}
          onPressIn={() => handlePressIn("not_active")}
          onPressOut={() => handlePressOut("not_active")}
        >
          <Text
            style={[
              styles.optionText,
              activity === "not_active" && styles.optionTextSelected,
            ]}
          >
            Not very active
          </Text>
          <Text style={styles.optionDesc}>
            Spend most of the day sitting
          </Text>
        </Pressable>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: scaleAnim.light }] }}>
        <Pressable
          style={[
            styles.option,
            activity === "light" && styles.optionSelected,
          ]}
          onPress={() => setActivity("light")}
          onPressIn={() => handlePressIn("light")}
          onPressOut={() => handlePressOut("light")}
        >
          <Text
            style={[
              styles.optionText,
              activity === "light" && styles.optionTextSelected,
            ]}
          >
            Lightly active
          </Text>
          <Text style={styles.optionDesc}>
            Spend most of the day on your feet
          </Text>
        </Pressable>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: scaleAnim.active }] }}>
        <Pressable
          style={[
            styles.option,
            activity === "active" && styles.optionSelected,
          ]}
          onPress={() => setActivity("active")}
          onPressIn={() => handlePressIn("active")}
          onPressOut={() => handlePressOut("active")}
        >
          <Text
            style={[
              styles.optionText,
              activity === "active" && styles.optionTextSelected,
            ]}
          >
            Active
          </Text>
          <Text style={styles.optionDesc}>
            Physical activity most of the day
          </Text>
        </Pressable>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: scaleAnim.very_active }] }}>
        <Pressable
          style={[
            styles.option,
            activity === "very_active" && styles.optionSelected,
          ]}
          onPress={() => setActivity("very_active")}
          onPressIn={() => handlePressIn("very_active")}
          onPressOut={() => handlePressOut("very_active")}
        >
          <Text
            style={[
              styles.optionText,
              activity === "very_active" && styles.optionTextSelected,
            ]}
          >
            Very active
          </Text>
          <Text style={styles.optionDesc}>
            Heavy physical activity most of the day
          </Text>
        </Pressable>
      </Animated.View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.buttonBack}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonBackText}>Back</Text>
        </Pressable>

        <Pressable
          style={[
            styles.buttonNext,
            !activity && styles.buttonDisabled,
          ]}
          disabled={!activity}
          onPress={() => router.push("/gender")}
        >
          <Text style={styles.buttonText}>Next</Text>
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

  option: {
    borderWidth: 1,
    borderColor: "#E5E5EA",
    backgroundColor: "#ffffff",
    borderRadius: 40,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 14,
  },

  optionSelected: {
    backgroundColor: "#0F0F12",
    borderColor: "#0F0F12",
  },

  optionText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F0F12",
  },

  optionTextSelected: {
    color: "#FFFFFF",
  },

  optionDesc: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B6B70",
  },

  buttonContainer: {
    marginTop: 32,
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
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
