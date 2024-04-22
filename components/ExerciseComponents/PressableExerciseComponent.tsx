import { Exercise } from "@/types/data";
import { useNavigation } from "expo-router";
import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";

export default function PressableExerciseComponent({
  exercise,
  navigation,
}: {
  exercise: Exercise;
  navigation: any;
}) {
  const handleNavigate = () => {
    navigation.navigate("ExerciseOverview", { exercise });
    console.log(exercise);
  };
  return (
    <Pressable onPress={handleNavigate} style={styles.imageContainer}>
      <Image
        source={{ uri: "https://placehold.co/400" }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.imageText}>{exercise.name}</Text>
        <Text style={styles.imageText}>{exercise.difficulty}</Text>
        <Text style={styles.imageText}>{exercise.equipment}</Text>
        <Text style={styles.imageText}>{exercise.duration}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    marginVertical: 10,
  },
  image: {
    width: 300,
    height: 200,
  },
  textContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  imageText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
