import ExerciseOverviewComponent from "@/components/ExerciseComponents/ExerciseOverviewComponent";
import { Exercise, SequenceType } from "@/types/data";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import BButton from "@/assets/HomeAssets/b_arrow.png";
import bicepBlastArms from "@/assets/Photos/bicept_blast_[arms].jpg";
import buildYourBaseLegs from "@/assets/Photos/build_your_base_[legs].jpg";
import chestPowerChest from "@/assets/Photos/chest_power_[chest].jpg";
import chestStrengthChest from "@/assets/Photos/chest_strength_[chest].jpg";
import powerUpLegs from "@/assets/Photos/power_up_legs_[legs].jpg";
import tricepTonerArms from "@/assets/Photos/tricep_toner_[arms.jpg";
import { Ionicons } from "@expo/vector-icons";

import { ThemeContext, Theme } from "@/themes/ThemeContext";
import secondsToMinutes from "@/helpers/secondsToMinutes";

export default function ExerciseOverviewScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { theme } = useContext(ThemeContext);
  const [showSingleButton, setShowSingleButton] = useState(true);
  const [imageDetails, setImageDetails] = useState(null);
  const { exercise, mainIndex: test } = route.params;
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
    <View style={styles(theme).container}>
      {imageDetails && (
        <Image source={imageDetails!} style={styles(theme).image} />
      )}
      <View style={styles(theme).header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={25}
            color={theme.colors.text}
            style={styles(theme).buttonImage}
          />
        </TouchableOpacity>
        <Text style={styles(theme).headerText}>{exercise.name}</Text>
      </View>
      <View style={styles(theme).textContainer}>
        <Text style={styles(theme).text}>{exercise.difficulty}</Text>
        <Text style={styles(theme).text}>{exercise.equipment}</Text>
        <Text style={styles(theme).text}>
          {secondsToMinutes(exercise.duration)}
        </Text>
      </View>

      <View style={styles(theme).scrollView}>
        <ScrollView style={{ paddingBottom: 50 }}>
          {exercise.sequence.map((sequence: SequenceType, index: number) => (
            <View key={index}>
              <ExerciseOverviewComponent index={index} mainIndex={test} />
              <View style={styles(theme).line} />
            </View>
          ))}
        </ScrollView>
      </View>
      {showSingleButton ? (
        <TouchableOpacity
          style={styles(theme).button}
          onPress={() => {
            setShowSingleButton(false);
            navigation.navigate("Sequence", { exercise, test });
          }}
        >
          <Text style={styles(theme).buttonText}>START</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles(theme).button}
          onPress={() => {
            setShowSingleButton(false);
            navigation.navigate("Sequence", { exercise, test });
          }}
        >
          <Text style={styles(theme).buttonText}>RESTART</Text>
        </TouchableOpacity>
        //   <View style={styles(theme).buttonContainer}>
        //     <Button
        //       title="Restart"
        //       onPress={() => {
        //         navigation.navigate("Sequence", { exercise });
        //       }}
        //     />
        //     <Button
        //       title="Continue"
        //       onPress={() => {
        //         navigation.navigate("Sequence", { exercise });
        //       }}
        //     />
        //   </View>
      )}
    </View>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-evenly",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
      marginLeft: 20,
      marginTop: 60,
    },
    headerText: {
      fontSize: 30,
      marginLeft: 8,
      color: theme.colors.dark_purple,
      fontFamily: theme.fonts.bold,
    },
    textContainer: {
      marginBottom: 20,
      paddingLeft: 60,
    },
    text: {
      fontFamily: theme.fonts.regular,
      color: theme.colors.white,
      fontSize: 12,
      marginVertical: 1,
    },
    scrollView: {
      flex: 1,
      height: "100%",
      backgroundColor: theme.colors.background,
      borderTopRightRadius: 100,
      overflow: "hidden",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    buttonImage: {
      width: 20,
      height: 20,
    },
    image: {
      position: "absolute",
      width: "100%",
      height: 300,
      top: 0,
      left: 0,
      opacity: 0.7,
    },
    line: {
      width: "100%",
      borderBottomWidth: 1,
      borderColor: theme.colors.light_purple,
    },
    button: {
      backgroundColor: theme.colors.buttons,
      width: "90%",
      padding: 12,
      borderRadius: 30,
      position: "absolute", // Position the button absolutely
      bottom: 16, // Distance from the bottom of the screen
      alignSelf: "center", // Center the button horizontally
    },
    buttonText: {
      color: theme.colors.textOpposite,
      textAlign: "center",
      fontSize: 16,
      fontFamily: theme.fonts.bold,
    },
  });
