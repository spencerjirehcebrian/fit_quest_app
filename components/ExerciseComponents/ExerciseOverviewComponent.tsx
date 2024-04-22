import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { SequenceType } from "@/types/data";

export default function ExerciseOverviewComponent({
  step,
  navigation,
  image,
}: {
  step: SequenceType;
  navigation: any;
  image: string;
}) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://placehold.co/400" }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{step.name}</Text>
        <Text style={styles.text}>{step.duration}</Text>
        <Text style={styles.text}>{step.targets}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 200, // Adjust the height as needed
  },
  image: {
    width: "25%", // 1/4 of the screen width
    height: "100%", // Match the height of the container
    resizeMode: "cover", // Adjust the resizeMode as needed
  },
  textContainer: {
    flex: 1, // Take up the remaining space
    justifyContent: "center", // Center the text vertically
    paddingLeft: 16, // Add some spacing from the image
  },
  text: {
    fontSize: 16,
    marginBottom: 8, // Add some spacing between the text lines
  },
});
