import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import PressableExerciseComponent from "@/components/ExerciseComponents/PressableExerciseComponent";
import { getUsers } from "@/helpers/userDataHelpers";
import { getExercises } from "@/helpers/exerciseDataHelpers";
import { Exercise } from "@/types/data";

import { ThemeContext, Theme } from "@/themes/ThemeContext";
export default function MainExerciseComponent({
  category,
  navigation,
}: {
  category: number;
  navigation: any;
}) {
  const { theme } = useContext(ThemeContext);
  const filterArray = ["None", "None", "Arms", "Chest", "Legs"];
  const [filter, setFilter] = useState(0);
  const [exerciseStorage, setExerciseStorage] = useState<Exercise[]>([]);
  useEffect(() => {
    const retrieve = async () => {
      const exercise: Exercise[] = await getExercises();
      const filteredExercise = exercise.filter(
        (exercise) => exercise.category === filterArray[category]
      );
      if (category === 1) {
        await setExerciseStorage(exercise);
      } else {
        await setExerciseStorage(filteredExercise);
      }
    };
    retrieve();
  }, []);
  return (
    <View style={styles(theme).container}>
      <ScrollView contentContainerStyle={styles(theme).scrollViewContent}>
        {exerciseStorage.map((exercise, index) => (
          <PressableExerciseComponent
            navigation={navigation}
            key={index}
            mainIndex={index}
            exercise={exercise}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
    },
    mainText: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    imagesContainer: {
      alignItems: "center",
    },
    imageContainer: {
      marginVertical: 10,
    },
    textContainer: {
      position: "absolute",
      bottom: 10,
      right: 10,
    },
    imageText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
      textShadowColor: "rgba(0, 0, 0, 0.75)",
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10,
    },
    scrollViewContent: {
      flexGrow: 1,
      paddingVertical: 16,
      width: "100%",
    },
  });
