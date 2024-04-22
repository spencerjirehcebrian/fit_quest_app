import { Exercise, SequenceType } from "@/types/data";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import useCountdown from "@/hooks/useCountDown";
import { FontAwesome } from "@expo/vector-icons";

export default function SequenceScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { exercise } = route.params;
  const [sequence, setSequence] = useState<SequenceType[]>([]);
  const [trackerIdx, setTrackerIdx] = useState(-1);
  const { countDown, isRunning, stop, start } = useCountdown(trackerIdx);
  useEffect(() => {
    if (!exercise || trackerIdx + 1 === exercise.sequence.length) {
      return;
    }
    if (countDown === 0) {
      console.log(trackerIdx);
      addItemToSequence(trackerIdx + 1);
    }
    return () => {};
  }, [countDown]);

  const addItemToSequence = (idx: number) => {
    let newSequence = [] as SequenceType[];
    if (idx > 0) {
      newSequence = [...sequence, exercise!.sequence[idx]];
    } else {
      newSequence = [exercise!.sequence[idx]];
    }
    console.log(newSequence);
    setSequence(newSequence);
    setTrackerIdx(idx);
    start(newSequence[idx].duration);
  };

  if (!exercise) {
    return <Text>Loading...</Text>;
  }
  const hasReachedEnd =
    countDown === 0 && trackerIdx === exercise!.sequence.length - 1;

  return (
    <View style={styles.container}>
      {!hasReachedEnd && (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                stop();
                navigation.goBack();
              }}
              style={styles.button}
            >
              <Text>Button</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>
              {1 + trackerIdx}/{exercise.sequence.length}
            </Text>
          </View>
          <Image
            source={{ uri: "https://example.com/image.jpg" }}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            {sequence.length > 0 && countDown >= 0 && (
              <Text style={styles.text}>{countDown}</Text>
            )}

            <Text style={styles.text}>
              {sequence.length === 0 ? "Prepare" : sequence[trackerIdx].name}
            </Text>
            <Text style={styles.text}>Text 3</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text>Button 1</Text>
            </TouchableOpacity>
            {sequence.length === 0 ? (
              <TouchableOpacity
                onPress={() => addItemToSequence(0)}
                style={styles.button}
              >
                <Text>PLAY</Text>
              </TouchableOpacity>
            ) : isRunning ? (
              <TouchableOpacity onPress={() => stop()} style={styles.button}>
                <Text>PAUSE</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (hasReachedEnd) {
                    addItemToSequence(0);
                  } else {
                    start(countDown);
                  }
                }}
                style={styles.button}
              >
                <Text>PLAY</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.button}>
              <Text>Button 3</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {hasReachedEnd && (
        <>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {1 + trackerIdx}/{exercise.sequence.length}
            </Text>
          </View>
          <Text style={styles.headerText}>
            Good Job! You've Completed an Exercise
          </Text>
          <View style={styles.textContainer}>
            {sequence.length > 0 && countDown >= 0 && (
              <Text style={styles.text}>{countDown}</Text>
            )}

            <Text style={styles.text}>
              {sequence.length === 0 ? "Prepare" : sequence[trackerIdx].name}
            </Text>
            <Text style={styles.text}>Text 3</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.button}
            >
              <Text>DONE</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  textContainer: {
    padding: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
  },
});
