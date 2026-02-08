// app/goals.tsx
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
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

  // Анимация появления
  const [fadeAnims] = useState({
    title: new Animated.Value(0),
    lose: new Animated.Value(0),
    maintain: new Animated.Value(0),
    gain: new Animated.Value(0),
  });

  useEffect(() => {
    // Поэтапное появление элементов
    Animated.stagger(150, [
      Animated.timing(fadeAnims.title, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnims.lose, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnims.maintain, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnims.gain, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

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
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "33%" }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Animated.View style={{ opacity: fadeAnims.title }}>
          <Text style={styles.title}>What's your goal?</Text>
          <Text style={styles.subtitle}>
            We'll adjust your daily calories to match it
          </Text>
        </Animated.View>

        <Animated.View
          style={{
            opacity: fadeAnims.lose,
            transform: [{ scale: scaleAnim.lose }],
          }}
        >
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

        <Animated.View
          style={{
            opacity: fadeAnims.maintain,
            transform: [{ scale: scaleAnim.maintain }],
          }}
        >
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

        <Animated.View
          style={{
            opacity: fadeAnims.gain,
            transform: [{ scale: scaleAnim.gain }],
          }}
        >
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
            style={[styles.buttonNext, !goal && styles.buttonDisabled]}
            disabled={!goal}
            onPress={() => router.push("/activity")}
          >
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    marginBottom: 12,
  },
  backArrow: {
    fontSize: 28,
    color: "#0F0F12",
  },
  progressBar: {
    height: 4,
    backgroundColor: "#E5E5EA",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#0F0F12",
  },
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 32,
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
    marginHorizontal: 24,
    marginBottom: 40,
  },
  buttonNext: {
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
