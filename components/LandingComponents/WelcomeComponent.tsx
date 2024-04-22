import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PressableButton from "@/components/Buttons/PressableButton";

export default function WelcomeComponent({
  nextQuestion,
}: {
  nextQuestion: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wooo Let's start your fitness journey!</Text>
      <PressableButton
        onPress={() => {
          nextQuestion();
        }}
        title={"Continue"}
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
