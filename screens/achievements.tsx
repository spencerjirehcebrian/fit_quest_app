import CustomHeader from "@/components/CustomHeader";
import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import KettleComponent from "@/components/AchievementComponents/KettleComponent";
import TrophyComponent from "@/components/AchievementComponents/TrophyComponent";
import { ThemeContext, Theme } from "@/themes/ThemeContext";
import useCheckAcheivements from "@/hooks/useCheckAcheivements";

export default function AchievementScreen({ navigation }: { navigation: any }) {
  useCheckAcheivements();
  const [tabSelect, setTabSelect] = useState(0);
  const { theme } = useContext(ThemeContext);
  const moveToKettle = () => {
    setTabSelect(0);
  };
  const moveToTrophy = () => {
    setTabSelect(1);
  };

  return (
    <View style={styles(theme).container}>
      {tabSelect === 0 && (
        <View style={styles(theme).headerContainer}>
          <CustomHeader navigation={navigation} isMin={true} />
        </View>
      )}

      {tabSelect === 1 && (
        <View style={styles(theme).contentContainer}>
          <TrophyComponent tabSelect={moveToKettle} />
        </View>
      )}

      {tabSelect === 0 && (
        <View style={styles(theme).contentContainer}>
          <KettleComponent tabSelect={moveToTrophy} />
        </View>
      )}
    </View>
  );
}

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
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
    },
    contentContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 100, // Adjust this value to provide enough space for the header
    },
  });
