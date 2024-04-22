import ExerciseOverviewComponent from "@/components/ExerciseComponents/ExerciseOverviewComponent";
import { Exercise, SequenceType } from "@/types/data";
import React, { useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";

export default function ExerciseOverviewScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [showSingleButton, setShowSingleButton] = useState(true);
  const { exercise } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Click Me" onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>{exercise.name}</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>{exercise.difficulty}</Text>
        <Text style={styles.text}>{exercise.equipment}</Text>
        <Text style={styles.text}>{exercise.duration}</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {exercise.sequence.map(
          (sequence: SequenceType, index: React.Key | null | undefined) => (
            <ExerciseOverviewComponent
              image={exercise.image_url}
              key={index}
              step={sequence}
              navigation={navigation}
            />
          )
        )}
      </ScrollView>

      {showSingleButton ? (
        <Button
          title="Start"
          onPress={() => {
            setShowSingleButton(false);
            navigation.navigate("Sequence", { exercise });
          }}
        />
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            title="Restart"
            onPress={() => {
              navigation.navigate("Sequence", { exercise });
            }}
          />
          <Button
            title="Continue"
            onPress={() => {
              navigation.navigate("Sequence", { exercise });
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  textContainer: {
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  scrollView: {
    flex: 1,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
