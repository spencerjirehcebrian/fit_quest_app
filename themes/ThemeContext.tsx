import React, { createContext } from "react";
import { lightTheme, darkTheme } from "@/themes/themes";

export type Theme = typeof lightTheme;

interface ThemeContextData {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextData>({
  theme: lightTheme,
  toggleTheme: () => {},
});
