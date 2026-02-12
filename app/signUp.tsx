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

/* ───── regex rules ───── */
const EMAIL_RE = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;
const PWD_MIN_LENGTH = 8;
const PWD_UPPERCASE = /[A-Z]/;
const PWD_LOWERCASE = /[a-z]/;
const PWD_DIGIT = /\d/;
const PWD_SPECIAL = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

/* ───── helpers ───── */
function validateEmail(v: string) {
  if (!v) return "Email is required";
  if (!EMAIL_RE.test(v)) return "Invalid email format";
  return "";
}

function validatePassword(v: string) {
  if (!v) return "Password is required";
  if (v.length < PWD_MIN_LENGTH) return `At least ${PWD_MIN_LENGTH} characters`;
  if (!PWD_UPPERCASE.test(v)) return "Add an uppercase letter";
  if (!PWD_LOWERCASE.test(v)) return "Add a lowercase letter";
  if (!PWD_DIGIT.test(v)) return "Add a digit";
  if (!PWD_SPECIAL.test(v)) return "Add a special character (!@#$…)";
  return "";
}

type PwdRule = { label: string; test: (v: string) => boolean };
const pwdRules: PwdRule[] = [
  { label: `${PWD_MIN_LENGTH}+ characters`, test: (v) => v.length >= PWD_MIN_LENGTH },
  { label: "Uppercase letter", test: (v) => PWD_UPPERCASE.test(v) },
  { label: "Lowercase letter", test: (v) => PWD_LOWERCASE.test(v) },
  { label: "Digit", test: (v) => PWD_DIGIT.test(v) },
  { label: "Special character", test: (v) => PWD_SPECIAL.test(v) },
];

/* ═══════════════════════════════════════════ */
export default function SignUp() {
  const router = useRouter();
  const { colors } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [securePass, setSecurePass] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [loading, setLoading] = useState(false);

  /* touched flags — show errors only after user interacted */
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirm: false,
  });

  const touch = (field: keyof typeof touched) =>
    setTouched((p) => ({ ...p, [field]: true }));

  /* derived errors */
  const nameErr = touched.name && !name.trim() ? "Name is required" : "";
  const emailErr = touched.email ? validateEmail(email) : "";
  const passErr = touched.password ? validatePassword(password) : "";
  const confirmErr =
    touched.confirm && password !== confirm ? "Passwords don't match" : "";

  const formValid =
    name.trim() !== "" &&
    !validateEmail(email) &&
    !validatePassword(password) &&
    password === confirm;

  const handleSignUp = useCallback(async () => {
    setTouched({ name: true, email: true, password: true, confirm: true });
    if (!formValid) return;
    setLoading(true);
    // TODO: real API call
    setTimeout(() => {
      setLoading(false);
      router.replace("/goals");
    }, 1200);
  }, [formValid, router]);

  /* ─── UI ─── */
  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.bg }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* back */}
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={[styles.backText, { color: colors.text }]}>← Back</Text>
        </Pressable>

        <Text style={[styles.title, { color: colors.text }]}>Create account</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Sign up to start tracking your nutrition
        </Text>

        {/* ─── Name ─── */}
        <Text style={[styles.label, { color: colors.textSecondary }]}>Name</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.inputBg,
              borderColor: nameErr ? colors.danger : colors.inputBorder,
              color: colors.text,
            },
          ]}
          placeholder="John Doe"
          placeholderTextColor={colors.textMuted}
          value={name}
          onChangeText={setName}
          onBlur={() => touch("name")}
          autoCapitalize="words"
        />
        {!!nameErr && <Text style={[styles.err, { color: colors.danger }]}>{nameErr}</Text>}

        {/* ─── Email ─── */}
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
        {!!emailErr && <Text style={[styles.err, { color: colors.danger }]}>{emailErr}</Text>}

        {/* ─── Password ─── */}
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
            autoComplete="new-password"
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
        {!!passErr && <Text style={[styles.err, { color: colors.danger }]}>{passErr}</Text>}

        {/* password strength checklist */}
        {touched.password && (
          <View style={styles.rulesList}>
            {pwdRules.map((r) => {
              const ok = r.test(password);
              return (
                <Text
                  key={r.label}
                  style={[
                    styles.ruleItem,
                    { color: ok ? "#34C759" : colors.textMuted },
                  ]}
                >
                  {ok ? "✓" : "○"} {r.label}
                </Text>
              );
            })}
          </View>
        )}

        {/* ─── Confirm password ─── */}
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          Confirm password
        </Text>
        <View style={styles.passRow}>
          <TextInput
            style={[
              styles.input,
              styles.passInput,
              {
                backgroundColor: colors.inputBg,
                borderColor: confirmErr ? colors.danger : colors.inputBorder,
                color: colors.text,
              },
            ]}
            placeholder="••••••••"
            placeholderTextColor={colors.textMuted}
            value={confirm}
            onChangeText={setConfirm}
            onBlur={() => touch("confirm")}
            secureTextEntry={secureConfirm}
            autoComplete="new-password"
          />
          <Pressable
            style={styles.eyeBtn}
            onPress={() => setSecureConfirm((p) => !p)}
          >
            <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
              {secureConfirm ? "Show" : "Hide"}
            </Text>
          </Pressable>
        </View>
        {!!confirmErr && (
          <Text style={[styles.err, { color: colors.danger }]}>{confirmErr}</Text>
        )}

        {/* ─── Submit ─── */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: formValid ? colors.black : colors.cardAlt,
            },
            pressed && formValid && { opacity: 0.85 },
          ]}
          onPress={handleSignUp}
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
              Create account
            </Text>
          )}
        </Pressable>

        {/* ─── Link to Sign In ─── */}
        <Pressable onPress={() => router.push("/signIn")} style={styles.linkWrap}>
          <Text style={[styles.linkLabel, { color: colors.textSecondary }]}>
            Already have an account?{" "}
            <Text style={[styles.linkBold, { color: colors.text }]}>Sign in</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* ═══════════ styles ═══════════ */
const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
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

  rulesList: { marginBottom: 12, marginLeft: 4, marginTop: 4 },
  ruleItem: { fontSize: 13, marginBottom: 3 },

  button: {
    height: 62,
    borderRadius: 31,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 14,
  },

  buttonText: { fontSize: 18, fontWeight: "700" },

  linkWrap: { alignItems: "center", marginTop: 4 },
  linkLabel: { fontSize: 15 },
  linkBold: { fontWeight: "700" },
});