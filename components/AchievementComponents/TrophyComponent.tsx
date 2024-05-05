import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import calorieCrusher from "@/assets/AchievementAssets/Trophies/calorie_crusher.png";
import calorieCrusherNh from "@/assets/AchievementAssets/Trophies/calorie_crusher_nh.png";
import healthyFoodNh from "@/assets/AchievementAssets/Trophies/healthy_foodie_nh.png";
import healthyFoodie from "@/assets/AchievementAssets/Trophies/healthy_foodie.png";
import progressChamp from "@/assets/AchievementAssets/Trophies/progress_champ.png";
import progressChampNh from "@/assets/AchievementAssets/Trophies/progress_champ_nh.png";
import stepChamp from "@/assets/AchievementAssets/Trophies/step_champ.png";
import stepChampNh from "@/assets/AchievementAssets/Trophies/step_champ_nh.png";
import streakStar from "@/assets/AchievementAssets/Trophies/streak_star.png";
import streakStarNh from "@/assets/AchievementAssets/Trophies/streak_star_nh.png";
import workoutWarrior from "@/assets/AchievementAssets/Trophies/workout_warrior.png";
import workoutWarriorNh from "@/assets/AchievementAssets/Trophies/workout_warrior_nh.png";
import sleepSensei from "@/assets/AchievementAssets/Trophies/sleep_sensei.png";
import sleepSenseiNh from "@/assets/AchievementAssets/Trophies/sleep_sensei_nh.png";
import { getUsers } from "@/helpers/userDataHelpers";
import { Achievement } from "@/types/data";
import BButton from "@/assets/HomeAssets/b_arrow.png";
const { width, height } = Dimensions.get("window");
import { ThemeContext, Theme } from "@/themes/ThemeContext";

export default function TrophyComponent({
  tabSelect,
}: {
  tabSelect: () => void;
}) {
  const [pointsDisplay, setPointsDisplay] = useState<number>(0);
  useEffect(() => {
    const retrieve = async () => {
      const { points } = await getUsers();
      setPointsDisplay(points!);
    };
    retrieve();
  }, []);
  const { theme } = useContext(ThemeContext);
  const [achievementArray, setAchievementArray] = useState<Achievement>();
  useEffect(() => {
    const retrieve = async () => {
      const { achievements } = await getUsers();
      setAchievementArray(achievements);
      console.log(achievements);
    };
    retrieve();
  }, []);
  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).topRow}>
        <Text style={styles(theme).topText}>Current point:</Text>
        <Text style={styles(theme).topText1}>{pointsDisplay} points</Text>
      </View>
      <ScrollView style={styles(theme).scrollView}>
        <View style={styles(theme).leftAlignedImage} />
        <View style={styles(theme).imageRow}>
          <View style={styles(theme).imageRowView}>
            <Image
              source={achievementArray?.step_champ ? stepChamp : stepChampNh}
              style={styles(theme).imageRowItem}
            />
            <Text style={styles(theme).imageTextView}>Step Champ</Text>
          </View>

          <View style={styles(theme).imageRowView}>
            <Image
              source={
                achievementArray?.progress_champ
                  ? progressChamp
                  : progressChampNh
              }
              style={styles(theme).imageRowItem}
            />
            <Text style={styles(theme).imageTextView}>Progress Champ</Text>
          </View>
        </View>
        <View style={styles(theme).imageRow}>
          <View style={styles(theme).imageRowView}>
            <Image
              source={achievementArray?.streak_star ? streakStar : streakStarNh}
              style={styles(theme).imageRowItem}
            />
            <Text style={styles(theme).imageTextView}>Streak Star</Text>
          </View>
          <View style={styles(theme).imageRowView}></View>
          <Image style={styles(theme).imageRowItem} />
        </View>
        <View style={styles(theme).leftAlignedImage1} />
        <View style={styles(theme).imageRow}>
          <View style={styles(theme).imageRowView}>
            <Image
              source={
                achievementArray?.health_foodie ? healthyFoodie : healthyFoodNh
              }
              style={styles(theme).imageRowItem}
            />

            <Text style={styles(theme).imageTextView}>Healthy Foodie</Text>
          </View>
          <View style={styles(theme).imageRowView}>
            <Image
              source={
                achievementArray?.calorie_crusher
                  ? calorieCrusher
                  : calorieCrusherNh
              }
              style={styles(theme).imageRowItem}
            />
            <Text style={styles(theme).imageTextView}>Calorie Crusher</Text>
          </View>
        </View>
        <View style={styles(theme).leftAlignedImage2} />
        <View style={styles(theme).imageRow}>
          <View style={styles(theme).imageRowView}>
            <Image
              source={
                achievementArray?.sleep_sensei ? sleepSensei : sleepSenseiNh
              }
              style={styles(theme).imageRowItem}
            />
            <Text style={styles(theme).imageTextView}>Sleep Sensei</Text>
          </View>
          <View style={styles(theme).imageRowView}>
            <Image
              source={
                achievementArray?.workout_warrior
                  ? workoutWarrior
                  : workoutWarriorNh
              }
              style={styles(theme).imageRowItem}
            />
            <Text style={styles(theme).imageTextView}>Workout Warrior</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles(theme).navButton} onPress={tabSelect}>
        <Ionicons
          name="chevron-back"
          size={37}
          color={theme.colors.text}
          style={styles(theme).NButtonImage}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      width: "100%",
      height: "100%",
      alignItems: "center",
      marginBottom: 30,
      // justifyContent: "space-around",
    },
    topRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 10,
      marginTop: -10,
    },
    topText: {
      fontFamily: theme.fonts.bold,
      color: theme.colors.text,
      fontSize: 14,
      justifyContent: "center",
      alignContent: "center",
      marginHorizontal: 10,
      paddingTop: 5,
    },
    topText1: {
      fontFamily: theme.fonts.bold,
      justifyContent: "center",
      color: theme.colors.dark_purple,
      backgroundColor: "#D9D9D9",
      borderRadius: 5,
      padding: 5,
      paddingHorizontal: 15,
      fontSize: 16,
    },
    leftAlignedImage: {
      width: 35,
      height: 15,
      left: 70,
      backgroundColor: theme.colors.light_purple,
      borderRadius: 10,
      marginVertical: 10,
      alignSelf: "flex-start",
    },
    leftAlignedImage1: {
      width: 35,
      height: 15,
      left: 70,
      backgroundColor: theme.colors.purple,
      borderRadius: 10,
      marginVertical: 10,
      alignSelf: "flex-start",
    },
    leftAlignedImage2: {
      width: 35,
      height: 15,
      left: 70,
      backgroundColor: theme.colors.dark_purple,
      borderRadius: 10,
      marginVertical: 10,
      alignSelf: "flex-start",
    },
    imageRow: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginVertical: 0,
    },
    imageRowView: {
      marginHorizontal: 20,
      marginBottom: 10,
    },
    imageTextView: {
      fontFamily: theme.fonts.bold,
      fontSize: 12,
      color: theme.colors.text,
      textAlign: "center",
      paddingTop: 5,
    },
    imageRowItem: {
      width: height * 0.18,
      height: height * 0.18,
      resizeMode: "contain",
    },
    navButton: {
      position: "absolute",
      left: 0,
      bottom: "50%",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
    },
    BButtonImage: {
      width: 30,
      height: 30,
      resizeMode: "contain",
    },
    NButtonImage: {
      width: 30,
      height: 30,
      resizeMode: "contain",
    },
    scrollView: {
      flex: 1,
      height: "100%",
      width: "100%",
      paddingHorizontal: 20,
      backgroundColor: theme.colors.background,
    },
  });
