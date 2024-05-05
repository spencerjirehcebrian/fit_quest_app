import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  ImageBackground,
} from "react-native";
import PressableButton from "@/components/Buttons/PressableButton";
import LandingComponent from "@/components/LandingComponents/LandingComponent";
import WelcomeComponent from "@/components/LandingComponents/WelcomeComponent";
import Question1 from "@/components/LandingComponents/Question1";
import Question2 from "@/components/LandingComponents/Question2";
import Question3 from "@/components/LandingComponents/Question3";
import Question4 from "@/components/LandingComponents/Question4";
import Question5 from "@/components/LandingComponents/Question5";
import Question6 from "@/components/LandingComponents/Question6";
import Question7 from "@/components/LandingComponents/Question7";
import { updateUser } from "@/helpers/userDataHelpers";
import { Globals, User } from "@/types/data";
import { getGlobalsLogged, updateGlobals } from "@/helpers/globalsDataHelpers";
import { ThemeContext, Theme } from "@/themes/ThemeContext";
import BackgroundImage from "@/assets/LandingAssets/bg.png"; // Path to your background image

export interface FormData {
  username: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  goals: string[];
  daily_walk: string;
  fitness_level: string;
  challenges: string[];
  target_zones: string[];
  stick: string[];
}

export default function LandingScreen({ navigation }: any) {
  const { theme } = useContext(ThemeContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    console.log(currentQuestion);
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        // Prevent the back button from navigating back
        return true;
      }
    );
    const check = async () => {
      const isLoggedIn = await getGlobalsLogged();
      console.log(isLoggedIn);
      if (!isLoggedIn) {
        navigation.navigate("Landing");
      }
    };
    // check();
    return () => backHandler.remove();
  }, []);

  const [formData, setFormData] = useState<FormData>({
    username: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    goals: [],
    daily_walk: "",
    fitness_level: "",
    challenges: [],
    target_zones: [],
    stick: [],
  });
  // const [isLoggedIn, setIsLoggedIn] = useState<Globals>({
  //   isLoggedIn: false,
  // });

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const handleInputChange = (
    field: keyof FormData,
    value: string | number | string[]
  ) => {
    setFormData((prevState) => {
      const currentValue = prevState[field];

      // Convert value to string if it's not already a string
      const strValue = Array.isArray(value)
        ? value.join(",")
        : value.toString();

      // Check if the value is already in the array
      if (Array.isArray(currentValue)) {
        const valueIndex = currentValue.indexOf(strValue);
        if (valueIndex !== -1) {
          // If value is already in array, remove it
          // console.log("remove array");
          return {
            ...prevState,
            [field]: [
              ...currentValue.slice(0, valueIndex),
              ...currentValue.slice(valueIndex + 1),
            ],
          };
        } else {
          // If value is not in array, add it
          // console.log("add array");
          return {
            ...prevState,
            [field]: [...currentValue, strValue],
          };
        }
      } else {
        // If current value is not an array, set it as an array with the new value
        // console.log("new non array");
        return {
          ...prevState,
          [field]: value,
        };
      }
    });
    // console.log(field, value);
  };

  const handleSubmit = async () => {
    // console.log("Form Data:", formData);
    await updateUser(formData);
    // setIsLoggedIn({ isLoggedIn: true });
    await updateGlobals({ isLoggedIn: true });
    navigation.replace("Home");
  };

  return (
    <ImageBackground source={BackgroundImage} style={styles(theme).background}>
      <View style={styles(theme).container}>
        {currentQuestion === 0 && (
          <LandingComponent nextQuestion={nextQuestion} />
        )}
        {currentQuestion === 1 && (
          <Question1
            handleInputChange={(field, value) =>
              handleInputChange(field, value)
            }
            nextQuestion={nextQuestion}
          />
        )}
        {currentQuestion === 2 && (
          <Question2
            handleInputChange={(field, value) =>
              handleInputChange(field, value)
            }
            nextQuestion={nextQuestion}
          />
        )}
        {currentQuestion === 3 && (
          <Question3
            handleInputChange={(field, value) =>
              handleInputChange(field, value)
            }
            nextQuestion={nextQuestion}
          />
        )}
        {currentQuestion === 4 && (
          <Question4
            handleInputChange={(field, value) =>
              handleInputChange(field, value)
            }
            nextQuestion={nextQuestion}
          />
        )}
        {currentQuestion === 5 && (
          <Question5
            handleInputChange={(field, value) =>
              handleInputChange(field, value)
            }
            nextQuestion={nextQuestion}
          />
        )}
        {currentQuestion === 6 && (
          <Question6
            handleInputChange={(field, value) =>
              handleInputChange(field, value)
            }
            nextQuestion={nextQuestion}
          />
        )}
        {currentQuestion === 7 && (
          <Question7
            handleInputChangeGender={(field, value) =>
              handleInputChange(field, value)
            }
            handleInputChangeWeight={(field, value) =>
              handleInputChange(field, value)
            }
            handleInputChangeHeight={(field, value) =>
              handleInputChange(field, value)
            }
            handleInputChangeUsername={(field, value) =>
              handleInputChange(field, value)
            }
            handleInputChangeAge={(field, value) =>
              handleInputChange(field, value)
            }
            value1={formData.username}
            value2={formData.age}
            nextQuestion={nextQuestion}
          />
        )}
        {currentQuestion === 8 && (
          <WelcomeComponent nextQuestion={handleSubmit} />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      fontFamily: theme.fonts.regular,
    },
    background: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
  });
