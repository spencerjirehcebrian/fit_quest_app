import React, { useContext, useEffect, useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { SequenceType } from "@/types/data";
import { ThemeContext, Theme } from "@/themes/ThemeContext";
import secondsToMinutes from "@/helpers/secondsToMinutes";
import { getExercisesByIndex } from "@/helpers/exerciseDataHelpers";
import GifReturnHelper from "@/helpers/gifReturnHelper";

export default function ExerciseOverviewComponent({
  index,
  mainIndex,
}: {
  index: number;
  mainIndex: number;
}) {
  const [sequenceData, setSequenceData] = useState<SequenceType[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const retrieve = async () => {
      const sequence = await getExercisesByIndex(mainIndex);
      setSequenceData(sequence);
      setLoaded(true);
      console.log(sequence, index, mainIndex);
    };
    retrieve();
  }, []);

  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles(theme).container}>
      {loaded && (
        <>
          {/* <Image
            source={{ uri: sequenceData[index].image_url }}
            style={styles(theme).image}
          /> */}
          <GifReturnHelper
            exerciseNum={mainIndex}
            sequenceNum={index}
            imageStyle={styles(theme).image}
          />
          <View style={styles(theme).textContainer}>
            <Text style={styles(theme).title}>{sequenceData[index].name}</Text>
            <Text style={styles(theme).text}>
              Duration:{" "}
              {secondsToMinutes(sequenceData[index].duration.toString())}
            </Text>
            <Text style={styles(theme).text}>
              Targets: {sequenceData[index].targets.join(", ")}
            </Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      height: 100, // Adjust the height as needed
      padding: 6,
      paddingLeft: 20,
    },
    image: {
      justifyContent: "center",
      alignContent: "center",
      alignSelf: "center",
      alignItems: "center",
      width: 80,
      height: 80, // Match the height of the container
      resizeMode: "contain", // Adjust the resizeMode as needed
    },
    textContainer: {
      flex: 1, // Take up the remaining space
      justifyContent: "center", // Center the text vertically
      padding: 16, // Add some spacing from the image
    },
    text: {
      fontSize: 12,
      marginBottom: 1, // Add some spacing between the text lines
      fontFamily: theme.fonts.regular,
      color: theme.colors.text,
      marginLeft: 25,
    },
    title: {
      fontSize: 16,
      marginBottom: 2, // Add some spacing between the text lines
      fontFamily: theme.fonts.bold,
      color: theme.colors.text,
      marginLeft: 5,
    },
  });
