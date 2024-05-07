import CustomHeader from "@/components/CustomHeader";
import { getGlobalsLogged } from "@/helpers/globalsDataHelpers";
import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MainMealComponent from "@/components/MealComponents/MainMealComponent";
import { getUsers } from "@/helpers/userDataHelpers";
import { ThemeContext, Theme } from "@/themes/ThemeContext";
import useStepCounter from "@/helpers/stepCounter";

const MealScreen: React.FC = ({ navigation }: any) => {
  useStepCounter();
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    const check = async () => {
      const isLoggedIn = await getGlobalsLogged();
      if (!isLoggedIn) {
        navigation.navigate("Landing");
      }
    };
    check();
  }, []);
  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).headerContainer}>
        <CustomHeader navigation={navigation} isMin={true} />
      </View>

      <View style={styles(theme).contentContainer}>
        <MainMealComponent />
      </View>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    headerContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
    },
    contentContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 80, // Adjust this value to provide enough space for the header
    },
  });

export default MealScreen;
