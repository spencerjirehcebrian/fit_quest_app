import React from "react";
import { View, Text, StyleSheet } from "react-native";

import PressableButton from "@/components/Buttons/PressableButton";
import PressableButtonLanding from "../Buttons/PressableButtonLanding";
import { FormData } from "@/screens/landing";
type QuestionProps = {
  nextQuestion: () => void;
  handleInputChange: (field: keyof FormData, value: string) => void;
};

export default function Question3({
  nextQuestion,
  handleInputChange,
}: QuestionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is your Fitness Level?</Text>
      <PressableButton
        onPress={() => {
          nextQuestion();
        }}
        title={"Continue"}
      />

      <PressableButtonLanding
        handleInputChange={() => handleInputChange("fitness_level", "Beginner")}
        title={"Beginner"}
      />
      <PressableButtonLanding
        handleInputChange={() =>
          handleInputChange("fitness_level", "Intermediate")
        }
        title={"Intermediate"}
      />
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
