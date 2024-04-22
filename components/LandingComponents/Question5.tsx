import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PressableButton from "@/components/Buttons/PressableButton";
import PressableButtonLanding from "../Buttons/PressableButtonLanding";
import { FormData } from "@/screens/landing";

type QuestionProps = {
  nextQuestion: () => void;
  handleInputChange: (field: keyof FormData, value: string[]) => void;
};

export default function Question5({
  nextQuestion,
  handleInputChange,
}: QuestionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What are your target zones?</Text>

      <PressableButtonLanding
        handleInputChange={() => handleInputChange("target_zones", ["Arms"])}
        title={"Arms"}
      />
      <PressableButtonLanding
        handleInputChange={() => handleInputChange("target_zones", ["Chest"])}
        title={"Chest"}
      />
      <PressableButtonLanding
        handleInputChange={() => handleInputChange("target_zones", ["Legs"])}
        title={"Legs"}
      />
      <PressableButton
        onPress={() => {
          nextQuestion();
        }}
        title={"Continue"}
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
