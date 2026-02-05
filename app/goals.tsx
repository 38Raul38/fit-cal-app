// app/goals.tsx
import { useRouter } from "expo-router";
import { useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

type Goal = "lose" | "maintain" | "gain";

export default function Goals() {
  const router = useRouter();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [scaleAnim] = useState({
    lose: new Animated.Value(1),
    maintain: new Animated.Value(1),
    gain: new Animated.Value(1),
  });

  const handlePressIn = (goalType: Goal) => {
    Animated.spring(scaleAnim[goalType], {
      toValue: 0.90,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (goalType: Goal) => {
    Animated.spring(scaleAnim[goalType], {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's your goal?</Text>
      <Text style={styles.subtitle}>
        We'll adjust your daily calories to match it
      </Text>

      <Animated.View style={{ transform: [{ scale: scaleAnim.lose }] }}>
        <Pressable
          style={[styles.option, goal === "lose" && styles.optionSelected]}
          onPress={() => setGoal("lose")}
          onPressIn={() => handlePressIn("lose")}
          onPressOut={() => handlePressOut("lose")}
        >
          <Text style={[styles.optionText, goal === "lose" && styles.optionTextSelected]}>
            Lose weight
          </Text>
          <Text style={styles.optionDesc}>Cut fat and get leaner</Text>
        </Pressable>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: scaleAnim.maintain }] }}>
        <Pressable
          style={[styles.option, goal === "maintain" && styles.optionSelected]}
          onPress={() => setGoal("maintain")}
          onPressIn={() => handlePressIn("maintain")}
          onPressOut={() => handlePressOut("maintain")}
        >
          <Text style={[styles.optionText, goal === "maintain" && styles.optionTextSelected]}>
            Maintain weight
          </Text>
          <Text style={styles.optionDesc}>Stay at your current weight</Text>
        </Pressable>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: scaleAnim.gain }] }}>
        <Pressable
          style={[styles.option, goal === "gain" && styles.optionSelected]}
          onPress={() => setGoal("gain")}
          onPressIn={() => handlePressIn("gain")}
          onPressOut={() => handlePressOut("gain")}
        >
          <Text style={[styles.optionText, goal === "gain" && styles.optionTextSelected]}>
            Gain weight
          </Text>
          <Text style={styles.optionDesc}>Build muscle and size</Text>
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
          style={[styles.buttonNext, !goal && styles.buttonDisabled]}
          disabled={!goal}
          onPress={() => router.push("/activity")}
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
    marginBottom: 52,
  },
  option: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E5E5EA",
    backgroundColor: "#ffffff",
    borderRadius: 40,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 14,
    justifyContent: "center",
    alignItems: "center", // ПОДУМАТЬ НАД ЭТИМ
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
