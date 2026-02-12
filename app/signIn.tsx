// app/signIn.tsx
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

const EMAIL_RE = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;

function validateEmail(v: string) {
  if (!v) return "Email is required";
  if (!EMAIL_RE.test(v)) return "Invalid email format";
  return "";
}

function validatePassword(v: string) {
  if (!v) return "Password is required";
  if (v.length < 6) return "Password is too short";
  return "";
}

export default function SignIn() {
  const router = useRouter();
  const { colors } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securePass, setSecurePass] = useState(true);
  const [loading, setLoading] = useState(false);

  const [touched, setTouched] = useState({ email: false, password: false });
  const touch = (f: keyof typeof touched) =>
    setTouched((p) => ({ ...p, [f]: true }));

  const emailErr = touched.email ? validateEmail(email) : "";
  const passErr = touched.password ? validatePassword(password) : "";
  const formValid = !validateEmail(email) && !validatePassword(password);

  const handleSignIn = useCallback(async () => {
    setTouched({ email: true, password: true });
    if (!formValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)/home");
    }, 1000);
  }, [formValid, router]);

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.bg }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={[styles.backText, { color: colors.text }]}>← Back</Text>
        </Pressable>

        <Text style={[styles.title, { color: colors.text }]}>Welcome back</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Enter your details to continue
        </Text>

        <Text style={[styles.label, { color: colors.textSecondary }]}>Email</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.inputBg,
              borderColor: emailErr ? colors.danger : colors.inputBorder,
              color: colors.text,
            },
          ]}
          placeholder="example@mail.com"
          placeholderTextColor={colors.textMuted}
          value={email}
          onChangeText={setEmail}
          onBlur={() => touch("email")}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />
        {!!emailErr && (
          <Text style={[styles.err, { color: colors.danger }]}>{emailErr}</Text>
        )}

        <Text style={[styles.label, { color: colors.textSecondary }]}>Password</Text>
        <View style={styles.passRow}>
          <TextInput
            style={[
              styles.input,
              styles.passInput,
              {
                backgroundColor: colors.inputBg,
                borderColor: passErr ? colors.danger : colors.inputBorder,
                color: colors.text,
              },
            ]}
            placeholder="••••••••"
            placeholderTextColor={colors.textMuted}
            value={password}
            onChangeText={setPassword}
            onBlur={() => touch("password")}
            secureTextEntry={securePass}
            autoComplete="current-password"
          />
          <Pressable
            style={styles.eyeBtn}
            onPress={() => setSecurePass((p) => !p)}
          >
            <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
              {securePass ? "Show" : "Hide"}
            </Text>
          </Pressable>
        </View>
        {!!passErr && (
          <Text style={[styles.err, { color: colors.danger }]}>{passErr}</Text>
        )}

        <Pressable style={styles.forgotWrap}>
          <Text style={[styles.forgotText, { color: colors.textSecondary }]}>
            Forgot password?
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: formValid ? colors.black : colors.cardAlt,
            },
            pressed && formValid && { opacity: 0.85 },
          ]}
          onPress={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text
              style={[
                styles.buttonText,
                { color: formValid ? "#FFF" : colors.textMuted },
              ]}
            >
              Sign in
            </Text>
          )}
        </Pressable>

        <Pressable onPress={() => router.push("/signUp")} style={styles.linkWrap}>
          <Text style={[styles.linkLabel, { color: colors.textSecondary }]}>
            Don't have an account?{" "}
            <Text style={[styles.linkBold, { color: colors.text }]}>
              Create account
            </Text>
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: "center",
  },

  backBtn: { alignSelf: "flex-start", marginBottom: 24, padding: 4 },
  backText: { fontSize: 16, fontWeight: "600" },

  title: { fontSize: 32, fontWeight: "800", marginBottom: 6 },
  subtitle: { fontSize: 16, marginBottom: 28 },

  label: { fontSize: 13, fontWeight: "600", marginBottom: 6, marginLeft: 4 },

  input: {
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 4,
  },

  passRow: { position: "relative" },
  passInput: { paddingRight: 64 },
  eyeBtn: {
    position: "absolute",
    right: 16,
    top: 0,
    height: 54,
    justifyContent: "center",
  },

  err: { fontSize: 13, marginBottom: 8, marginLeft: 4 },

  forgotWrap: { alignSelf: "flex-end", marginTop: 4, marginBottom: 8 },
  forgotText: { fontSize: 14, fontWeight: "600" },

  button: {
    height: 62,
    borderRadius: 31,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 14,
  },

  buttonText: { fontSize: 18, fontWeight: "700" },

  linkWrap: { alignItems: "center", marginTop: 4 },
  linkLabel: { fontSize: 15 },
  linkBold: { fontWeight: "700" },
});
