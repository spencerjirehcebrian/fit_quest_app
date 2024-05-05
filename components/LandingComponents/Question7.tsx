import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import PressableButton from "@/components/Buttons/PressableButton";
import TextInputLanding from "@/components/Buttons/TextInputLanding";
import PressableLandingModal from "@/components/Buttons/PressableLandingModal";
import { FormData } from "@/screens/landing";
import HalfScreenModal from "@/components/Modals/HalfScreenModal";
import PressableButtonLanding from "../Buttons/PressableButtonLanding";
import { ThemeContext, Theme } from "@/themes/ThemeContext";
import Arrow from "@/assets/LandingAssets/arrow.png";
import ProgressBar from "@/components/LandingComponents/ProgressBar";
import WheelPicker from "react-native-wheely";
const { height } = Dimensions.get("window");

type Question7Props = {
  nextQuestion: () => void;
  value1: string;
  value2: string;
  value3: number;
  value4: number;
  handleInputChangeGender: (field: keyof FormData, value: string) => void;
  handleInputChangeWeight: (field: keyof FormData, value: string) => void;
  handleInputChangeHeight: (field: keyof FormData, value: string) => void;
  handleInputChangeUsername: (field: keyof FormData, value: string) => void;
  handleInputChangeAge: (field: keyof FormData, value: string) => void;
};
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

export default function Question7({
  nextQuestion,
  value1,
  value2,
  handleInputChangeGender,
  handleInputChangeWeight,
  handleInputChangeHeight,
  handleInputChangeUsername,
  handleInputChangeAge,
}: Question7Props) {
  useEffect(() => {
    setModalVisible1(false);
  }, [handleInputChangeGender]);

  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);

  const feetArray = generateArray();
  const kgArray = generateArray1();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndex1, setSelectedIndex1] = useState(0);

  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).progressBar}>
        <ProgressBar progress={6} />
      </View>
      <Text style={styles(theme).title1}>Sign up to get started</Text>

      <View style={styles(theme).rectangle}>
        <TouchableOpacity
          style={[
            styles(theme).formInputContainer,
            { borderBottomWidth: 1, borderBottomColor: "black" },
          ]}
        >
          <Text style={styles(theme).title}>Username</Text>
          <TextInput
            style={styles(theme).formInput}
            placeholder="Username"
            placeholderTextColor="gray"
            value={value1}
            onChangeText={(value) =>
              handleInputChangeUsername("username", value)
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles(theme).formInputContainer,
            { borderBottomWidth: 1, borderBottomColor: "black" },
          ]}
        >
          <Text style={styles(theme).title}>Age</Text>
          <TextInput
            style={styles(theme).formInput}
            placeholder="Age"
            placeholderTextColor="gray"
            value={value2}
            onChangeText={(value) => handleInputChangeAge("age", value)}
            keyboardType="numeric"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles(theme).formInputContainer,
            { borderBottomWidth: 1, borderBottomColor: "black" },
          ]}
          onPress={() => setModalVisible1(true)}
        >
          <Text style={styles(theme).title}>Gender</Text>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Image
              source={Arrow}
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
                marginLeft: 5,
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles(theme).formInputContainer,
            { borderBottomWidth: 1, borderBottomColor: "black" },
          ]}
          onPress={() => setModalVisible2(true)}
        >
          <Text style={styles(theme).title}>Hieght</Text>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Image
              source={Arrow}
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
                marginLeft: 5,
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles(theme).formInputContainer]}
          onPress={() => setModalVisible3(true)}
        >
          <Text style={styles(theme).title}>Weight</Text>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Image
              source={Arrow}
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
                marginLeft: 5,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles(theme).buttonContinue}>
        <PressableButton
          onPress={() => {
            nextQuestion();
          }}
          title={"Sign Up"}
        />
      </View>
      <HalfScreenModal
        visible={modalVisible1}
        onClose={() => setModalVisible1(false)}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles(theme).title2}>Gender</Text>
          <View style={{ justifyContent: "space-around", marginVertical: 70 }}>
            <PressableButtonLanding
              handleInputChange={() =>
                handleInputChangeGender("gender", "Female")
              }
              title="Female"
            />
            <PressableButtonLanding
              handleInputChange={() =>
                handleInputChangeGender("gender", "Male")
              }
              title="Male"
            />
            <PressableButtonLanding
              handleInputChange={() =>
                handleInputChangeGender("gender", "Non-binary")
              }
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
              handleInputChangeHeight("height", feetArray[index]);
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
              handleInputChangeWeight("weight", kgArray[index]);
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
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.transparent,
    },
    title: {
      color: theme.colors.white,
      fontSize: 16,
      fontFamily: theme.fonts.regular,
      flex: 1,
      textAlign: "left",
    },
    title1: {
      color: theme.colors.white,
      fontSize: 20,
      fontFamily: theme.fonts.regular,
      marginBottom: 40,
    },
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
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 4,
      paddingVertical: 8,
      paddingHorizontal: 12,
      fontSize: 16,
    },
    inputFocused: {
      borderColor: theme.colors.transparent,
    },
    secureInput: {
      fontFamily: theme.fonts.regular,
    },
    formInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      paddingVertical: 20,
      paddingHorizontal: 25,
      width: 300,
    },
    formInput: {
      flexDirection: "row",
      alignItems: "flex-end",
      height: 20,
      backgroundColor: theme.colors.transparent,
      color: theme.colors.white,
      textAlign: "right",
    },
    rectangle: {
      backgroundColor: theme.colors.dark_purple,
      borderRadius: 10,
      // padding: 10,
      // paddingHorizontal: 30,
    },
    buttonContinue: {
      alignSelf: "stretch", // Take the full width of the container
      height: "40%",
      justifyContent: "flex-end",
      alignContent: "flex-end",
      alignItems: "center",
      position: "absolute",
      bottom: height * 0.1,
      left: 0,
      right: 0,
    },
    progressBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: height * 0.1,
      left: 0,
      right: 0,
    },
  });
