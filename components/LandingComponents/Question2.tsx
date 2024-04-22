import React from "react";
import { View, Text, StyleSheet } from "react-native";

import PressableButton from "@/components/Buttons/PressableButton";
import PressableButtonLanding from "../Buttons/PressableButtonLanding";
import { FormData } from "@/screens/landing";

type QuestionProps = {
  nextQuestion: () => void;
  handleInputChange: (field: keyof FormData, value: string) => void;
};

export default function Question2({
  nextQuestion,
  handleInputChange,
}: QuestionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How much time do you walk daily?</Text>
      <PressableButton
        onPress={() => {
          nextQuestion();
        }}
        title={"Continue"}
      />
      <PressableButtonLanding
        handleInputChange={() =>
          handleInputChange("daily_walk", "Less than 30 minutes")
        }
        title={"Less than 30 minutes"}
      />
      <PressableButtonLanding
        handleInputChange={() =>
          handleInputChange("daily_walk", "30 - 60 minute")
        }
        title={"30 - 60 minutes"}
      />
      <PressableButtonLanding
        handleInputChange={() =>
          handleInputChange("daily_walk", "2 hours or more")
        }
        title={"2 hours or more"}
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
