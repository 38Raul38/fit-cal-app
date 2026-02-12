import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View,
} from "react-native";
import { useProfile } from "../../context/ProfileContext";
import { useTheme } from "../../context/ThemeContext";

interface SettingItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  type: "link" | "toggle" | "danger";
  value?: boolean;
}

export default function Settings() {
  const router = useRouter();
  const { colors, isDark, toggleTheme } = useTheme();
  const { profile } = useProfile();
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);

  const profileSections: SettingItem[][] = [
    [
      { icon: "person-outline", label: "Edit Profile", type: "link" },
      { icon: "body-outline", label: "Update Goals", type: "link" },
      { icon: "barbell-outline", label: "Activity Level", type: "link" },
    ],
    [
      {
        icon: "notifications-outline",
        label: "Notifications",
        type: "toggle",
        value: notifications,
      },
      {
        icon: "alarm-outline",
        label: "Meal Reminders",
        type: "toggle",
        value: reminders,
      },
      {
        icon: "moon-outline",
        label: "Dark Mode",
        type: "toggle",
        value: isDark,
      },
    ],
    [
      { icon: "help-circle-outline", label: "Help & Support", type: "link" },
      { icon: "document-text-outline", label: "Privacy Policy", type: "link" },
      { icon: "information-circle-outline", label: "About", type: "link" },
    ],
    [
      { icon: "log-out-outline", label: "Sign Out", type: "danger" },
    ],
  ];

  const handleToggle = (label: string) => {
    if (label === "Notifications") setNotifications((p) => !p);
    if (label === "Meal Reminders") setReminders((p) => !p);
    if (label === "Dark Mode") toggleTheme();
  };

  const handlePress = (item: SettingItem) => {
    if (item.label === "Edit Profile") {
      router.push("/edit-profile");
      return;
    }
    if (item.label === "Update Goals") {
      router.push("/update-goals");
      return;
    }
    if (item.label === "Activity Level") {
      router.push("/activity-level");
      return;
    }
    if (item.label === "Help & Support") {
      router.push("/help-support");
      return;
    }
    if (item.label === "Privacy Policy") {
      router.push("/privacy-policy");
      return;
    }
    if (item.label === "About") {
      router.push("/about");
      return;
    }
    if (item.type === "danger") {
      Alert.alert("Sign Out", "Are you sure you want to sign out?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: () => router.replace("/signIn"),
        },
      ]);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

      <Pressable
        style={[styles.profileCard, { backgroundColor: colors.card }]}
        onPress={() => router.push("/edit-profile")}
      >
        {profile.avatarUri ? (
          <Image source={{ uri: profile.avatarUri }} style={styles.avatarImg} />
        ) : (
          <View style={[styles.avatar, { backgroundColor: colors.text }]}>
            <Ionicons name="person" size={32} color={colors.bg} />
          </View>
        )}
        <View style={styles.profileInfo}>
          <Text style={[styles.profileName, { color: colors.text }]}>{profile.name}</Text>
          <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>{profile.email}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      </Pressable>

      <View style={[styles.targetsCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.targetsTitle, { color: colors.text }]}>Daily Targets</Text>
        <View style={styles.targetsRow}>
          <View style={styles.targetItem}>
            <Text style={[styles.targetValue, { color: colors.text }]}>2220</Text>
            <Text style={[styles.targetLabel, { color: colors.textSecondary }]}>Calories</Text>
          </View>
          <View style={[styles.targetDivider, { backgroundColor: colors.borderLight }]} />
          <View style={styles.targetItem}>
            <Text style={[styles.targetValue, { color: colors.text }]}>150g</Text>
            <Text style={[styles.targetLabel, { color: colors.textSecondary }]}>Protein</Text>
          </View>
          <View style={[styles.targetDivider, { backgroundColor: colors.borderLight }]} />
          <View style={styles.targetItem}>
            <Text style={[styles.targetValue, { color: colors.text }]}>240g</Text>
            <Text style={[styles.targetLabel, { color: colors.textSecondary }]}>Carbs</Text>
          </View>
          <View style={[styles.targetDivider, { backgroundColor: colors.borderLight }]} />
          <View style={styles.targetItem}>
            <Text style={[styles.targetValue, { color: colors.text }]}>80g</Text>
            <Text style={[styles.targetLabel, { color: colors.textSecondary }]}>Fat</Text>
          </View>
        </View>
      </View>

      {profileSections.map((section, si) => (
        <View key={si} style={[styles.sectionCard, { backgroundColor: colors.card }]}>
          {section.map((item, ii) => (
            <Pressable
              key={ii}
              style={[
                styles.settingRow,
                ii < section.length - 1 && [styles.settingRowBorder, { borderBottomColor: colors.border }],
              ]}
              onPress={() => {
                if (item.type === "toggle") {
                  handleToggle(item.label);
                } else {
                  handlePress(item);
                }
              }}
            >
              <View style={styles.settingLeft}>
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={item.type === "danger" ? colors.danger : colors.text}
                />
                <Text
                  style={[
                    styles.settingLabel,
                    { color: colors.text },
                    item.type === "danger" && { color: colors.danger },
                  ]}
                >
                  {item.label}
                </Text>
              </View>
              {item.type === "toggle" ? (
                <Switch
                  value={item.value}
                  onValueChange={() => handleToggle(item.label)}
                  trackColor={{ false: colors.switchTrack, true: colors.switchTrackActive }}
                  thumbColor="#FFFFFF"
                />
              ) : (
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={item.type === "danger" ? colors.danger : colors.textMuted}
                />
              )}
            </Pressable>
          ))}
        </View>
      ))}

      <Text style={[styles.version, { color: colors.textMuted }]}>FitCal v1.0.0</Text>
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
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F0F12",
    marginBottom: 24,
  },

  profileCard: {
    backgroundColor: "#F7F7F9",
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#0F0F12",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  avatarImg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 14,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F0F12",
  },
  profileEmail: {
    fontSize: 14,
    color: "#6B6B70",
    marginTop: 2,
  },

  targetsCard: {
    backgroundColor: "#F7F7F9",
    borderRadius: 24,
    padding: 20,
    marginBottom: 14,
  },
  targetsTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F0F12",
    marginBottom: 16,
  },
  targetsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  targetItem: {
    alignItems: "center",
    flex: 1,
  },
  targetValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F0F12",
    marginBottom: 4,
  },
  targetLabel: {
    fontSize: 12,
    color: "#6B6B70",
  },
  targetDivider: {
    width: 1,
    height: 36,
    backgroundColor: "#D8D8DC",
  },

  sectionCard: {
    backgroundColor: "#F7F7F9",
    borderRadius: 24,
    padding: 6,
    marginBottom: 14,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#EDEDF0",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F0F12",
  },
  settingLabelDanger: {
    color: "#E04040",
  },

  version: {
    textAlign: "center",
    fontSize: 13,
    color: "#A0A0A5",
    marginTop: 10,
  },
});
