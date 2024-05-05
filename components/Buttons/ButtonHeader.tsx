import React, { useContext } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { ThemeContext, Theme } from "@/themes/ThemeContext";

const ButtonHeader = ({ onPress, title }: { onPress?: any; title: any }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles(theme).button,
        pressed ? styles(theme).pressed : null,
      ]}
    >
      <Text style={styles(theme).text}>{title}</Text>
    </Pressable>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 4,
      paddingHorizontal: 12,
      width: 120,
      borderRadius: 8,
      backgroundColor: "#D9D9D9",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    text: {
      fontFamily: theme.fonts.bold,
      fontSize: 12,
      lineHeight: 12,
      letterSpacing: 0.25,
      color: theme.colors.purple,
    },
    pressed: {
      backgroundColor: theme.colors.dark_purple,
    },
  });

export default ButtonHeader;
