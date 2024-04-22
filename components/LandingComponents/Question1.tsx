import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PressableButton from "@/components/Buttons/PressableButton";
import PressableButtonLanding from "../Buttons/PressableButtonLanding";
import { FormData } from "@/screens/landing";

type QuestionProps = {
  nextQuestion: () => void;
  handleInputChange: (field: keyof FormData, value: string[]) => void;
};

export default function Question1({
  nextQuestion,
  handleInputChange,
}: QuestionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's start with your goals</Text>
      <PressableButton
        onPress={() => {
          nextQuestion();
        }}
        title={"Continue"}
      />
      <PressableButtonLanding
        handleInputChange={() => handleInputChange("goals", ["Lose Weight"])}
        title={"Lose Weight"}
      />
      <PressableButtonLanding
        handleInputChange={() => handleInputChange("goals", ["Build Muscles"])}
        title={"Build Muscles"}
      />
      <PressableButtonLanding
        handleInputChange={() => handleInputChange("goals", ["Modify My Diet"])}
        title={"Modify My Diet"}
      />
      <PressableButtonLanding
        handleInputChange={() => handleInputChange("goals", ["Reduce Stress"])}
        title={"Reduce Stress"}
      />
      {/* Add your screen content here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
