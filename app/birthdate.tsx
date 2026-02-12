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
const SCREEN_WIDTH = Dimensions.get("window").width;
const SIDE_PADDING = SCREEN_WIDTH / 2;

/* ── value ranges ── */
const MIN_DAY = 1;
const MAX_DAY = 31;
const MIN_MONTH = 1;
const MAX_MONTH = 12;
const MIN_YEAR = 1950;
const MAX_YEAR = 2015;

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const dayValues = Array.from({ length: MAX_DAY - MIN_DAY + 1 }, (_, i) => MIN_DAY + i);
const monthValues = Array.from({ length: MAX_MONTH - MIN_MONTH + 1 }, (_, i) => MIN_MONTH + i);
const yearValues = Array.from({ length: MAX_YEAR - MIN_YEAR + 1 }, (_, i) => MIN_YEAR + i);

/* ═══════════════════════════════════════════ */
export default function Birthdate() {
  const router = useRouter();
  const { updateProfile } = useProfile();

  const [day, setDay] = useState(15);
  const [month, setMonth] = useState(6);
  const [year, setYear] = useState(2000);

  const dayRef = useRef<ScrollView>(null);
  const monthRef = useRef<ScrollView>(null);
  const yearRef = useRef<ScrollView>(null);
  const mounted = useRef(false);

  /* scroll to defaults on mount */
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      setTimeout(() => {
        dayRef.current?.scrollTo({ x: (day - MIN_DAY) * ITEM_WIDTH, animated: false });
        monthRef.current?.scrollTo({ x: (month - MIN_MONTH) * ITEM_WIDTH, animated: false });
        yearRef.current?.scrollTo({ x: (year - MIN_YEAR) * ITEM_WIDTH, animated: false });
      }, 50);
    }
  }, []);

  const makeScrollHandler = useCallback(
    (min: number, max: number, setter: (v: number) => void) =>
      (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const x = e.nativeEvent.contentOffset.x;
        let v = Math.round(x / ITEM_WIDTH) + min;
        v = Math.max(min, Math.min(max, v));
        setter(v);
      },
    [],
  );

  /* compute age */
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  if (age < 0) age = 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "55%" }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>When were you born?</Text>
        <Text style={styles.subtitle}>
          We'll use this to personalize your plan
        </Text>

        {/* ── Displayed value ── */}
        <View style={styles.dateDisplay}>
          <Text style={styles.dateText}>
            {MONTH_NAMES[month - 1]} {day}, {year}
          </Text>
          <Text style={styles.ageText}>{age} years old</Text>
        </View>

        {/* ── Day ruler ── */}
        <Text style={styles.rulerTitle}>Day</Text>
        <View style={styles.rulerWrapper}>
          <View style={styles.centerIndicator} />
          <ScrollView
            ref={dayRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.ruler, { paddingHorizontal: SIDE_PADDING }]}
            snapToInterval={ITEM_WIDTH}
            decelerationRate="fast"
            onScroll={makeScrollHandler(MIN_DAY, MAX_DAY, setDay)}
            scrollEventThrottle={16}
          >
            {dayValues.map((v) => {
              const isSelected = v === day;
              const isMajor = v % 5 === 0;
              return (
                <View key={v} style={styles.rulerItem}>
                  <View
                    style={[
                      styles.rulerLine,
                      isMajor && styles.rulerLineMajor,
                      isSelected && styles.rulerLineSelected,
                    ]}
                  />
                  {isMajor && (
                    <Text style={[styles.rulerLabel, isSelected && styles.rulerLabelSelected]}>
                      {v}
                    </Text>
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* ── Month ruler ── */}
        <Text style={styles.rulerTitle}>Month</Text>
        <View style={styles.rulerWrapper}>
          <View style={styles.centerIndicator} />
          <ScrollView
            ref={monthRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.ruler, { paddingHorizontal: SIDE_PADDING }]}
            snapToInterval={ITEM_WIDTH}
            decelerationRate="fast"
            onScroll={makeScrollHandler(MIN_MONTH, MAX_MONTH, setMonth)}
            scrollEventThrottle={16}
          >
            {monthValues.map((v) => {
              const isSelected = v === month;
              return (
                <View key={v} style={styles.rulerItem}>
                  <View
                    style={[
                      styles.rulerLine,
                      styles.rulerLineMajor,
                      isSelected && styles.rulerLineSelected,
                    ]}
                  />
                  <Text style={[styles.rulerLabel, isSelected && styles.rulerLabelSelected]}>
                    {MONTH_NAMES[v - 1]}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* ── Year ruler ── */}
        <Text style={styles.rulerTitle}>Year</Text>
        <View style={styles.rulerWrapper}>
          <View style={styles.centerIndicator} />
          <ScrollView
            ref={yearRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.ruler, { paddingHorizontal: SIDE_PADDING }]}
            snapToInterval={ITEM_WIDTH}
            decelerationRate="fast"
            onScroll={makeScrollHandler(MIN_YEAR, MAX_YEAR, setYear)}
            scrollEventThrottle={16}
          >
            {yearValues.map((v) => {
              const isSelected = v === year;
              const isMajor = v % 10 === 0;
              return (
                <View key={v} style={styles.rulerItem}>
                  <View
                    style={[
                      styles.rulerLine,
                      isMajor && styles.rulerLineMajor,
                      isSelected && styles.rulerLineSelected,
                    ]}
                  />
                  {isMajor && (
                    <Text style={[styles.rulerLabel, isSelected && styles.rulerLabelSelected]}>
                      {v}
                    </Text>
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* Next */}
      <Pressable
        style={styles.buttonNext}
        onPress={() => {
          updateProfile({
            birthDay: day,
            birthMonth: month,
            birthYear: year,
            age: String(age),
          });
          router.push("/height");
        }}
      >
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </View>
  );
}

/* ═══════════ styles ═══════════ */
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
    paddingTop: 32,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F0F12",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B6B70",
    marginBottom: 24,
  },

  /* Date display */
  dateDisplay: {
    alignItems: "center",
    marginBottom: 28,
  },
  dateText: {
    fontSize: 42,
    fontWeight: "800",
    color: "#0F0F12",
  },
  ageText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6B6B70",
    marginTop: 4,
  },

  /* Ruler shared */
  rulerTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6B6B70",
    marginBottom: 6,
    marginLeft: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  rulerWrapper: {
    position: "relative",
    width: "100%",
    marginBottom: 18,
  },
  centerIndicator: {
    position: "absolute",
    left: "50%",
    marginLeft: -1.5,
    top: 0,
    width: 3,
    height: 50,
    backgroundColor: "#0F0F12",
    borderRadius: 2,
    zIndex: 10,
  },
  ruler: {
    alignItems: "flex-end",
    paddingVertical: 14,
  },
  rulerItem: {
    width: ITEM_WIDTH,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  rulerLine: {
    width: 2,
    height: 24,
    backgroundColor: "#D1D1D6",
  },
  rulerLineMajor: {
    height: 40,
    backgroundColor: "#8E8E93",
  },
  rulerLineSelected: {
    backgroundColor: "#0F0F12",
    height: 50,
    width: 3,
  },
  rulerLabel: {
    fontSize: 11,
    color: "#8E8E93",
    marginTop: 6,
  },
  rulerLabelSelected: {
    color: "#0F0F12",
    fontWeight: "700",
  },

  /* Button */
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
