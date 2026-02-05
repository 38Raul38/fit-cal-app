import { Text, View, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Calorie tracking{"\n"}made easy
      </Text>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && { opacity: 0.9 },
        ]}
        onPress={() => router.push("/goals")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>

<Text style={styles.signInText}>
  Already have an account?{" "}
  <Text
    style={styles.signInLink}
    onPress={() => router.push("/signIn")}
  >
    Sign in
  </Text>
</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 32,
  },

  title: {
    fontSize: 42,
    lineHeight: 46,
    fontWeight: "800",
    color: "#0F0F12",
    textAlign: "center",
    marginBottom: 28,
    paddingHorizontal: 24,
  },

  button: {
    width: "90%",
    height: 62,
    borderRadius: 31,
    backgroundColor: "#0F0F12",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  signInText: {
    fontSize: 16,
    color: "#2B2B2F",
  },

  signInLink: {
    fontWeight: "700",
    color: "#0F0F12",
  },
});
