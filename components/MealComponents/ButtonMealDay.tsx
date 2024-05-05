import { Pressable, StyleSheet, Text } from "react-native";
import React, { useContext } from "react";
import { ThemeContext, Theme } from "@/themes/ThemeContext";

interface ButtonProps {
  text: string;
  handleButtonPress: (value: string) => void;
  selectedButton: string | null;
}
const ButtonMealDay = (props: ButtonProps) => {
  const { theme } = useContext(ThemeContext);
  const isSelected = props.selectedButton === props.text;
  const buttonStyle = [
    styles(theme).buttonContainer,
    isSelected && styles(theme).selectedButtonContainer,
  ];
  const textStyle = [
    styles(theme).button,
    isSelected && styles(theme).selectedButtonText,
  ];

  return (
    <Pressable
      style={buttonStyle}
      onPress={() => props.handleButtonPress(props.text)}
      android_ripple={{ color: "#ccc" }}
    >
      <Text style={textStyle}>{props.text}</Text>
    </Pressable>
  );
};
const styles = (theme: Theme) =>
  StyleSheet.create({
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonContainer: {
      width: 35,
      height: 35,
      borderRadius: 50,
      marginHorizontal: 2,
      backgroundColor: theme.colors.transparent,
      justifyContent: "center",
      alignItems: "center",
    },
    selectedButtonContainer: {
      backgroundColor: theme.colors.purple,
    },
    button: {
      fontFamily: theme.fonts.bold,
      fontSize: 12,
      color: theme.colors.text,
    },
    selectedButtonText: {
      color: theme.colors.white,
    },
  });

export default ButtonMealDay;
