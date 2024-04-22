import { FormData } from "@/screens/landing";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface PressableButtonLandingProps {
  handleInputChange: () => void;
  title: string;
  state?: boolean;
}

const PressableButtonLanding = (props: PressableButtonLandingProps) => {
  const [isPressed, setIsPressed] = useState(props.state || false);

  const handlePress = () => {
    setIsPressed((prevState) => !prevState);
    props.handleInputChange();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          handlePress();
        }}
        style={[styles.button, isPressed ? styles.pressed : styles.notPressed]}
      >
        <Text style={styles.text}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  notPressed: {
    backgroundColor: "#007AFF",
  },
  pressed: {
    backgroundColor: "#0056b3",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default PressableButtonLanding;
