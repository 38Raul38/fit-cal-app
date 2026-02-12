import React, { createContext, useContext, useState } from "react";

export const lightTheme = {
  bg: "#FFFFFF",
  card: "#F7F7F9",
  cardAlt: "#EDEDF0",
  text: "#0F0F12",
  textSecondary: "#6B6B70",
  textMuted: "#A0A0A5",
  accent: "#E87B35",
  accentBlue: "#4A90D9",
  border: "#E8E8EC",
  borderLight: "#D8D8DC",
  tabBar: "#FFFFFF",
  tabActive: "#0F0F12",
  tabInactive: "#A0A0A5",
  switchTrack: "#D0D0D5",
  switchTrackActive: "#0F0F12",
  inputBg: "#F7F7F9",
  inputBorder: "#E5E5EA",
  danger: "#E04040",
  black: "#0F0F12",
  white: "#FFFFFF",
};

export const darkTheme = {
  bg: "#0F0F12",
  card: "#1C1C1E",
  cardAlt: "#2C2C2E",
  text: "#F5F5F7",
  textSecondary: "#A0A0A5",
  textMuted: "#6B6B70",
  accent: "#E87B35",
  accentBlue: "#5AA3E8",
  border: "#2C2C2E",
  borderLight: "#3A3A3C",
  tabBar: "#1C1C1E",
  tabActive: "#F5F5F7",
  tabInactive: "#6B6B70",
  switchTrack: "#3A3A3C",
  switchTrackActive: "#E87B35",
  inputBg: "#1C1C1E",
  inputBorder: "#3A3A3C",
  danger: "#FF6B6B",
  black: "#0F0F12",
  white: "#FFFFFF",
};

export type ThemeColors = typeof lightTheme;

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
  colors: lightTheme,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const colors = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
