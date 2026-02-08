// app/height-weight.tsx
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HeightWeight() {
  const router = useRouter();
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);

  // Генерация значений для рулетки роста (140-220 см)
  const heightValues = Array.from({ length: 81 }, (_, i) => 140 + i);
  // Генерация значений для рулетки веса (40-150 кг)
  const weightValues = Array.from({ length: 111 }, (_, i) => 40 + i);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Height & Weight</Text>
      <Text style={styles.subtitle}>
        This helps us calculate your daily calorie needs
      </Text>

      <View style={styles.pickersContainer}>
        <View style={styles.pickerWrapper}>
          <Text style={styles.label}>Height</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={height}
              onValueChange={(value) => setHeight(value)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {heightValues.map((value) => (
                <Picker.Item
                  key={value}
                  label={`${value} cm`}
                  value={value}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.pickerWrapper}>
          <Text style={styles.label}>Weight</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={weight}
              onValueChange={(value) => setWeight(value)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {weightValues.map((value) => (
                <Picker.Item
                  key={value}
                  label={`${value} kg`}
                  value={value}
                />
              ))}
            </Picker>
          </View>
        </View>
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
          onPress={() => router.push("/results")}
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
  pickersContainer: {
    marginBottom: 32,
  },
  pickerWrapper: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F0F12",
    marginBottom: 12,
    textAlign: "center",
  },
  pickerBox: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    backgroundColor: "#FAFAFA",
    overflow: "hidden",
  },
  picker: {
    height: 180,
  },
  pickerItem: {
    fontSize: 24,
    fontWeight: "600",
    color: "#0F0F12",
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
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
