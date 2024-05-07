import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getGlobals, updateGlobals } from "@/helpers/globalsDataHelpers";
import CustomHeader from "@/components/CustomHeader";
import { ThemeContext, Theme } from "@/themes/ThemeContext";
import BButton from "@/assets/HomeAssets/b_arrow.png";
import Char2 from "@/assets/ProfileAssets/char2.png";
import { User } from "@/types/data";
import { getUsers } from "@/helpers/userDataHelpers";

export default function SettingsScreen({ navigation }: { navigation: any }) {
  const { toggleTheme } = useContext(ThemeContext);
  const { theme } = useContext(ThemeContext);
  const [isToggledDarkMode, setIsToggledDarkMode] = useState(false);
  const [isToggledNotification, setIsToggledNotification] = useState(false);
  const [isToggledPercentage, setIsToggledPercentage] = useState(false);

  const toggleSwitch1 = () => setIsToggledDarkMode((prevState) => !prevState);
  const toggleSwitch2 = () =>
    setIsToggledNotification((prevState) => !prevState);
  const toggleSwitch3 = () => setIsToggledPercentage((prevState) => !prevState);
  const [formData, setFormData] = useState<Partial<User>>({
    username: "",
    file_expo_image: "",
  });
  const handleChange = (
    field: keyof Partial<User>,
    value: string | number | string[]
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  useEffect(() => {
    const retrieve = async () => {
      const { username, file_expo_image } = await getUsers();
      const { dark_mode, notification, show_percentage } = await getGlobals();
      handleChange("username", username!);
      handleChange("file_expo_image", file_expo_image!);
      setIsToggledDarkMode(dark_mode!);
      setIsToggledNotification(notification!);
      setIsToggledPercentage(show_percentage!);
    };
    retrieve();
  }, []);

  useEffect(() => {
    const updates = async () => {
      await updateGlobals({
        dark_mode: isToggledDarkMode,
        notification: isToggledNotification,
        show_percentage: isToggledPercentage,
      });
    };
    updates();
  }, [isToggledDarkMode, isToggledNotification, isToggledPercentage]);

  useEffect(() => {}, [isToggledDarkMode]);

  return (
    <View style={styles(theme).container}>
      {/* Back button on top left with an icon and text */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles(theme).backButtonContainer}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color={theme.colors.text}
          style={styles(theme).backbutton}
        />
        <Text style={styles(theme).backButtonText}>Settings</Text>
      </TouchableOpacity>

      <View style={styles(theme).imageContainer}>
        {formData.file_expo_image == "default" ? (
          <Image source={Char2} style={styles(theme).image} />
        ) : (
          <Image
            source={{ uri: formData.file_expo_image }}
            style={styles(theme).image}
          />
        )}
        <View style={styles(theme).imageTextContainer}>
          <Text style={styles(theme).imageText2}>
            Welcome {formData.username}!
          </Text>
        </View>
      </View>

      <Text style={[styles(theme).text1, styles(theme).profileText]}>
        Profile
      </Text>
      <View style={styles(theme).line}></View>
      {/* Text with a sub-text and toggle */}
      <View style={styles(theme).textWithToggleContainer}>
        <Text style={styles(theme).text}>Appearance</Text>
        <View style={styles(theme).subTextContainer}>
          <Text style={styles(theme).subText}>Dark Mode</Text>
          <Switch
            trackColor={{
              false: theme.colors.pink,
              true: theme.colors.light_purple,
            }}
            thumbColor={theme.colors.dark_purple}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              toggleSwitch1();
              toggleTheme();
            }}
            value={isToggledDarkMode}
            style={styles(theme).toggle}
          />
        </View>
      </View>

      {/* Text with 3 sub-texts */}
      <View style={styles(theme).textWithSubTextsContainer}>
        <Text style={styles(theme).text}>General</Text>
        <View style={styles(theme).subTextContainer}>
          <Text style={styles(theme).subText}>Notification</Text>
          <Switch
            trackColor={{
              false: theme.colors.pink,
              true: theme.colors.light_purple,
            }}
            thumbColor={theme.colors.dark_purple}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch2}
            value={isToggledNotification}
            style={styles(theme).toggle}
          />
        </View>
        <View style={styles(theme).subTextContainer}>
          <Text style={styles(theme).subText}>About Fit Quest</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("About")}
            style={styles(theme).navigationButton}
          >
            <Ionicons
              name="chevron-forward"
              size={24}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        </View>
        <View style={styles(theme).subTextContainer}>
          <Text style={styles(theme).subText}>Privacy and Policy</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("PrivacyPolicy")}
            style={styles(theme).navigationButton}
          >
            <Ionicons
              name="chevron-forward"
              size={24}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Text with a sub-text and toggle */}
      <View style={styles(theme).textWithToggleContainer}>
        <Text style={styles(theme).text}>Application</Text>
        <View style={styles(theme).subTextContainer}>
          <Text style={styles(theme).subText}>Show Percentage Progress</Text>
          <Switch
            trackColor={{
              false: theme.colors.pink,
              true: theme.colors.light_purple,
            }}
            thumbColor={theme.colors.dark_purple}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch3}
            value={isToggledPercentage}
            style={styles(theme).toggle}
          />
        </View>
      </View>
    </View>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
      paddingTop: 50,
      padding: 30,
      backgroundColor: theme.colors.background,
    },
    imageContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      marginVertical: 16,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginVertical: 5,
    },
    imageTextContainer: {
      marginLeft: 16,
    },
    imageText: {
      fontSize: 12,
      color: theme.colors.text,
      fontFamily: theme.fonts.bold,
    },
    imageText2: {
      fontSize: 20,
      color: theme.colors.text,
      fontFamily: theme.fonts.bold,
    },
    text: {
      fontSize: 16,
      marginTop: 10,
      paddingLeft: 10,
      fontFamily: theme.fonts.bold,
      color: theme.colors.text,
    },
    text1: {
      fontSize: 16,
      marginTop: 10,
      paddingLeft: 10,
      fontFamily: theme.fonts.bold,
      color: theme.colors.dark_purple,
    },
    textWithToggleContainer: {
      marginVertical: 0,
    },
    subTextContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 0,
    },
    subText: {
      flex: 1,
      fontSize: 14,
      paddingLeft: 50,
      fontFamily: theme.fonts.regular,
      color: theme.colors.text,
      marginVertical: 8,
    },
    toggle: {
      marginLeft: 8,
    },
    textWithSubTextsContainer: {
      marginVertical: 0,
    },
    navigationButton: {
      marginLeft: 8,
    },
    backButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      position: "absolute",
      top: 30,
      left: 10,
      zIndex: 2,
    },
    backButtonText: {
      color: theme.colors.text,
      marginLeft: 8,
      fontSize: 16,
      fontFamily: theme.fonts.medium,
    },
    backbutton: {
      width: 20,
      height: 20,
    },
    line: {
      borderBottomWidth: 1,
      borderBottomColor: "gray",
      marginVertical: 1,
    },
    profileText: {
      backgroundColor: theme.colors.pink,
      borderRadius: 10,
      width: "100%",
      height: 40,
      paddingVertical: 10,
      marginBottom: 10,
    },
  });
