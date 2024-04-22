import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import PressableButton from "@/components/Buttons/PressableButton";
import TextInputLanding from "@/components/Buttons/TextInputLanding";
import PressableLandingModal from "@/components/Buttons/PressableLandingModal";
import { FormData } from "@/screens/landing";
import HalfScreenModal from "@/components/Modals/HalfScreenModal";
import PressableButtonLanding from "../Buttons/PressableButtonLanding";

type Question7Props = {
  nextQuestion: () => void;
  value1: string;
  value2: number;
  value3: number;
  value4: number;
  // onChange1: (newValue: string) => vd;
  // onChange2: (newValue: number) => void;
  handleInputChangeGender: (field: keyof FormData, value: string) => void;
  handleInputChangeWeight: (field: keyof FormData, value: number) => void;
  handleInputChangeHeight: (field: keyof FormData, value: number) => void;
  handleInputChangeUsername: (field: keyof FormData, value: string) => void;
  handleInputChangeAge: (field: keyof FormData, value: number) => void;
};

export default function Question7({
  nextQuestion,
  value1,
  value2,
  value3,
  value4,
  // onChange1,
  // onChange2,
  handleInputChangeGender,
  handleInputChangeWeight,
  handleInputChangeHeight,
  handleInputChangeUsername,
  handleInputChangeAge,
}: Question7Props) {
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setModalVisible1(false);
  }, [handleInputChangeGender]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up to get started</Text>
      <TextInputLanding
        placeholder="Username"
        value={value1}
        onChangeText={(value) => {
          // onChange1(value);
          handleInputChangeUsername("username", value);
        }}
      />
      <TextInputLanding
        placeholder="Age"
        value={value2.toString()}
        inputMode="numeric"
        onChangeText={(value) => {
          // onChange1(value);
          handleInputChangeAge("age", parseInt(value));
        }}
      />
      <PressableLandingModal
        onPress={() => setModalVisible1(true)}
        title="Gender"
      />
      <PressableLandingModal
        onPress={() => setModalVisible2(true)}
        title="Height"
      />
      <PressableLandingModal
        onPress={() => setModalVisible3(true)}
        title="Weight"
      />
      <PressableButton
        onPress={() => {
          nextQuestion();
        }}
        title={"Continue"}
      />
      <HalfScreenModal
        visible={modalVisible1}
        onClose={() => setModalVisible1(false)}
      >
        <View>
          <Text>Gender</Text>
          <PressableButtonLanding
            handleInputChange={() =>
              handleInputChangeGender("gender", "Female")
            }
            title="Female"
          />
          <PressableButtonLanding
            handleInputChange={() => handleInputChangeGender("gender", "Male")}
            title="Male"
          />
          <PressableButtonLanding
            handleInputChange={() =>
              handleInputChangeGender("gender", "Non-binary")
            }
            title="Non-binary"
          />
        </View>
      </HalfScreenModal>

      <HalfScreenModal
        visible={modalVisible2}
        onClose={() => setModalVisible2(false)}
      >
        <View>
          <Text>What is your height?</Text>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            value={value3.toString()}
            onChangeText={(value) =>
              handleInputChangeHeight("height", parseFloat(value))
            }
            placeholder={"Height"}
            inputMode="numeric"
          />
        </View>
      </HalfScreenModal>

      <HalfScreenModal
        visible={modalVisible3}
        onClose={() => setModalVisible3(false)}
      >
        <View>
          <Text>What is your current weight?</Text>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            value={value4.toString()}
            onChangeText={(value) =>
              handleInputChangeWeight("weight", parseFloat(value))
            }
            placeholder={"Weight"}
            inputMode="numeric"
          />
        </View>
      </HalfScreenModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputFocused: {
    borderColor: "#000",
  },
  secureInput: {
    fontFamily: "monospace",
  },
});
