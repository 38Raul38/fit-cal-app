// app/height-weight.tsx
import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HeightWeight() {
  const router = useRouter();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const isValid = height.trim().length > 0 && weight.trim().length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Height & Weight</Text>
      <Text style={styles.subtitle}>
        This helps us calculate your daily calorie needs
      </Text>

      <View style={styles.field}>
        <Text style={styles.label}>Height (cm)</Text>
        <TextInput
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          placeholder="e.g. 175"
          placeholderTextColor="#8E8E93"
          style={styles.input}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          placeholder="e.g. 70"
          placeholderTextColor="#8E8E93"
          style={styles.input}
        />
      </View>

      <View style={styles.footer}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
        >
          <Text style={styles.backText}>BACK</Text>
        </Pressable>

        <Pressable
          disabled={!isValid}
          onPress={() => router.push("/results")}
          style={({ pressed }) => [
            styles.nextBtn,
            !isValid && styles.nextDisabled,
            pressed && isValid && styles.pressed,
          ]}
        >
          <Text style={styles.nextText}>NEXT</Text>
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
  field: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    color: "#6B6B70",
    marginBottom: 8,
  },
  input: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    paddingHorizontal: 16,
    fontSize: 18,
    color: "#0F0F12",
  },
  footer: {
    marginTop: "auto",
    flexDirection: "row",
    gap: 14,
    paddingBottom: 28,
  },
  backBtn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    justifyContent: "center",
    alignItems: "center",
  },
  nextBtn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#0F0F12",
    justifyContent: "center",
    alignItems: "center",
  },
  nextDisabled: {
    opacity: 0.35,
  },
  backText: {
    color: "#0F0F12",
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  nextText: {
    color: "#FFFFFF",
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  pressed: {
    opacity: 0.9,
  },
});
