import { Exercise } from "@/types/data";
import { useNavigation } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { ThemeContext, Theme } from "@/themes/ThemeContext";
import secondsToMinutes from "@/helpers/secondsToMinutes";
import bicepBlastArms from "@/assets/Photos/bicept_blast_[arms].jpg";
import buildYourBaseLegs from "@/assets/Photos/build_your_base_[legs].jpg";
import chestPowerChest from "@/assets/Photos/chest_power_[chest].jpg";
import chestStrengthChest from "@/assets/Photos/chest_strength_[chest].jpg";
import powerUpLegs from "@/assets/Photos/power_up_legs_[legs].jpg";
import tricepTonerArms from "@/assets/Photos/tricep_toner_[arms.jpg";

export default function PressableExerciseComponent({
  exercise,
  navigation,
  mainIndex,
}: {
  exercise: Exercise;
  navigation: any;
  mainIndex: number;
}) {
  const [imageDetails, setImageDetails] = useState(null);
  const { theme } = useContext(ThemeContext);
  const handleNavigate = () => {
    navigation.navigate("ExerciseOverview", { exercise, mainIndex });
  };
  useEffect(() => {
    if (exercise.image_url == "1") {
      setImageDetails(bicepBlastArms);
    } else if (exercise.image_url == "2") {
      setImageDetails(tricepTonerArms);
    } else if (exercise.image_url == "3") {
      setImageDetails(chestStrengthChest);
    } else if (exercise.image_url == "4") {
      setImageDetails(chestPowerChest);
    } else if (exercise.image_url == "5") {
      setImageDetails(buildYourBaseLegs);
    } else if (exercise.image_url == "6") {
      setImageDetails(powerUpLegs);
    } else {
      setImageDetails(bicepBlastArms);
    }
  }, []);
  return (
    <Pressable onPress={handleNavigate} style={styles(theme).imageContainer}>
      {imageDetails && (
        <Image source={imageDetails!} style={styles(theme).image} />
      )}
      <View style={styles(theme).textContainer}>
        <Text style={styles(theme).title}>{exercise.name}</Text>
        <Text style={styles(theme).imageText}>{exercise.difficulty}</Text>
        <Text style={styles(theme).imageText}>{exercise.equipment}</Text>
        <Text style={styles(theme).imageText}>
          {secondsToMinutes(exercise.duration.toString())}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    imageContainer: {
      marginVertical: 10,
    },
    image: {
      resizeMode: "cover",
      width: "100%",
      height: 175,
    },
    textContainer: {
      position: "absolute",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      bottom: 20,
      right: 0,
      width: "40%",
      padding: 10,
    },
    imageText: {
      color: "white",
      fontSize: 12,
      fontFamily: theme.fonts.regular,
      left: 10,
    },
    title: {
      color: "white",
      fontSize: 18,
      fontFamily: theme.fonts.bold,
    },
  });
