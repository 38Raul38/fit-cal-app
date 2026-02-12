import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

const PERIOD_FILTERS = ["90 Days", "6 Months", "1 Year", "All Time"] as const;
const CALORIE_FILTERS = ["This Week", "Last Week", "2 Weeks"] as const;
const WEEK_DAYS = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

interface GoalMetric {
  label: string;
  target: string;
  achieved: string;
  progress: number; // 0-1
}

export default function Analytics() {
  const { colors } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState<string>("90 Days");
  const [selectedCaloriePeriod, setSelectedCaloriePeriod] =
    useState<string>("This Week");

  const goalMetrics: GoalMetric[] = [
    { label: "Weight Loss", target: "10kg", achieved: "7.5kg", progress: 0.75 },
    { label: "Muscle Gain", target: "5kg", achieved: "3.2kg", progress: 0.64 },
    { label: "Body Fat %", target: "-5%", achieved: "-3.5%", progress: 0.7 },
    { label: "Workout Days", target: "60", achieved: "48", progress: 0.8 },
  ];

  // Mock daily calories data
  const dailyData = [0, 0, 0, 0, 0, 0, 0];
  const maxY = 4;

  const stats = {
    average: 0,
    highest: 0,
    lowest: 0,
    total: 0,
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: colors.text }]}>Analytics</Text>

      {/* Goal Progress Card */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Goal Progress</Text>

        <View style={styles.filterRow}>
          {PERIOD_FILTERS.map((f) => (
            <Pressable
              key={f}
              style={[
                styles.filterChip,
                { backgroundColor: colors.cardAlt },
                selectedPeriod === f && { backgroundColor: colors.text },
              ]}
              onPress={() => setSelectedPeriod(f)}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: colors.textSecondary },
                  selectedPeriod === f && { color: colors.bg },
                ]}
              >
                {f}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={[styles.tableHeader, { borderBottomColor: colors.borderLight }]}>
          <Text style={[styles.tableHeadCell, { flex: 1.2, color: colors.textSecondary }]}>Metric</Text>
          <Text style={[styles.tableHeadCell, { color: colors.textSecondary }]}>Target</Text>
          <Text style={[styles.tableHeadCell, { color: colors.textSecondary }]}>Achieved</Text>
          <Text style={[styles.tableHeadCell, { flex: 0.8 }]} />
        </View>

        {goalMetrics.map((m, i) => (
          <View
            key={i}
            style={[
              styles.tableRow,
              i < goalMetrics.length - 1 && [styles.tableRowBorder, { borderBottomColor: colors.border }],
            ]}
          >
            <Text style={[styles.tableCell, styles.tableCellBold, { flex: 1.2, color: colors.text }]}>
              {m.label}
            </Text>
            <Text style={[styles.tableCell, { color: colors.text }]}>{m.target}</Text>
            <Text style={[styles.tableCell, { color: colors.text }]}>{m.achieved}</Text>
            <View style={[styles.progressBarWrap, { flex: 0.8 }]}>
              <View style={[styles.progressBarBg, { backgroundColor: colors.borderLight }]}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${m.progress * 100}%` },
                  ]}
                />
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Total Calories Card */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Total Calories</Text>

        <View style={styles.filterRow}>
          {CALORIE_FILTERS.map((f) => (
            <Pressable
              key={f}
              style={[
                styles.filterChip,
                { backgroundColor: colors.cardAlt },
                selectedCaloriePeriod === f && { backgroundColor: colors.text },
              ]}
              onPress={() => setSelectedCaloriePeriod(f)}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: colors.textSecondary },
                  selectedCaloriePeriod === f && { color: colors.bg },
                ]}
              >
                {f}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={[styles.chartLabel, { color: colors.text }]}>Daily Breakdown</Text>
        <View style={styles.chartArea}>
          <View style={styles.yAxis}>
            {[4, 3, 2, 1, 0].map((v) => (
              <Text key={v} style={[styles.yLabel, { color: colors.textMuted }]}>{v}</Text>
            ))}
          </View>
          <View style={styles.chartGrid}>
            {[4, 3, 2, 1, 0].map((v) => (
              <View key={v} style={[styles.gridLine, { backgroundColor: colors.border }]} />
            ))}
            <View style={styles.barsRow}>
              {dailyData.map((val, i) => (
                <View key={i} style={styles.barCol}>
                  <View style={styles.barTrack}>
                    <View
                      style={[
                        styles.bar,
                        { height: `${(val / maxY) * 100}%`, backgroundColor: colors.text },
                      ]}
                    />
                  </View>
                  <Text style={[styles.xLabel, { color: colors.textMuted }]}>{WEEK_DAYS[i]}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Trend Analysis Card */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Trend Analysis</Text>

        <View style={styles.chartArea}>
          <View style={styles.yAxis}>
            {[4, 3, 2, 1, 0].map((v) => (
              <Text key={v} style={[styles.yLabel, { color: colors.textMuted }]}>{v}</Text>
            ))}
          </View>
          <View style={styles.chartGrid}>
            {[4, 3, 2, 1, 0].map((v) => (
              <View key={v} style={[styles.gridLine, { backgroundColor: colors.border }]} />
            ))}
            <View style={styles.trendLineWrap}>
              <View style={styles.trendLine} />
              {WEEK_DAYS.map((day, i) => (
                <View key={i} style={styles.trendDot}>
                  <View style={styles.trendDotInner} />
                </View>
              ))}
            </View>
            <View style={styles.xLabelsRow}>
              {WEEK_DAYS.map((day, i) => (
                <Text key={i} style={[styles.xLabel, { color: colors.textMuted }]}>{day}</Text>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.statsGrid}>
          {(["average", "highest", "lowest", "total"] as const).map((key) => (
            <View key={key} style={[styles.statCard, { backgroundColor: colors.cardAlt }]}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
              <Text style={[styles.statValue, { color: colors.text }]}>{stats[key]}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F0F12",
    marginBottom: 24,
  },

  /* Card */
  card: {
    backgroundColor: "#F7F7F9",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F0F12",
    marginBottom: 16,
  },

  /* Filters */
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: "#EDEDF0",
  },
  filterChipActive: {
    backgroundColor: "#0F0F12",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B6B70",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },

  /* Table */
  tableHeader: {
    flexDirection: "row",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D8DC",
  },
  tableHeadCell: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: "#6B6B70",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  tableRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#EDEDF0",
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: "#0F0F12",
  },
  tableCellBold: {
    fontWeight: "700",
  },
  progressBarWrap: {
    justifyContent: "center",
  },
  progressBarBg: {
    height: 6,
    backgroundColor: "#D8D8DC",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 6,
    backgroundColor: "#E87B35",
    borderRadius: 3,
  },

  /* Chart area */
  chartLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F0F12",
    marginBottom: 16,
  },
  chartArea: {
    flexDirection: "row",
    height: 220,
    marginBottom: 10,
  },
  yAxis: {
    width: 30,
    justifyContent: "space-between",
    paddingBottom: 28,
  },
  yLabel: {
    fontSize: 12,
    color: "#A0A0A5",
    textAlign: "right",
  },
  chartGrid: {
    flex: 1,
    position: "relative",
    justifyContent: "space-between",
    paddingBottom: 28,
  },
  gridLine: {
    height: 1,
    backgroundColor: "#E0E0E4",
  },
  barsRow: {
    position: "absolute",
    bottom: 28,
    left: 0,
    right: 0,
    top: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  barCol: {
    alignItems: "center",
    flex: 1,
  },
  barTrack: {
    width: 24,
    height: "100%",
    justifyContent: "flex-end",
    borderRadius: 6,
  },
  bar: {
    backgroundColor: "#0F0F12",
    borderRadius: 6,
    minHeight: 0,
  },
  xLabel: {
    fontSize: 12,
    color: "#A0A0A5",
    marginTop: 8,
  },

  /* Trend line */
  trendLineWrap: {
    position: "absolute",
    bottom: 28,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  trendLine: {
    position: "absolute",
    bottom: 0,
    left: 10,
    right: 10,
    height: 3,
    backgroundColor: "#E87B35",
    borderRadius: 2,
  },
  trendDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#E87B35",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  trendDotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E87B35",
  },
  xLabelsRow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  /* Stats grid */
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#EDEDF0",
    borderRadius: 18,
    padding: 18,
  },
  statLabel: {
    fontSize: 14,
    color: "#6B6B70",
    marginBottom: 6,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F0F12",
  },
});
