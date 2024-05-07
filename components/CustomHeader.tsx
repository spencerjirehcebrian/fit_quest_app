import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import ButtonHeader from "@/components/Buttons/ButtonHeader";
import { getUsers } from "@/helpers/userDataHelpers";
import { FontAwesome } from "@expo/vector-icons";
import { ThemeContext, Theme } from "@/themes/ThemeContext";
import Icon from "@/assets/HeaderAssets/settings.png";

const CustomHeader = ({
  isMin,
  navigation,
  isToday,
  isSettings,
}: {
  isMin: boolean;
  navigation: any;
  isToday?: boolean;
  isSettings?: boolean;
}) => {
  const { theme } = useContext(ThemeContext);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [points, setPoints] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<string | undefined>();

  const handlePress = () => {
    navigation.navigate("Achievements");
  };

  const handlePressSettings = () => {
    navigation.navigate("Settings");
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    const retrieve = async () => {
      const { username, points, file_expo_image } = await getUsers();
      setUsername(username);
      setPoints(points?.toString());
      setImage(file_expo_image);
    };

    retrieve();
  }, [navigation]);

  return (
    <View style={[styles(theme).container, !isSettings && { paddingTop: 35 }]}>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <View style={styles(theme).leftContainer}>
          {image != undefined && (
            <Image source={{ uri: image }} style={styles(theme).userImage} />
          )}
          <View>
            {!isSettings && (
              <Text style={styles(theme).dateLabel}>{formattedDate}</Text>
            )}
            <Text style={styles(theme).welcomeLabel}>Welcome {username}!</Text>
          </View>
        </View>
      </TouchableOpacity>
      {!isMin && (
        <View style={styles(theme).achieve}>
          <ButtonHeader onPress={handlePress} title="Achievements" />
          {!isToday && (
            <Text style={styles(theme).dateLabel2}>How's your day?</Text>
          )}
        </View>
      )}
      <View style={styles(theme).rightContainer}>
        {!isSettings && (
          <TouchableOpacity
            onPress={handlePressSettings}
            style={styles(theme).iconButton}
          >
            <Image source={Icon} />
          </TouchableOpacity>
        )}
      </View>
      {!isMin && (
        <View style={styles(theme).currentPoints}>
          <Text style={styles(theme).dateLabel1}>Current Points</Text>
          <ButtonHeader onPress={handlePress} title={points + " points"} />
        </View>
      )}
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.colors.background,
      paddingTop: 35,
      paddingHorizontal: 24,
    },
    leftContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    userImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 16,
      marginBottom: 8,
    },
    dateLabel: {
      fontFamily: theme.fonts.bold,
      fontSize: 12,
      color: theme.colors.text,
    },
    dateLabel1: {
      textAlign: "center",
      padding: 2,
      fontFamily: theme.fonts.regular,
      fontSize: 12,
      color: theme.colors.text,
      paddingTop: 15,
    },
    dateLabel2: {
      padding: 2,
      fontFamily: theme.fonts.regular,
      fontSize: 12,
      color: theme.colors.text,
    },
    welcomeLabel: {
      fontSize: 16,
      fontFamily: theme.fonts.bold,
      color: theme.colors.text,
    },
    rightContainer: {
      alignItems: "flex-end",
      alignContent: "flex-end",
      flexDirection: "column",
      position: "absolute",

      top: 10,
      right: 16,
    },
    iconButton: {
      paddingTop: 35,
      paddingBottom: 10,
      alignItems: "flex-end",
      backgroundColor: theme.colors.background,
    },
    achieve: {
      position: "absolute",
      top: 95,
      left: 15,
    },
    currentPoints: {
      position: "absolute",
      top: 75,
      right: 16,
    },
  });

export default CustomHeader;
