import { Stack } from "expo-router";
import { MealsProvider } from "../context/MealsContext";
import { ProfileProvider } from "../context/ProfileContext";
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <MealsProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </MealsProvider>
      </ProfileProvider>
    </ThemeProvider>
  );
}
