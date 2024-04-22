import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PressableButton from "@/components/Buttons/PressableButton";
import PressableButtonLanding from "../Buttons/PressableButtonLanding";
import { FormData } from "@/screens/landing";

type QuestionProps = {
  nextQuestion: () => void;
  handleInputChange: (field: keyof FormData, value: string[]) => void;
};

export default function Question6({
  nextQuestion,
  handleInputChange,
}: QuestionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        What would help you stick with a regular exercise routine? (choose any
        that applies)
      </Text>

      <PressableButtonLanding
        handleInputChange={() =>
          handleInputChange("stick", ["Have a Workout buddy"])
        }
        title={"Have a Workout buddy"}
      />
      <PressableButtonLanding
        handleInputChange={() =>
          handleInputChange("stick", ["Setting Realistic Goals"])
        }
        title={"Setting Realistic Goals"}
      />
      <PressableButtonLanding
        handleInputChange={() =>
          handleInputChange("stick", ["Tracking your Progress"])
        }
        title={"Tracking your Progress"}
      />
      <PressableButtonLanding
        handleInputChange={() =>
          handleInputChange("stick", ["Having Accomplishments"])
        }
        title={"Having Accomplishments"}
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
