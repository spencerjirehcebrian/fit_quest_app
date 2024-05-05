import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MealType } from "@/types/data";
import { getUsers, updateMeal } from "@/helpers/userDataHelpers";
import ButtonMealDay from "@/components/MealComponents/ButtonMealDay";
import convertDateHelper from "@/helpers/convertDateHelper";
import { ThemeContext, Theme } from "@/themes/ThemeContext";
import Default from "@/assets/MealAssets/default.png";
import BButton from "@/assets/HomeAssets/b_arrow.png";
import { Ionicons } from "@expo/vector-icons";
import NButton from "@/assets/HomeAssets/n_arrow.png";

const { width, height } = Dimensions.get("window");
export interface MealFormData {
  meal_image_url?: string;
  meal_name?: string;
  meal_notes?: string;
  date?: string;
  meal_type?: MealType;
}

export default function MainMealComponent() {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState<MealFormData>({
    meal_image_url: "",
    meal_name: "",
    meal_notes: "",
    date: "",
    meal_type: "Breakfast",
  });

  const handleChange = (
    field: keyof MealFormData,
    value: string | MealType
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const [imagePressed, setImagePressed] = useState(false);
  const [mealType, setMealType] = useState<MealType[]>([
    "Breakfast",
    "Lunch",
    "Dinner",
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleMealTypeShift = (direction: "up" | "down") => {
    const newIndex = direction === "up" ? selectedIndex + 1 : selectedIndex - 1;
    if (newIndex >= 0 && newIndex < mealType.length) {
      setSelectedIndex(newIndex);
    }
  };

  const today = new Date();
  const daysOfWeek = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];
  const dayIndex = new Date(today).getDay();
  const day = daysOfWeek[dayIndex];

  console.log(day);
  const [selectedButton, setSelectedButton] = useState<string | null>(day);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    convertDateHelper(today)
  );

  const handleButtonPress = (buttonText: string) => {
    setSelectedButton((prevSelectedButton) =>
      prevSelectedButton === buttonText ? null : buttonText
    );

    let dayOfWeek;
    switch (buttonText) {
      case "SUN":
        dayOfWeek = 0;
        break;
      case "MON":
        dayOfWeek = 1;
        break;
      case "TUE":
        dayOfWeek = 2;
        break;
      case "WED":
        dayOfWeek = 3;
        break;
      case "THU":
        dayOfWeek = 4;
        break;
      case "FRI":
        dayOfWeek = 5;
        break;
      case "SAT":
        dayOfWeek = 6;
        break;
      default:
        dayOfWeek = -1;
    }

    // Calculate the date based on the day of the week
    const dateDiff = dayOfWeek - today.getDay();
    const date = new Date(today.getTime() + dateDiff * 24 * 60 * 60 * 1000);

    const formattedDate = convertDateHelper(date);
    // console.log(formattedDate, dateDiff, dayOfWeek);
    setSelectedDate(formattedDate);
  };

  useEffect(() => {
    const retrieve = async () => {
      const { meal } = await getUsers();
      const prevMeal = meal?.find(
        (meal) =>
          meal.date === selectedDate &&
          meal.meal_type === mealType[selectedIndex]
      );

      // console.log("prev", prevMeal, selectedDate);
      setFormData({
        meal_image_url: prevMeal?.meal_image_url || "",
        date: prevMeal?.date || "",
        meal_type: prevMeal?.meal_type || mealType[selectedIndex],
        meal_name: prevMeal?.meal_name || "",
        meal_notes: prevMeal?.meal_notes || "",
      });
      setSelectedImage(prevMeal?.meal_image_url || undefined);
      handleChange("meal_name", prevMeal?.meal_name || "");
      handleChange("meal_notes", prevMeal?.meal_notes || "");
    };
    retrieve();
  }, [selectedIndex, selectedDate]);

  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const pickImage = async () => {
    // Request camera roll permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    await updateMeal({
      meal_image_url: selectedImage,
      meal_name: formData.meal_name,
      meal_notes: formData.meal_name,
      date: selectedDate,
      meal_type: mealType[selectedIndex],
    });
  };

  return (
    <ScrollView style={styles(theme).container}>
      <View style={styles(theme).containerInner}>
        <Text style={styles(theme).label}>Meal</Text>

        <View style={styles(theme).buttonContainer}>
          {(mealType[selectedIndex] === "Lunch" ||
            mealType[selectedIndex] === "Dinner") && (
            <Pressable
              onPress={() => handleMealTypeShift("down")}
              style={styles(theme).buttonContainerB}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={theme.colors.text}
                style={styles(theme).BButtonImage}
              />
            </Pressable>
          )}
          <Text style={styles(theme).button}>{mealType[selectedIndex]}</Text>
          {(mealType[selectedIndex] === "Lunch" ||
            mealType[selectedIndex] === "Breakfast") && (
            <Pressable
              onPress={() => handleMealTypeShift("up")}
              style={styles(theme).buttonContainerN}
            >
              <Ionicons
                name="chevron-forward"
                size={24}
                color={theme.colors.text}
                style={styles(theme).NButtonImage}
              />
            </Pressable>
          )}
        </View>

        <View style={styles(theme).buttonsContainer}>
          <ButtonMealDay
            text="SUN"
            handleButtonPress={handleButtonPress}
            selectedButton={selectedButton}
          />
          <ButtonMealDay
            text="MON"
            handleButtonPress={handleButtonPress}
            selectedButton={selectedButton}
          />
          <ButtonMealDay
            text="TUE"
            handleButtonPress={handleButtonPress}
            selectedButton={selectedButton}
          />
          <ButtonMealDay
            text="WED"
            handleButtonPress={handleButtonPress}
            selectedButton={selectedButton}
          />
          <ButtonMealDay
            text="THU"
            handleButtonPress={handleButtonPress}
            selectedButton={selectedButton}
          />
          <ButtonMealDay
            text="FRI"
            handleButtonPress={handleButtonPress}
            selectedButton={selectedButton}
          />
          <ButtonMealDay
            text="SAT"
            handleButtonPress={handleButtonPress}
            selectedButton={selectedButton}
          />
        </View>

        <TouchableOpacity
          style={styles(theme).imageContainer}
          onPress={pickImage}
        >
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles(theme).image}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={Default}
              style={styles(theme).image}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
        {/* One-line TextInput */}
        <TextInput
          value={formData.meal_name}
          onChangeText={(value) => handleChange("meal_name", value)}
          style={styles(theme).oneLineInput}
          placeholder="name your food"
          placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
        />
        {/* Large TextInput */}
        <TextInput
          value={formData.meal_notes}
          style={styles(theme).largeInput}
          onChangeText={(value) => handleChange("meal_notes", value)}
          multiline
          placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
          placeholder="notes..."
        />
        <Pressable onPress={handleSubmit} style={styles(theme).buttonContainer}>
          <Text style={styles(theme).button}>Save</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: theme.colors.background,
    },
    containerInner: {
      alignContent: "center",
      alignItems: "center",
      paddingBottom: 30,
      backgroundColor: theme.colors.background,
    },
    label: {
      fontSize: 18,
      fontFamily: theme.fonts.bold,
      color: theme.colors.text,
      marginVertical: 12,
    },
    buttonContainer: {
      marginHorizontal: 8,
      width: 250,
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 30,
      borderRadius: 6,
    },
    button: {
      fontFamily: theme.fonts.bold,
      backgroundColor: theme.colors.purple,
      color: theme.colors.white,
      paddingVertical: 8,
      paddingHorizontal: 16,
      textAlign: "center",
      justifyContent: "center",
      alignContent: "center",
      position: "absolute",
      left: 50,
      right: 50,
      borderRadius: 20,
    },
    image: {
      borderRadius: 100,
      width: 200,
      height: 200,
      alignItems: "center",
    },
    imageContainer: {},
    oneLineInput: {
      padding: 8,
      width: "50%",
      marginVertical: 12,
      justifyContent: "center",
      alignContent: "center",
      backgroundColor: theme.colors.pink,
      borderRadius: 10,
      fontFamily: theme.fonts.regular,
      fontSize: 12,
    },
    largeInput: {
      fontSize: 10,
      padding: 8,
      width: "70%",
      height: 120,
      marginVertical: 12,
      backgroundColor: theme.colors.pink,
      borderRadius: 10,
      fontFamily: theme.fonts.regular,
    },
    BButtonImage: {
      width: 20,
      height: 20,
      resizeMode: "contain",
    },
    NButtonImage: {
      width: 20,
      height: 20,
      resizeMode: "contain",
    },
    buttonsContainer: {
      flexDirection: "row",
      marginVertical: 12,
      alignContent: "center",
    },
    buttonContainerB: {
      position: "absolute",
      left: 0,
      top: 7,
    },
    buttonContainerN: {
      position: "absolute",
      right: 0,
      top: 7,
    },
  });
