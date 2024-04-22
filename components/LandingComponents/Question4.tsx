import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PressableButton from "@/components/Buttons/PressableButton";
import PressableButtonLanding from "../Buttons/PressableButtonLanding";
import { FormData } from "@/screens/landing";

type QuestionProps = {
  nextQuestion: () => void;
  handleInputChange: (field: keyof FormData, value: string[]) => void;
};

export default function Question4({
  nextQuestion,
  handleInputChange,
}: QuestionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        What are your biggest challenges to getting started with exercise?
      </Text>

      <PressableButtonLanding
        handleInputChange={() =>
          handleInputChange("challenges", ["Lack of Time"])
        }
        title={"Lack of Time"}
      />
      <PressableButtonLanding
        handleInputChange={() =>
          handleInputChange("challenges", ["Lack of Motivation"])
        }
        title={"Lack of Motivation"}
      />
      <PressableButtonLanding
        handleInputChange={() =>
          handleInputChange("challenges", ["Lack of Knowledge"])
        }
        title={"Lack of Knowledge"}
      />
      <PressableButtonLanding
        handleInputChange={() => handleInputChange("challenges", ["Boredom"])}
        title={"Boredom"}
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
