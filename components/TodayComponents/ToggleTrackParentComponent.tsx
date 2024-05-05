import React, { useContext, useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import ToggleTrackChildComponent from "@/components/TodayComponents/ToggleTrackChildComponent";
import { getGlobals, updateGlobals } from "@/helpers/globalsDataHelpers";
import { Globals } from "@/types/data";
import { ThemeContext, Theme } from "@/themes/ThemeContext";
import caloriesBurned from "@/assets/HomeAssets/calories_burned.png";
import fitnessStreak from "@/assets/HomeAssets/fitness_streak.png";
import medication from "@/assets/HomeAssets/medication.png";
import minutes from "@/assets/HomeAssets/minutes.png";
import period from "@/assets/HomeAssets/period.png";
import reminder from "@/assets/HomeAssets/reminder.png";
import sleepingTime from "@/assets/HomeAssets/sleeping_time.png";
import steps from "@/assets/HomeAssets/steps.png";
import stressLevels from "@/assets/HomeAssets/stress_levels.png";
import waterIntake from "@/assets/HomeAssets/water_intake.png";
import weightTrack from "@/assets/HomeAssets/weight_track.png";

const globalProperties: (keyof Globals)[] = [
  "show_steps",
  "show_minutes",
  "show_calories",
  "show_sleep",
  "show_stress",
  "show_water",
  "show_period",
  "show_weight",
  "show_medication",
  "show_reminder",
  "show_fitness_streak",
];
const titles = [
  ["Steps", steps],
  ["Minutes", minutes],
  ["Calories Burned", caloriesBurned],
  ["Sleep Time", sleepingTime],
  ["Stress Level", stressLevels],
  ["Water Intake", waterIntake],
  ["Period", period],
  ["Weight Track", weightTrack],
  ["Medication", medication],
  ["Reminder", reminder],
  ["Fitness Streak", fitnessStreak],
];
export default function ParentComponent() {
  const { theme } = useContext(ThemeContext);
  const [toggleStates, setToggleStates] = useState(new Array(11).fill(false));

  useEffect(() => {
    const retrieve = async () => {
      const global = await getGlobals();
      const newState = [...toggleStates];
      globalProperties.forEach((property, index) => {
        if (global[property]) {
          newState[index] = true;
        }
      });
      setToggleStates(newState);
    };
    retrieve();
  }, []);

  const handleToggle = (index: number) => {
    setToggleStates((prevStates) => {
      const newState = [...prevStates];
      newState[index] = !newState[index];
      return newState;
    });
    updateGlobals({ [globalProperties[index]]: !toggleStates[index] });
  };

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).text}>Track Tabs</Text>
      {Array(3)
        .fill(0)
        .map((_, rowIndex) => (
          <View style={styles(theme).row} key={rowIndex}>
            {Array(4)
              .fill(0)
              .map((_, colIndex) => {
                const index = colIndex + rowIndex * 4;
                if (index === 11) {
                  return null; // Skip rendering for index 11
                }
                return (
                  <ToggleTrackChildComponent
                    key={index}
                    index={index}
                    toggleState={toggleStates[index]}
                    onToggle={handleToggle}
                    image={titles[index][1]}
                    title={titles[index][0]}
                  />
                );
              })}
          </View>
        ))}
    </View>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    row: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 100,
    },
    text: {
      fontSize: 30,
      fontFamily: theme.fonts.bold,
      color: theme.colors.white,
      alignContent: "center",
      alignSelf: "center",
      justifyContent: "center",
      textAlign: "center",
      marginHorizontal: 50,
      marginTop: 30,
      width: "100%",
      height: 50,
    },
  });
