import CustomHeader from "@/components/CustomHeader";
import { getGlobalsLogged } from "@/helpers/globalsDataHelpers";
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MainMealComponent from "@/components/MealComponents/MainMealComponent";

const MealScreen: React.FC = ({ navigation }: any) => {
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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomHeader navigation={navigation} isMin={true} />
      </View>

      <View style={styles.contentContainer}>
        <MainMealComponent />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    marginTop: 80, // Adjust this value to provide enough space for the header
  },
});

export default MealScreen;
