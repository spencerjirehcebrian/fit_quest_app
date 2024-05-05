import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext, Theme } from "@/themes/ThemeContext";
import { lightTheme, darkTheme } from "@/themes/themes";
import { getGlobals, updateGlobals } from "@/helpers/globalsDataHelpers";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const globals = await getGlobals();
        const { dark_mode } = globals;
        // setCurrentTheme(dark_mode! === true ? darkTheme : lightTheme);
        console.log(dark_mode);
        setCurrentTheme(dark_mode === true ? darkTheme : lightTheme);
      } catch (error) {
        console.error("Error loading theme from AsyncStorage:", error);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const isDarkMode = currentTheme === lightTheme;
      await updateGlobals({ dark_mode: isDarkMode });

      setCurrentTheme(isDarkMode ? darkTheme : lightTheme);
    } catch (error) {
      console.error("Error toggling theme:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
