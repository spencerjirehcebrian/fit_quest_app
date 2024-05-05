import React, { useContext, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getUsers, updateUser } from "@/helpers/userDataHelpers";
import { User } from "@/types/data";
import { FormData } from "./landing";
import { ThemeContext, Theme } from "@/themes/ThemeContext";
import Char1 from "@/assets/ProfileAssets/char1.png";
import Char2 from "@/assets/ProfileAssets/char2.png";
import Char3 from "@/assets/ProfileAssets/char3.png";
import Char4 from "@/assets/ProfileAssets/char4.png";
import Char5 from "@/assets/ProfileAssets/char5.png";
import BButton from "@/assets/HomeAssets/b_arrow.png";
import HalfScreenModal from "@/components/Modals/HalfScreenModal";
import ImgToBase64 from "react-native-image-base64-png";
import WheelPicker from "react-native-wheely";
import PressableButtonLanding from "@/components/Buttons/PressableButtonLanding";
function generateArray() {
  let array = [];
  for (let x = 8; x >= 3; x--) {
    for (let y = 11; y >= 0; y--) {
      array.push(`${x}.${y}"`);
    }
  }
  return array;
}
function generateArray1() {
  let array = [];
  for (let x = 130; x >= 30; x--) {
    array.push(`${x}`);
  }
  return array;
}

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const [formData, setFormData] = useState<Partial<User>>({
    username: "",
    email: "",
    gender: "",
    weight: "",
    height: "",
    dob: "",
    location: "",
    goals: [] as string[],
    target_zones: [] as string[],
    file_expo_image: "",
  });
  const { theme } = useContext(ThemeContext);
  const [goals, setGoals] = useState<string>();
  const [targetZone, setTargetZones] = useState<string>();
  const [rerender, setRerender] = useState(false);

  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);

  const feetArray = generateArray();
  const kgArray = generateArray1();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndex1, setSelectedIndex1] = useState(0);

  const handleImagePress = async (source: any) => {
    // handleChange("file_expo_image", base64String);
  };

  useEffect(() => {
    const retrieve = async () => {
      const {
        username,
        email,
        gender,
        weight,
        height,
        dob,
        location,
        goals,
        target_zones,
        file_expo_image,
      } = await getUsers();
      handleChange("username", username!);
      handleChange("email", email!);
      handleChange("gender", gender!);
      handleChange("weight", weight!);
      handleChange("height", height!);
      handleChange("dob", dob!);
      handleChange("location", location!);
      handleChange("goals", goals!);
      handleChange("target_zones", target_zones!);

      const concatenatedGoals = goals!.join(", ");
      setGoals(concatenatedGoals);
      const concatenatedTarget = target_zones!.join(", ");
      setTargetZones(concatenatedTarget);

      handleChange("file_expo_image", file_expo_image!);
    };
    retrieve();
  }, [rerender]);

  const handleChange = (
    field: keyof Partial<User>,
    value: string | number | string[]
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

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
      handleChange("file_expo_image", result.assets[0].uri);
    }
  };

  const handleCancel = async () => {
    setRerender((prevData) => !prevData);
  };

  const handleSubmit = async () => {
    await updateUser(formData);
  };

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
        <Text style={styles(theme).backButtonText}>Profile</Text>
      </TouchableOpacity>

      {/* Image with a button below it and text next to the image */}
      <View style={styles(theme).imageContainer}>
        <View style={styles(theme).galleryContainer}>
          <Image
            source={{ uri: formData.file_expo_image }}
            style={styles(theme).image}
          />

          <TouchableOpacity
            onPress={pickImage}
            style={styles(theme).buttonGallery}
          >
            <Text style={styles(theme).imageText}>Gallery</Text>
          </TouchableOpacity>
        </View>
        <View style={styles(theme).imageTextContainer}>
          <Text style={styles(theme).imageText2}>{formData.username}</Text>
        </View>
      </View>

      {/* 5 small images side by side */}
      <View style={styles(theme).smallImagesContainer}>
        <TouchableOpacity onPress={() => handleImagePress(Char1)}>
          <Image source={Char1} style={styles(theme).smallImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleImagePress(Char2)}>
          <Image source={Char2} style={styles(theme).smallImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleImagePress(Char3)}>
          <Image source={Char3} style={styles(theme).smallImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleImagePress(Char4)}>
          <Image source={Char4} style={styles(theme).smallImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleImagePress(Char5)}>
          <Image source={Char5} style={styles(theme).smallImage} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles(theme).scroll}>
        {/* Form with text aligned left and input text/placeholder aligned right */}
        <View style={styles(theme).formContainer}>
          <View style={styles(theme).formInputContainer}>
            <Text style={styles(theme).formLabel}>Email</Text>
            <TextInput
              style={[styles(theme).formInput, { textAlign: "right" }]}
              placeholder="Email"
              placeholderTextColor="gray"
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
            />
          </View>
          <View style={styles(theme).line} />

          <View style={styles(theme).formInputContainer}>
            <Text style={styles(theme).formLabel}>Sex</Text>
            {/* <TextInput
              style={[styles(theme).formInput, { textAlign: "right" }]}
              placeholder="Sex"
              placeholderTextColor="gray"
              value={formData.gender}
              onChangeText={(value) => handleChange("gender", value)}
            /> */}
            <TouchableOpacity
              style={styles(theme).formInput}
              onPress={() => {
                setModalVisible1(true);
              }}
            >
              <Text
                style={{
                  textAlign: "right",
                  color: theme.colors.text,
                  fontFamily: theme.fonts.bold,
                }}
              >
                {formData.gender || "Not Set"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles(theme).line} />

          <View style={styles(theme).formInputContainer}>
            <Text style={styles(theme).formLabel}>Height</Text>
            <TouchableOpacity
              style={styles(theme).formInput}
              onPress={() => {
                setModalVisible2(true);
              }}
            >
              <Text
                style={{
                  textAlign: "right",
                  color: theme.colors.text,
                  fontFamily: theme.fonts.bold,
                }}
              >
                {formData.height || "Not Set"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles(theme).line} />

          <View style={styles(theme).formInputContainer}>
            <Text style={styles(theme).formLabel}>Weight</Text>
            <TouchableOpacity
              style={styles(theme).formInput}
              onPress={() => {
                setModalVisible3(true);
              }}
            >
              <Text
                style={{
                  textAlign: "right",
                  color: theme.colors.text,
                  fontFamily: theme.fonts.bold,
                }}
              >
                {`${formData.weight}kg` || "Not Set"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles(theme).line} />

          <View style={styles(theme).formInputContainer}>
            <Text style={styles(theme).formLabel}>Date of Birth</Text>
            <TextInput
              style={[styles(theme).formInput, { textAlign: "right" }]}
              placeholder="Date of Birth"
              placeholderTextColor="gray"
              value={formData.dob}
              onChangeText={(value) => handleChange("dob", value)}
            />
          </View>
          <View style={styles(theme).line} />

          <View style={styles(theme).formInputContainer}>
            <Text style={styles(theme).formLabel}>Location</Text>
            <TextInput
              style={[styles(theme).formInput, { textAlign: "right" }]}
              placeholder="Location"
              placeholderTextColor="gray"
              value={formData.location}
              onChangeText={(value) => handleChange("location", value)}
            />
          </View>
          <View style={styles(theme).line} />
        </View>

        <Text style={styles(theme).formLabel}>Goals</Text>
        <View style={styles(theme).line} />
        <Text style={styles(theme).formInput1}>{goals}</Text>
        <Text style={styles(theme).formLabel}>Target Zones</Text>
        <View style={styles(theme).line} />
        <Text style={styles(theme).formInput1}>{targetZone}</Text>

        <View style={styles(theme).buttonsContainer}>
          <TouchableOpacity
            onPress={handleCancel}
            style={[styles(theme).button, styles(theme).buttonGallery]}
          >
            <Text style={styles(theme).buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles(theme).button, styles(theme).buttonGallery]}
          >
            <Text style={styles(theme).buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <HalfScreenModal
        visible={modalVisible1}
        onClose={() => setModalVisible1(false)}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles(theme).title2}>Gender</Text>
          <View style={{ justifyContent: "space-around", marginVertical: 70 }}>
            <PressableButtonLanding
              handleInputChange={() => handleChange("gender", "Female")}
              title="Female"
            />
            <PressableButtonLanding
              handleInputChange={() => handleChange("gender", "Male")}
              title="Male"
            />
            <PressableButtonLanding
              handleInputChange={() => handleChange("gender", "Non-binary")}
              title="Non-binary"
            />
          </View>
        </View>
      </HalfScreenModal>
      <HalfScreenModal
        visible={modalVisible2}
        onClose={() => setModalVisible2(false)}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles(theme).title2}>What is your height?</Text>
          <Text style={styles(theme).title3}>{feetArray[selectedIndex]}</Text>
          <WheelPicker
            selectedIndex={selectedIndex}
            options={feetArray}
            onChange={(index) => {
              setSelectedIndex(index);
              handleChange("height", feetArray[selectedIndex]);
            }}
            itemTextStyle={{
              fontFamily: theme.fonts.regular,
              fontSize: 20,
              color: "white",
            }}
            visibleRest={2}
            itemHeight={50}
            selectedIndicatorStyle={{
              backgroundColor: theme.colors.dark_purple,
              alignContent: "center",
              borderRadius: 10,
              alignSelf: "center",
            }}
          />
        </View>
      </HalfScreenModal>

      <HalfScreenModal
        visible={modalVisible3}
        onClose={() => setModalVisible3(false)}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles(theme).title2}>What is your weight?</Text>
          <Text style={styles(theme).title3}>{kgArray[selectedIndex1]}kg</Text>
          <WheelPicker
            selectedIndex={selectedIndex1}
            options={kgArray}
            onChange={(index) => {
              setSelectedIndex1(index);
              handleChange("weight", kgArray[selectedIndex1]);
            }}
            itemTextStyle={{
              fontFamily: theme.fonts.regular,
              fontSize: 20,
              color: "white",
            }}
            visibleRest={2}
            itemHeight={50}
            selectedIndicatorStyle={{
              backgroundColor: theme.colors.dark_purple,
              alignContent: "center",
              borderRadius: 10,
              alignSelf: "center",
            }}
          />
        </View>
      </HalfScreenModal>
    </View>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      paddingHorizontal: 50,
      backgroundColor: theme.colors.background,
    },
    backButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      position: "absolute",
      top: 30,
      left: 10,
    },
    backButtonText: {
      marginLeft: 8,
      fontSize: 16,
      fontFamily: theme.fonts.medium,
      color: theme.colors.text,
    },
    backbutton: {
      width: 20,
      height: 20,
      resizeMode: "contain",
    },
    imageContainer: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "center",
      marginVertical: 5,
      resizeMode: "contain",
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 1000,
      marginVertical: 5,
    },
    imageTextContainer: {
      marginLeft: 16,
    },
    imageText: {
      fontSize: 12,
      color: theme.colors.dark_purple,
      fontFamily: theme.fonts.bold,
    },
    imageText2: {
      fontSize: 20,
      color: theme.colors.text,
      fontFamily: theme.fonts.bold,
    },
    galleryContainer: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: theme.colors.dark_purple,
      fontFamily: theme.fonts.bold,
      fontSize: 14,
    },
    smallImagesContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 16,
    },
    smallImage: {
      width: 50,
      height: 50,
      borderRadius: 100,
    },
    formContainer: {
      marginVertical: 16,
    },
    formInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    formLabel: {
      marginTop: 8,
      marginBottom: 1,
      fontSize: 14,
      fontFamily: theme.fonts.regular,
      color: theme.colors.text,
    },
    formInput: {
      marginTop: 8,
      fontSize: 14,
      fontFamily: theme.fonts.bold,
      color: theme.colors.text,
      borderRadius: 4,
      paddingHorizontal: 4,
      marginBottom: 1,
      flex: 1,
      marginLeft: 8,
    },
    formInput1: {
      fontSize: 14,
      fontFamily: theme.fonts.bold,
      color: theme.colors.text,
    },
    line: {
      borderBottomWidth: 1,
      borderBottomColor: "gray",
      marginVertical: 1,
    },
    text: {
      fontSize: 16,
      marginVertical: 4,
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 16,
      marginBottom: 50,
    },
    button: {
      backgroundColor: "blue",
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
      flex: 1,
      marginHorizontal: 8,
    },
    buttonGallery: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 3,
      paddingHorizontal: 12,
      width: 80,
      borderRadius: 8,
      backgroundColor: "#D9D9D9",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    scroll: { width: "100%", height: "100%" },
    title2: {
      color: theme.colors.white,
      fontSize: 13,
      marginTop: 30,
      marginHorizontal: 10,
      fontFamily: theme.fonts.regular,
    },
    title3: {
      color: theme.colors.white,
      fontSize: 40,
      fontFamily: theme.fonts.regular,
    },
  });
