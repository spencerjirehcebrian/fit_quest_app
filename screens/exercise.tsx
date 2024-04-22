import CustomHeader from "@/components/CustomHeader";
import MainExerciseComponent from "@/components/ExerciseComponents/MainExerciseComponent";
import { getUsers } from "@/helpers/userDataHelpers";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function ExerciseScreen({ navigation }: { navigation: any }) {
  const [points, setPoints] = useState<number | undefined>(undefined);
  const [buttonState, setButtonState] = useState(0); // Set the initial state to 0
  const [currentFilter, setCurrentFilter] = useState(0);

  const toggleButton = (index: any) => {
    setButtonState(index === buttonState ? null : index);
  };
  useEffect(() => {
    const retrieve = async () => {
      const { points } = await getUsers();
      setPoints(points);
    };
    retrieve();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomHeader navigation={navigation} isMin={true} />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Current Points</Text>
          <Text style={styles.text}>{points} points</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[
              styles.button,
              buttonState === 0 ? styles.buttonToggled : null,
            ]}
            onPress={() => {
              toggleButton(0);
              setCurrentFilter(0);
            }}
          >
            <Text style={styles.buttonText}>Categories</Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              buttonState === 1 ? styles.buttonToggled : null,
            ]}
            onPress={() => {
              toggleButton(1);
              setCurrentFilter(1);
            }}
          >
            <Text style={styles.buttonText}>Exercises</Text>
          </Pressable>
        </View>
        {currentFilter == 0 && (
          <View style={styles.verticalButtonContainer}>
            <Pressable
              onPress={() => setCurrentFilter(2)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Arm</Text>
            </Pressable>
            <Pressable
              onPress={() => setCurrentFilter(3)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Chest</Text>
            </Pressable>
            <Pressable
              onPress={() => setCurrentFilter(4)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Legs</Text>
            </Pressable>
          </View>
        )}
        {currentFilter == 1 && (
          <MainExerciseComponent category={1} navigation={navigation} />
        )}
        {currentFilter == 2 && (
          <MainExerciseComponent category={2} navigation={navigation} />
        )}
        {currentFilter == 3 && (
          <MainExerciseComponent category={3} navigation={navigation} />
        )}
        {currentFilter == 4 && (
          <MainExerciseComponent category={4} navigation={navigation} />
        )}
      </View>
    </View>
  );
}

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
  textContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  verticalButtonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonToggled: {
    backgroundColor: "#0055AA",
  },
});
