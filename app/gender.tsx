import { useRouter } from "expo-router";
import { useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

export default function Gender() {
  const router = useRouter();
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [scaleAnim] = useState({
    female: new Animated.Value(1),
    male: new Animated.Value(1),
  });

  const handlePressIn = (genderType: "male" | "female") => {
    Animated.spring(scaleAnim[genderType], {
      toValue: 0.90,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (genderType: "male" | "female") => {
    Animated.spring(scaleAnim[genderType], {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your gender</Text>
      <Text style={styles.subtitle}>
        This will be used to calibrate your custom plan
      </Text>

      <Animated.View style={{ transform: [{ scale: scaleAnim.female }] }}>
        <Pressable
          style={[
            styles.option,
            gender === "female" && styles.optionSelected,
          ]}
          onPress={() => setGender("female")}
          onPressIn={() => handlePressIn("female")}
          onPressOut={() => handlePressOut("female")}
        >
          <Text
            style={[
              styles.optionText,
              gender === "female" && styles.optionTextSelected,
            ]}
          >
            Female
          </Text>
        </Pressable>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: scaleAnim.male }] }}>
        <Pressable
          style={[
            styles.option,
            gender === "male" && styles.optionSelected,
          ]}
          onPress={() => setGender("male")}
          onPressIn={() => handlePressIn("male")}
          onPressOut={() => handlePressOut("male")}
        >
          <Text
            style={[
              styles.optionText,
              gender === "male" && styles.optionTextSelected,
            ]}
          >
            Male
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
            !gender && styles.buttonDisabled,
          ]}
          disabled={!gender}
          onPress={() => router.push("/height-weight")}
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
    justifyContent: "center"
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
    height: 60,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  optionSelected: {
    backgroundColor: "#0F0F12",
    borderColor: "#0F0F12",
  },

  optionText: {
    fontSize: 18,
    color: "#0F0F12",
    fontWeight: "600",
  },

  optionTextSelected: {
    color: "#FFFFFF",
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
