import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActionSheetIOS,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useProfile, type Goal } from "../context/ProfileContext";
import { useTheme } from "../context/ThemeContext";

export default function EditProfile() {
  const { colors } = useTheme();
  const router = useRouter();
  const { profile, updateProfile } = useProfile();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [age, setAge] = useState(profile.age);
  const [height, setHeight] = useState(profile.height);
  const [weight, setWeight] = useState(profile.weight);
  const [goal, setGoal] = useState<Goal>(profile.goal);
  const [avatarUri, setAvatarUri] = useState<string | null>(profile.avatarUri);

  const goals = [
    { key: "lose" as const, label: "Lose Weight", icon: "trending-down-outline" as const },
    { key: "maintain" as const, label: "Maintain", icon: "reorder-two-outline" as const },
    { key: "gain" as const, label: "Gain Weight", icon: "trending-up-outline" as const },
  ];

  const pickFromLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow access to your photo library.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow access to your camera.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleChangePhoto = () => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Take Photo", "Choose from Library", ...(avatarUri ? ["Remove Photo"] : [])],
          cancelButtonIndex: 0,
          destructiveButtonIndex: avatarUri ? 3 : undefined,
        },
        (index) => {
          if (index === 1) takePhoto();
          else if (index === 2) pickFromLibrary();
          else if (index === 3) setAvatarUri(null);
        },
      );
    } else {
      Alert.alert("Change Photo", "Choose an option", [
        { text: "Take Photo", onPress: takePhoto },
        { text: "Choose from Library", onPress: pickFromLibrary },
        ...(avatarUri ? [{ text: "Remove Photo", style: "destructive" as const, onPress: () => setAvatarUri(null) }] : []),
        { text: "Cancel", style: "cancel" as const },
      ]);
    }
  };

  const handleSave = () => {
    updateProfile({ name, email, age, height, weight, goal, avatarUri });
    Alert.alert("Profile Updated", "Your profile has been saved successfully.", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.bg }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Edit Profile
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.avatarSection}>
          <Pressable onPress={handleChangePhoto}>
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
            ) : (
              <View style={[styles.avatar, { backgroundColor: colors.text }]}>
                <Ionicons name="person" size={44} color={colors.bg} />
              </View>
            )}
            <View style={[styles.cameraBadge, { backgroundColor: colors.accent }]}>
              <Ionicons name="camera" size={14} color="#FFF" />
            </View>
          </Pressable>
          <Pressable
            style={[styles.changePhotoBtn, { backgroundColor: colors.card }]}
            onPress={handleChangePhoto}
          >
            <Ionicons name="camera-outline" size={18} color={colors.text} />
            <Text style={[styles.changePhotoText, { color: colors.text }]}>
              Change Photo
            </Text>
          </Pressable>
        </View>

        <View style={styles.form}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
            Personal Information
          </Text>

          <View style={[styles.inputGroup, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Name</Text>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              value={name}
              onChangeText={setName}
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={[styles.inputGroup, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Email</Text>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.rowInputs}>
            <View style={[styles.inputGroup, styles.inputHalf, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Age</Text>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                placeholderTextColor={colors.textMuted}
              />
            </View>
            <View style={[styles.inputGroup, styles.inputHalf, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Height (cm)</Text>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                placeholderTextColor={colors.textMuted}
              />
            </View>
          </View>

          <View style={[styles.inputGroup, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Weight (kg)</Text>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <Text style={[styles.sectionLabel, { color: colors.textSecondary, marginTop: 24 }]}>
            Fitness Goal
          </Text>

          <View style={styles.goalRow}>
            {goals.map((g) => (
              <Pressable
                key={g.key}
                style={[
                  styles.goalCard,
                  { backgroundColor: colors.card },
                  goal === g.key && { backgroundColor: colors.text },
                ]}
                onPress={() => setGoal(g.key)}
              >
                <Ionicons
                  name={g.icon}
                  size={24}
                  color={goal === g.key ? colors.bg : colors.text}
                />
                <Text
                  style={[
                    styles.goalLabel,
                    { color: goal === g.key ? colors.bg : colors.text },
                  ]}
                >
                  {g.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Pressable
          style={[styles.saveBtn, { backgroundColor: colors.text }]}
          onPress={handleSave}
        >
          <Text style={[styles.saveBtnText, { color: colors.bg }]}>
            Save Changes
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  /* Avatar */
  avatarSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 14,
  },
  cameraBadge: {
    position: "absolute",
    right: 0,
    bottom: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  changePhotoBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  changePhotoText: {
    fontSize: 14,
    fontWeight: "600",
  },

  form: {
    paddingHorizontal: 20,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  inputGroup: {
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 14,
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  input: {
    fontSize: 17,
    fontWeight: "600",
    padding: 0,
  },
  rowInputs: {
    flexDirection: "row",
    gap: 10,
  },
  inputHalf: {
    flex: 1,
  },

  goalRow: {
    flexDirection: "row",
    gap: 10,
  },
  goalCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 18,
    borderRadius: 20,
    gap: 8,
  },
  goalLabel: {
    fontSize: 13,
    fontWeight: "700",
  },

  saveBtn: {
    marginHorizontal: 20,
    marginTop: 30,
    height: 58,
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
  },
  saveBtnText: {
    fontSize: 17,
    fontWeight: "700",
  },
});
