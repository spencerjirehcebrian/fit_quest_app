import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";

interface ButtonProps {
  text: string;
  handleButtonPress: (value: string) => void;
  selectedButton: string | null;
}
const ButtonMealDay = (props: ButtonProps) => {
  const isSelected = props.selectedButton === props.text;
  const buttonStyle = [
    styles.buttonContainer,
    isSelected && styles.selectedButtonContainer,
  ];
  const textStyle = [styles.button, isSelected && styles.selectedButtonText];

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
const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: "#fff",
  },
  selectedButtonContainer: {
    backgroundColor: "#007AFF",
  },
  button: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  selectedButtonText: {
    color: "#fff",
  },
});

export default ButtonMealDay;
