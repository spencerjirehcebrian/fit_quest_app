import React, { useContext } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { ThemeContext, Theme } from "@/themes/ThemeContext";

const PressableButton = ({ onPress, title }: { onPress: any; title: any }) => {
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
      paddingVertical: 8,
      paddingHorizontal: 48,
      borderRadius: 30,
      backgroundColor: theme.colors.primary,
    },
    text: {
      fontFamily: theme.fonts.bold,
      fontSize: 16,
      lineHeight: 21,
      letterSpacing: 0.25,
      color: "white",
    },
    pressed: {
      backgroundColor: theme.colors.secondary,
    },
  });

export default PressableButton;
