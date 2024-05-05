import { FormData } from "@/screens/landing";
import React, { useContext, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemeContext, Theme } from "@/themes/ThemeContext";

interface PressableButtonLandingProps {
  handleInputChange: () => void;
  title: string;
  state?: boolean;
}

const PressableButtonLanding = (props: PressableButtonLandingProps) => {
  const [isPressed, setIsPressed] = useState(props.state || false);
  const { theme } = useContext(ThemeContext);

  const handlePress = () => {
    setIsPressed((prevState) => !prevState);
    props.handleInputChange();
  };

  return (
    <TouchableOpacity
      onPress={() => {
        handlePress();
      }}
      style={[
        styles(theme).button,
        isPressed ? styles(theme).pressed : styles(theme).notPressed,
      ]}
    >
      <Text style={styles(theme).text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      paddingVertical: 12,
      borderRadius: 14,
      margin: 10,
      width: 220,
      textAlign: "center",
    },
    notPressed: {
      backgroundColor: theme.colors.transparent,
      borderColor: theme.colors.white,
      borderWidth: 1.5,
    },
    pressed: {
      backgroundColor: theme.colors.purple,
      borderColor: theme.colors.purple,
      borderWidth: 1.5,
    },
    text: {
      textAlign: "center",
      letterSpacing: 1,
      color: "white",
      fontSize: 14,
      fontFamily: theme.fonts.regular,
    },
  });
export default PressableButtonLanding;
