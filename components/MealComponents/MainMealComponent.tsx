import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MealType } from "@/types/data";
import { getUsers, updateMeal } from "@/helpers/userDataHelpers";
import ButtonMealDay from "@/components/MealComponents/ButtonMealDay";
import convertDateHelper from "@/helpers/convertDateHelper";

export interface MealFormData {
  meal_image_url?: string;
  meal_name?: string;
  meal_notes?: string;
  date?: string;
  meal_type?: MealType;
}

export default function MainMealComponent() {
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
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    convertDateHelper(today)
  );

  useEffect(() => {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentDay = daysOfWeek[currentDayOfWeek];
    setSelectedButton(currentDay);
  }, []);

  const handleButtonPress = (buttonText: string) => {
    setSelectedButton((prevSelectedButton) =>
      prevSelectedButton === buttonText ? null : buttonText
    );

    // Get the current date

    // Determine the day of the week based on the button text
    let dayOfWeek;
    switch (buttonText) {
      case "Sun":
        dayOfWeek = 0;
        break;
      case "Mon":
        dayOfWeek = 1;
        break;
      case "Tue":
        dayOfWeek = 2;
        break;
      case "Wed":
        dayOfWeek = 3;
        break;
      case "Thu":
        dayOfWeek = 4;
        break;
      case "Fri":
        dayOfWeek = 5;
        break;
      case "Sat":
        dayOfWeek = 6;
        break;
      default:
        dayOfWeek = -1;
    }

    // Calculate the date based on the day of the week
    const dateDiff = dayOfWeek - today.getDay();
    const date = new Date(today.getTime() + dateDiff * 24 * 60 * 60 * 1000);

    const formattedDate = convertDateHelper(date);

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
      await setFormData({
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
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>My Component</Text>
      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        {(mealType[selectedIndex] === "Lunch" ||
          mealType[selectedIndex] === "Dinner") && (
          <Pressable
            onPress={() => handleMealTypeShift("down")}
            style={styles.buttonContainer}
          >
            <Text style={styles.button}>Down</Text>
          </Pressable>
        )}
        <View style={styles.buttonContainer}>
          <Text style={styles.button}>{mealType[selectedIndex]}</Text>
        </View>
        {(mealType[selectedIndex] === "Lunch" ||
          mealType[selectedIndex] === "Breakfast") && (
          <Pressable
            onPress={() => handleMealTypeShift("up")}
            style={styles.buttonContainer}
          >
            <Text style={styles.button}>Up</Text>
          </Pressable>
        )}
      </View>
      {/* Another Label */}
      <View style={styles.buttonsContainer}>
        <ButtonMealDay
          text="Sun"
          handleButtonPress={handleButtonPress}
          selectedButton={selectedButton}
        />
        <ButtonMealDay
          text="Mon"
          handleButtonPress={handleButtonPress}
          selectedButton={selectedButton}
        />
        <ButtonMealDay
          text="Tue"
          handleButtonPress={handleButtonPress}
          selectedButton={selectedButton}
        />
        <ButtonMealDay
          text="Wed"
          handleButtonPress={handleButtonPress}
          selectedButton={selectedButton}
        />
        <ButtonMealDay
          text="Thu"
          handleButtonPress={handleButtonPress}
          selectedButton={selectedButton}
        />
        <ButtonMealDay
          text="Fri"
          handleButtonPress={handleButtonPress}
          selectedButton={selectedButton}
        />
        <ButtonMealDay
          text="Sat"
          handleButtonPress={handleButtonPress}
          selectedButton={selectedButton}
        />
      </View>
      {/* Pressable Image */}
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      ) : (
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={[styles.image, imagePressed && styles.image]}
          />
        </TouchableOpacity>
      )}
      {/* One-line TextInput */}
      <TextInput
        value={formData.meal_name}
        onChangeText={(value) => handleChange("meal_name", value)}
        style={styles.oneLineInput}
        placeholder="One-line Input"
      />
      {/* Large TextInput */}
      <TextInput
        value={formData.meal_notes}
        style={styles.largeInput}
        onChangeText={(value) => handleChange("meal_notes", value)}
        multiline
        placeholder="Large Input"
      />
      <Pressable onPress={handleSubmit} style={styles.buttonContainer}>
        <Text style={styles.button}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginVertical: 12,
  },
  buttonContainer: {
    marginHorizontal: 8,
  },
  button: {
    backgroundColor: "#007AFF",
    color: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 12,
  },
  oneLineInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    width: "100%",
    marginVertical: 12,
  },
  largeInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    width: "100%",
    height: 120,
    marginVertical: 12,
  },
});
