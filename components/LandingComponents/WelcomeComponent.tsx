import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import PressableButton from "@/components/Buttons/PressableButton";
import { ThemeContext, Theme } from "@/themes/ThemeContext";

export default function WelcomeComponent({
  nextQuestion,
}: {
  nextQuestion: () => void;
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).title}>
        Wooo Let's start your fitness journey!
      </Text>
      <PressableButton
        onPress={() => {
          nextQuestion();
        }}
        title={"Continue"}
      />
    </View>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.transparent,
    },
    title: {
      fontFamily: theme.fonts.regular,
      color: theme.colors.white,
      fontSize: 32,
      margin: 20,
      padding: 20,
      textAlign: "center",
    },
    image: {
      width: "100%",
      objectFit: "cover",
    },
    subtitle: {
      fontFamily: theme.fonts.regular,
      color: theme.colors.white,
      fontSize: 12,
      margin: 10,
    },
    highlightedText: {
      fontFamily: theme.fonts.bold,
      color: theme.colors.light_purple, // Change to whatever color you want
      fontSize: 22,
    },
  });
