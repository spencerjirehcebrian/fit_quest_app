import CustomHeader from "@/components/CustomHeader";
import MainExerciseComponent from "@/components/ExerciseComponents/MainExerciseComponent";
import { getUsers } from "@/helpers/userDataHelpers";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  Dimensions,
} from "react-native";
import { ThemeContext, Theme } from "@/themes/ThemeContext";
import Arms from "@/assets/Photos/arms_[categories].png";
import Legs from "@/assets/Photos/legs_[categories].png";
import Chest from "@/assets/Photos/chest_[categories].png";
const { width, height } = Dimensions.get("window");

export default function ExerciseScreen({ navigation }: { navigation: any }) {
  const [points, setPoints] = useState<number | undefined>(undefined);
  const { theme } = useContext(ThemeContext);
  const [buttonState, setButtonState] = useState(0); // Set the initial state to 0
  const [currentFilter, setCurrentFilter] = useState(0);

  const toggleButton = (index: any) => {
    setButtonState(index === buttonState ? null : index);
  };
  useEffect(() => {
    const retrieve = async () => {
      const { points } = await getUsers();
      setPoints(points);
    };
    retrieve();
  }, []);
  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).headerContainer}>
        <CustomHeader navigation={navigation} isMin={true} />
      </View>

      <View style={styles(theme).contentContainer}>
        <View style={styles(theme).topRow}>
          <Text style={styles(theme).topText}>Current point:</Text>
          <Text style={styles(theme).topText1}>{points} points</Text>
        </View>
        <View style={styles(theme).buttonContainer}>
          <Pressable
            style={[
              styles(theme).button,
              buttonState === 0 ? styles(theme).buttonToggled : null,
            ]}
            onPress={() => {
              toggleButton(0);
              setCurrentFilter(0);
            }}
          >
            <Text style={styles(theme).buttonText}>Categories</Text>
          </Pressable>
          <Pressable
            style={[
              styles(theme).button,
              buttonState === 1 ? styles(theme).buttonToggled : null,
            ]}
            onPress={() => {
              toggleButton(1);
              setCurrentFilter(1);
            }}
          >
            <Text style={styles(theme).buttonText}>Exercises</Text>
          </Pressable>
        </View>

        <View style={styles(theme).line} />
        {currentFilter == 0 && (
          <View style={styles(theme).verticalButtonContainer}>
            <Pressable
              onPress={() => setCurrentFilter(2)}
              style={styles(theme).buttonWrapper}
            >
              <ImageBackground
                source={Arms}
                resizeMode="cover"
                style={styles(theme).buttonImage}
              >
                <Text style={styles(theme).buttonText1}>Arms</Text>
              </ImageBackground>
            </Pressable>

            <Pressable
              onPress={() => setCurrentFilter(3)}
              style={styles(theme).buttonWrapper}
            >
              <ImageBackground
                source={Chest}
                resizeMode="cover"
                style={styles(theme).buttonImage}
              >
                <Text style={styles(theme).buttonText1}>Chest</Text>
              </ImageBackground>
            </Pressable>

            <Pressable
              onPress={() => setCurrentFilter(4)}
              style={styles(theme).buttonWrapper}
            >
              <ImageBackground
                source={Legs}
                resizeMode="cover"
                style={styles(theme).buttonImage}
              >
                <Text style={styles(theme).buttonText1}>Legs</Text>
              </ImageBackground>
            </Pressable>
          </View>
        )}
        {currentFilter == 1 && (
          <MainExerciseComponent category={1} navigation={navigation} />
        )}
        {currentFilter == 2 && (
          <MainExerciseComponent category={2} navigation={navigation} />
        )}
        {currentFilter == 3 && (
          <MainExerciseComponent category={3} navigation={navigation} />
        )}
        {currentFilter == 4 && (
          <MainExerciseComponent category={4} navigation={navigation} />
        )}
      </View>
    </View>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: "space-evenly",
    },
    headerContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
    },
    contentContainer: {
      flex: 1,
      alignItems: "center",
      marginTop: 110,
    },
    textContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    text: {
      fontSize: 18,
      marginHorizontal: 10,
    },
    buttonContainer: {
      flexDirection: "row",
      marginTop: 10,
      marginBottom: 20,
    },

    button: {
      backgroundColor: theme.colors.light_purple,
      paddingVertical: 6,
      paddingHorizontal: 40,
      borderRadius: 10,
      marginHorizontal: 2,
      justifyContent: "center",
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "bold",
    },
    buttonToggled: {
      backgroundColor: theme.colors.purple,
    },
    topRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 10,
      marginTop: 10,
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
      borderRadius: 8,
      padding: 5,
      paddingHorizontal: 20,
      fontSize: 14,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    line: {
      alignContent: "center",
      alignSelf: "center",
      width: "60%",
      opacity: 0.7,
      height: 0.5,
      backgroundColor: theme.colors.primary,
    },
    verticalButtonContainer: {
      marginTop: 20,
      width: "100%",
    },
    buttonWrapper: {
      marginVertical: 15,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    buttonImage: {
      borderRadius: 4,
      width: "100%",
      height: height * 0.15,
      justifyContent: "center",
    },
    buttonText1: {
      zIndex: 1,
      color: theme.colors.text,
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      textAlignVertical: "center",
    },
  });
