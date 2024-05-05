import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import PressableButton from "@/components/Buttons/PressableButton";
import PressableButtonLanding from "../Buttons/PressableButtonLanding";
import { FormData } from "@/screens/landing";
import { ThemeContext, Theme } from "@/themes/ThemeContext";
const { height } = Dimensions.get("window");
import ProgressBar from "@/components/LandingComponents/ProgressBar";

type QuestionProps = {
  nextQuestion: () => void;
  handleInputChange: (field: keyof FormData, value: string) => void;
};

export default function Question2({
  nextQuestion,
  handleInputChange,
}: QuestionProps) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).progressBar}>
        <ProgressBar progress={1} />
      </View>
      <Text style={styles(theme).title}>How much time do you walk daily?</Text>
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
      <View style={styles(theme).buttonContinue}>
        <PressableButton
          onPress={() => {
            nextQuestion();
          }}
          title={"Continue"}
        />
      </View>
    </View>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.transparent,
    },
    title: {
      color: theme.colors.white,
      fontSize: 18,
      marginBottom: 20,
      fontFamily: theme.fonts.regular,
    },
    buttonContinue: {
      alignSelf: "stretch", // Take the full width of the container
      height: "40%",
      justifyContent: "flex-end",
      alignContent: "flex-end",
      alignItems: "center",
      position: "absolute",
      bottom: height * 0.1,
      left: 0,
      right: 0,
    },
    progressBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: height * 0.1,
      left: 0,
      right: 0,
    },
  });
