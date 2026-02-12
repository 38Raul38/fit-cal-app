import { useRouter } from "expo-router";
import { useProfile } from "../context/ProfileContext";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const ITEM_WIDTH = 20;
const MIN_WEIGHT = 40;
const MAX_WEIGHT = 150;
const SCREEN_WIDTH = Dimensions.get("window").width;
const SIDE_PADDING = SCREEN_WIDTH / 2;

export default function Weight() {
  const router = useRouter();
  const { updateProfile } = useProfile();
  const [weight, setWeight] = useState(70);
  const scrollRef = useRef<ScrollView>(null);
  const didMount = useRef(false);

  const weightValues = Array.from(
    { length: MAX_WEIGHT - MIN_WEIGHT + 1 },
    (_, i) => MIN_WEIGHT + i,
  );

  // Scroll to initial value on mount
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      const offset = (weight - MIN_WEIGHT) * ITEM_WIDTH;
      setTimeout(() => {
        scrollRef.current?.scrollTo({ x: offset, animated: false });
      }, 50);
    }
  }, []);

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = e.nativeEvent.contentOffset.x;
      let value = Math.round(offsetX / ITEM_WIDTH) + MIN_WEIGHT;
      value = Math.max(MIN_WEIGHT, Math.min(MAX_WEIGHT, value));
      setWeight(value);
    },
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "83%" }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>What is your current weight?</Text>

        <View style={styles.pickerContainer}>
          <Text style={styles.selectedValue}>{weight} kg</Text>

          <View style={styles.rulerWrapper}>
            {/* Center indicator line */}
            <View style={styles.centerIndicator} />

            <ScrollView
              ref={scrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                styles.ruler,
                { paddingHorizontal: SIDE_PADDING },
              ]}
              snapToInterval={ITEM_WIDTH}
              decelerationRate="fast"
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {weightValues.map((value) => {
                const isSelected = value === weight;
                const isMajor = value % 10 === 0;

                return (
                  <View key={value} style={styles.rulerItem}>
                    <View
                      style={[
                        styles.rulerLine,
                        isMajor && styles.rulerLineMajor,
                        isSelected && styles.rulerLineSelected,
                      ]}
                    />
                    {isMajor && (
                      <Text
                        style={[
                          styles.rulerLabel,
                          isSelected && styles.rulerLabelSelected,
                        ]}
                      >
                        {value}
                      </Text>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>

      <Pressable
        style={styles.buttonNext}
        onPress={() => {
          updateProfile({ weight: String(weight) });
          router.push("/results");
        }}
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
  rulerWrapper: {
    position: "relative",
    width: "100%",
  },
  centerIndicator: {
    position: "absolute",
    left: "50%",
    marginLeft: -1.5,
    top: 0,
    width: 3,
    height: 65,
    backgroundColor: "#0F0F12",
    borderRadius: 2,
    zIndex: 10,
  },
  ruler: {
    alignItems: "flex-end",
    paddingVertical: 20,
  },
  rulerItem: {
    width: ITEM_WIDTH,
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
