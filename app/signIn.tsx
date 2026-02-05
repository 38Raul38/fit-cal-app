// app/sign-in.tsx
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SignIn() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <Text style={styles.subtitle}>
        Enter your details to continue
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#8E8E93"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#8E8E93"
        secureTextEntry
      />

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
        ]}
        onPress={() => router.push("/")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/signUp")}>
        <Text style={styles.linkText}>Create account</Text>
      </Pressable>

      <Pressable onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0F0F12",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 16,
    color: "#6B6B70",
    marginBottom: 28,
  },

  input: {
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#0F0F12",
    marginBottom: 12,
  },

  button: {
    height: 62,
    borderRadius: 31,
    backgroundColor: "#0F0F12",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 14,
  },

  pressed: {
    opacity: 0.9,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  linkText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F0F12",
    textAlign: "center",
  },

  back: {
  alignSelf: "flex-start",
  marginBottom: 16,
  borderWidth: 1,
  borderColor: "transparent",
  padding: 8,
},

backText: {
  fontSize: 16,
  color: "#0F0F12",
  fontWeight: "600",
},
});
