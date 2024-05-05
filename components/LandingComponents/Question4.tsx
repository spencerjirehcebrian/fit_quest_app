import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import PressableButton from "@/components/Buttons/PressableButton";
import PressableButtonLanding from "../Buttons/PressableButtonLanding";
import { FormData } from "@/screens/landing";
import { ThemeContext, Theme } from "@/themes/ThemeContext";
import ProgressBar from "@/components/LandingComponents/ProgressBar";
const { height } = Dimensions.get("window");

type QuestionProps = {
  nextQuestion: () => void;
  handleInputChange: (field: keyof FormData, value: string[]) => void;
};

export default function Question4({
  nextQuestion,
  handleInputChange,
}: QuestionProps) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).progressBar}>
        <ProgressBar progress={3} />
      </View>

      <Text style={styles(theme).title}>
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
      textAlign: "center",
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
