import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Height() {
  const router = useRouter();
  const [height, setHeight] = useState(170);

  // Генерация значений для рулетки роста (140-220 см)
  const heightValues = Array.from({ length: 81 }, (_, i) => 140 + i);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "66%" }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>What is your height?</Text>

        <View style={styles.pickerContainer}>
          <Text style={styles.selectedValue}>{height} cm</Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.ruler}
            snapToInterval={20}
            decelerationRate="fast"
          >
            {heightValues.map((value, index) => {
              const isSelected = value === height;
              const isMajor = value % 10 === 0;
              
              return (
                <Pressable
                  key={value}
                  onPress={() => setHeight(value)}
                  style={styles.rulerItem}
                >
                  <View
                    style={[
                      styles.rulerLine,
                      isMajor && styles.rulerLineMajor,
                      isSelected && styles.rulerLineSelected,
                    ]}
                  />
                  {isMajor && (
                    <Text style={[styles.rulerLabel, isSelected && styles.rulerLabelSelected]}>
                      {value}
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>

      <Pressable
        style={styles.buttonNext}
        onPress={() => router.push("/weight")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
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
    paddingHorizontal: 24,
    paddingTop: 40,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F0F12",
    marginBottom: 60,
  },
  pickerContainer: {
    alignItems: "center",
  },
  selectedValue: {
    fontSize: 64,
    fontWeight: "800",
    color: "#0F0F12",
    marginBottom: 40,
  },
  ruler: {
    paddingHorizontal: 24,
    alignItems: "flex-end",
    paddingVertical: 20,
  },
  rulerItem: {
    width: 20,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  rulerLine: {
    width: 2,
    height: 30,
    backgroundColor: "#D1D1D6",
  },
  rulerLineMajor: {
    height: 50,
    backgroundColor: "#8E8E93",
  },
  rulerLineSelected: {
    backgroundColor: "#0F0F12",
    height: 60,
    width: 3,
  },
  rulerLabel: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 8,
  },
  rulerLabelSelected: {
    color: "#0F0F12",
    fontWeight: "700",
  },
  buttonNext: {
    marginHorizontal: 24,
    marginBottom: 40,
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
