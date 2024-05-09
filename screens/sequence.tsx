import { Exercise, SequenceType } from "@/types/data";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import useCountdown from "@/hooks/useCountDown";
import { FontAwesome } from "@expo/vector-icons";
import { getUsers, updateUser } from "@/helpers/userDataHelpers";
import convertDataHelper from "@/helpers/convertDateHelper";
import convertDateHelper from "@/helpers/convertDateHelper";
import { ThemeContext, Theme } from "@/themes/ThemeContext";
import formatSecondsToTime from "@/helpers/formatSecondsToTime";
import BButton from "@/assets/SequenceAssets/back.png";
import NButton from "@/assets/SequenceAssets/next.png";
import Celeb from "@/assets/SequenceAssets/celeb.gif";
import starp from "@/assets/AchievementAssets/Kettle/purple_star.png";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
const imageSize = Math.min(width - 140, height - 140); // Use the smaller dimension to ensure the image fits the screen
import GifReturnHelperSequence from "@/helpers/gifReturnHelperSequence";
import { Audio, unloadAsync } from "expo-av";
import { setAudioModeAsync } from "expo-av/build/Audio";

const borderRadius = imageSize / 2;

export default function SequenceScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { theme } = useContext(ThemeContext);
  const { exercise, test } = route.params;
  const [sequence, setSequence] = useState<SequenceType[]>([]);
  const [trackerIdx, setTrackerIdx] = useState(-1);
  const [trigger, setTrigger] = useState(0);
  const [gif, setGif] = useState<any>(null);
  const { countDown, isRunning, stop, start } = useCountdown(
    trackerIdx,
    trigger
  );
  const [restState, setRestState] = useState<any>(true);

  const [sound, setSound] = useState<any>();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/Sounds/321start.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }

  const [sound1, setSound1] = useState<any>();

  async function playSound1() {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/Sounds/rest10sec.mp3")
    );
    setSound1(sound);

    await sound.playAsync();
  }

  const [sound2, setSound2] = useState<any>();

  async function playSound2() {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/Sounds/30sec.mp3")
    );
    setSound2(sound);

    await sound.playAsync();
  }

  async function pauseSound2() {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/Sounds/30sec.mp3")
    );
    setSound2(sound);

    await sound.pauseAsync();
  }

  const [sound3, setSound3] = useState<any>();

  async function playSound3() {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/Sounds/rest.mp3")
    );
    setSound3(sound);

    await sound.playAsync();
  }

  const [sound4, setSound4] = useState<any>();

  async function playSound4() {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/Sounds/start.mp3")
    );
    setSound4(sound);

    await sound.playAsync();
  }

  const [sound5, setSound5] = useState<any>();

  async function playSound5() {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/Sounds/completion.mp3")
    );
    setSound5(sound);

    await sound.playAsync();
  }
  useEffect(() => {
    if (
      !exercise ||
      (restState == true && trackerIdx + 1 === exercise.sequence.length)
    ) {
      // console.log("stopping");
      return;
    }
    if (countDown === 0) {
      console.log(trackerIdx);
      addItemToSequence(trackerIdx + 1);
      // setSound1(0);
      pauseSound2();
    }
    if (countDown == 3) {
      playSound();
    }
    return () => {};
  }, [countDown]);

  // useEffect(() => {
  //   setGif(gifReturnHelperSequence(test, trackerIdx));
  // }, [trackerIdx]);

  const handleImageSourceChange = (newImageSource: any) => {
    setGif(newImageSource);
  };
  const addItemToSequence = (idx: number) => {
    let newSequence = [] as SequenceType[];
    let restSequence = {} as SequenceType;
    if (trackerIdx == -1) {
      restSequence = {
        image_url: exercise.sequence[0].image_url,
        name: `NEXT: ${exercise.sequence[0].name}`,
        duration: 10,
        targets: ["None"],
      };
    } else if (trackerIdx + 1 < exercise.sequence.length) {
      restSequence = {
        image_url: exercise.sequence[trackerIdx].image_url,
        name: `NEXT: ${exercise.sequence[trackerIdx + 1].name}`,
        duration: 10,
        targets: ["None"],
      };
    } else {
      restSequence = {
        image_url: exercise.sequence[trackerIdx].image_url,
        name: `NEXT: ${exercise.sequence[trackerIdx].name}`,
        duration: 10,
        targets: ["None"],
      };
    }
    if (restState == true) {
      if (idx > 0) {
        newSequence = [...sequence, restSequence];
      } else {
        newSequence = [restSequence];
      }
      playSound1();
      playSound3();

      setSequence(newSequence);
      setTrigger(trigger + 1);
      setTrackerIdx(idx);
      start(newSequence[idx].duration);
    } else {
      if (idx > 0) {
        newSequence = [...sequence];
        newSequence.splice(idx - 1, 1);
        // console.log("removel", newSequence);
        newSequence = [...newSequence, exercise!.sequence[idx - 1]];
        // console.log("added", newSequence);
      } else {
        newSequence = [exercise!.sequence[idx - 1]];
      }
      playSound2();
      setSequence(newSequence);
      setTrigger(trigger + 1);
      setTrackerIdx(idx - 1);
      start(newSequence[idx - 1].duration);
    }
    setRestState((prevState: any) => !prevState);
    console.log(newSequence);
  };

  const removeFromSequence = (idx: number) => {
    let newSequence = [...sequence.slice(1)];
    newSequence.splice(idx - 1, 1);
    console.log(newSequence);
    setSequence(newSequence);
    setTrackerIdx(idx - 1);
  };

  const onDone = async (name: string, duration: number) => {
    const date = new Date();
    const formattedDate = convertDateHelper(date);
    let user = await getUsers();
    const { minutes, done_workouts, cal_burned } = user;
    const existingMinuteIndex = minutes!.findIndex(
      (item) => item.date === formattedDate
    );
    const existingCalBurnedIndex = cal_burned!.findIndex(
      (item) => item.date === formattedDate
    );

    if (existingMinuteIndex === -1) {
      // Date not found, add a new object to the minutes array

      minutes!.push({ date: formattedDate, min_count: duration });
    } else {
      // Date found, update the min_count
      minutes![existingMinuteIndex].min_count =
        minutes![existingMinuteIndex].min_count + duration;
    }

    const calories = duration * 0.2;
    if (existingCalBurnedIndex === -1) {
      cal_burned!.push({ date: formattedDate, cal_count: calories });
    } else {
      cal_burned![existingCalBurnedIndex].cal_count =
        cal_burned![existingCalBurnedIndex].cal_count + calories;
    }
    const workoutExists = done_workouts!.includes(name);

    if (!workoutExists) {
      const updatedWorkouts = [...done_workouts!, name];
      user = { ...user, minutes, done_workouts: updatedWorkouts };
    } else {
      user = { ...user, minutes, cal_burned, done_workouts };
    }
    // console.log(user);
    await updateUser(user);
  };

  if (!exercise) {
    return <Text>Loading...</Text>;
  }
  const hasReachedEnd =
    countDown === 0 &&
    trackerIdx === exercise!.sequence.length - 1 &&
    restState == true;

  const [uploadTrigger, setUploadTrigger] = useState(false);

  useEffect(() => {
    if (hasReachedEnd == true) {
      onDone(exercise.name, exercise.duration);
      setUploadTrigger(true);
      playSound5();
    }
  }, [hasReachedEnd]);
  useEffect(() => {
    playSound4();
  }, []);

  return (
    <View style={styles(theme).container}>
      {!hasReachedEnd && (
        <>
          <View style={styles(theme).header}>
            <TouchableOpacity
              onPress={() => {
                stop();
                navigation.goBack();
              }}
              style={styles(theme).button}
            >
              <Text style={styles(theme).headerText2}>X</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                stop();
                navigation.goBack();
              }}
              style={styles(theme).buttonSequence}
            >
              <Text style={styles(theme).headerText}>
                {1 + trackerIdx}/{exercise.sequence.length}
              </Text>
            </TouchableOpacity>
          </View>

          {trackerIdx < 1 ? (
            <View
              style={{
                marginTop: height / 9,
                width: imageSize,
                height: imageSize,
                borderRadius: borderRadius,
                backgroundColor: theme.colors.white,

                overflow: "hidden",
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <View>
                {gif && <Image source={gif} style={styles(theme).image} />}
                <GifReturnHelperSequence
                  exerciseNum={test}
                  sequenceNum={0}
                  onImageSourceChange={handleImageSourceChange}
                />
              </View>
            </View>
          ) : (
            <View
              style={{
                marginTop: height / 9,
                width: imageSize,
                height: imageSize,
                borderRadius: borderRadius,

                overflow: "hidden",
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              {/* <GifReturnHelper
                exerciseNum={test}
                sequenceNum={0}
                imageStyle={styles(theme).image}
              /> */}
              <View>
                {gif && <Image source={gif} style={styles(theme).image} />}
                <GifReturnHelperSequence
                  exerciseNum={test}
                  sequenceNum={trackerIdx}
                  onImageSourceChange={handleImageSourceChange}
                />
              </View>
            </View>
          )}
          <View style={styles(theme).textContainer}>
            <Text style={styles(theme).textName}>
              {sequence.length === 0 ? "PREPARE" : sequence[trackerIdx].name}
            </Text>
            <Text style={styles(theme).textRest}>
              {restState ? " " : "REST"}
            </Text>
            {sequence.length > 0 && countDown >= 0 ? (
              <Text style={styles(theme).textCountdown}>
                {formatSecondsToTime(countDown)}
              </Text>
            ) : (
              <Text style={styles(theme).textCountdown}>00:00</Text>
            )}
          </View>
          <View style={styles(theme).buttonContainer}>
            {trackerIdx > 0 && hasReachedEnd == false && (
              <TouchableOpacity
                onPress={() => {
                  if (trackerIdx > 0 && hasReachedEnd == false) {
                    removeFromSequence(trackerIdx);
                    addItemToSequence(trackerIdx - 1);
                    stop();
                  }
                }}
                style={styles(theme).buttonBack}
              >
                <Ionicons
                  name="play"
                  size={28}
                  color={theme.colors.text}
                  style={[
                    styles(theme).buttonBackImage,
                    { transform: [{ scaleX: -1 }] },
                  ]}
                />
              </TouchableOpacity>
            )}
            {sequence.length === 0 ? (
              <TouchableOpacity
                style={styles(theme).mainButton}
                onPress={() => addItemToSequence(0)}
              >
                <Text style={styles(theme).buttonPlay}>PLAY</Text>
              </TouchableOpacity>
            ) : isRunning ? (
              <TouchableOpacity
                style={styles(theme).mainButton}
                onPress={() => stop()}
              >
                <Text style={styles(theme).buttonPlay}>PAUSE</Text>
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
                style={styles(theme).mainButton}
              >
                <Text style={styles(theme).buttonPlay}>PLAY</Text>
              </TouchableOpacity>
            )}
            {trackerIdx < exercise.sequence.length - 1 &&
              hasReachedEnd == false && (
                <TouchableOpacity
                  onPress={() => {
                    if (hasReachedEnd == false) {
                      if (trackerIdx == -1) {
                        addItemToSequence(0);
                      } else {
                        addItemToSequence(trackerIdx + 1);
                        stop();
                      }
                    }
                  }}
                  style={styles(theme).buttonNext}
                >
                  {/* <Text>Next</Text> */}
                  {/* <Image
                    source={NButton}
                    style={styles(theme).buttonNextImage}
                  /> */}
                  <Ionicons
                    name="play"
                    size={28}
                    color={theme.colors.text}
                    style={styles(theme).buttonNextImage}
                  />
                </TouchableOpacity>
              )}
          </View>
        </>
      )}
      {hasReachedEnd && (
        <>
          <View style={styles(theme).header}>
            <Text style={styles(theme).headerText}>
              {1 + trackerIdx}/{exercise.sequence.length}
            </Text>
          </View>
          <Image source={starp} style={styles(theme).doneStar1} />
          <Image source={Celeb} style={styles(theme).gif} />
          <Image source={starp} style={styles(theme).doneStar2} />
          <Text style={styles(theme).doneText}>
            Good Job! You've completed an exercise!
          </Text>

          <View style={styles(theme).buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={styles(theme).mainButton}
            >
              <Text style={styles(theme).buttonPlay}>DONE</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: "space-between",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
    },
    button: {
      justifyContent: "center",
    },
    mainButton: {
      justifyContent: "center",
      borderRadius: 30,
      width: 150,
      height: 50,
      backgroundColor: theme.colors.text,
    },
    buttonPlay: {
      color: theme.colors.textOpposite,
      textAlign: "center",
      fontFamily: theme.fonts.bold,
      fontSize: 30,
    },
    buttonNextImage: {
      width: 30,
      height: 30,
      resizeMode: "contain",
    },
    buttonBackImage: {
      width: 30,
      height: 30,
      resizeMode: "contain",
    },
    buttonNext: {
      position: "absolute",
      top: 26,
      right: 40,
    },
    buttonBack: {
      position: "absolute",
      top: 26,
      left: 40,
    },
    buttonSequence: {
      justifyContent: "center",
      backgroundColor: theme.colors.text,
      width: 50,
      height: 50,
      borderRadius: 100,
      position: "absolute",
      right: 10,
      alignContent: "center",
      top: 30,
    },
    headerText: {
      fontFamily: theme.fonts.bold,
      color: theme.colors.textOpposite,
      fontSize: 16,
      textAlign: "center",
    },
    headerText2: {
      fontFamily: theme.fonts.bold,
      color: theme.colors.text,
      fontSize: 16,
      alignContent: "center",
      textAlign: "center",
      position: "absolute",
      left: 10,
      top: 25,
    },
    image: {
      justifyContent: "center",
      alignContent: "center",
      alignSelf: "center",
      alignItems: "center",
      width: imageSize,
      height: imageSize,
      resizeMode: "contain",
      borderRadius: borderRadius,
    },
    textContainer: {
      padding: 16,
      alignContent: "center",
      alignItems: "center",
    },
    text: {
      color: theme.colors.text,
      fontSize: 22,
      marginBottom: 8,
      fontFamily: theme.fonts.regular,
    },
    textName: {
      color: theme.colors.text,
      textAlign: "center",
      fontSize: 30,
      fontFamily: theme.fonts.regular,
    },
    textRest: {
      marginTop: 30,
      color: theme.colors.text,
      fontSize: 22,
      fontFamily: theme.fonts.regular,
    },
    textCountdown: {
      marginTop: 0,
      color: theme.colors.text,
      fontSize: 60,
      fontFamily: theme.fonts.bold,
    },
    doneText: {
      color: theme.colors.text,
      fontSize: 30,
      textAlign: "center",
      padding: 30,
      fontFamily: theme.fonts.bold,
      justifyContent: "center",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
      padding: 16,
      marginBottom: 100,
    },
    doneStar2: {
      position: "absolute",
      width: 40,
      height: 40,
      top: "27%",
      left: "10%",
      transform: [{ rotate: "20deg" }],
    },
    doneStar1: {
      position: "absolute",
      width: 40,
      height: 40,
      top: "43%",
      right: "10%",
      transform: [{ rotate: "-20deg" }],
    },
    gif: {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      right: 0,
      resizeMode: "contain",
    },
  });
