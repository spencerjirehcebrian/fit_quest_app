import { getGlobals, getGlobalsLogged } from "@/helpers/globalsDataHelpers";
import React, { memo, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import CustomHeader from "@/components/CustomHeader";
import useCheckAcheivements from "@/hooks/useCheckAcheivements";
import useLoginStreak from "@/hooks/useLoginStreak";
import ToggleTrackParentComponent from "@/components/TodayComponents/ToggleTrackParentComponent";
import { getUsers, updateUser } from "@/helpers/userDataHelpers";
import { Exercise, Globals, User } from "@/types/data";
import TodayTobModal from "@/components/Modals/TodayTabModal";
import convertDataHelper from "@/helpers/convertDateHelper";
import HalfScreenModal from "@/components/Modals/HalfScreenModal";
import { ThemeContext, Theme } from "@/themes/ThemeContext";
import achievementCalIcon from "@/assets/TabsAssets/cal.png";
import medicationIcon from "@/assets/TabsAssets/medication.png";
import minutesIcon from "@/assets/TabsAssets/mins.png";
import notificationIcon from "@/assets/TabsAssets/notif.png";
import periodIcon from "@/assets/TabsAssets/period.png";
import plusIcon from "@/assets/TabsAssets/plus.png";
import sleepIcon from "@/assets/TabsAssets/sleep.png";
import stepsIcon from "@/assets/TabsAssets/steps.png";
import streakIcon from "@/assets/TabsAssets/streak.png";
import stressIcon from "@/assets/TabsAssets/stress.png";
import waterIcon from "@/assets/TabsAssets/water.png";
import weightIcon from "@/assets/TabsAssets/weight.png";
import circle from "@/assets/HomeAssets/circle.png";
import PressableExerciseComponent from "@/components/ExerciseComponents/PressableExerciseComponent";
import { getExercises } from "@/helpers/exerciseDataHelpers";
import useStepCounter from "@/helpers/stepCounter";
import WheelPicker from "react-native-wheely";

const { width, height } = Dimensions.get("window");
const titles = [
  ["Steps", "steps", "steps_count", stepsIcon],
  ["Minutes", "minutes", "min_count", minutesIcon],
  ["Calories Burned", "cal_burned", "cal_count", achievementCalIcon],
  ["Sleep Time", "sleep_time", "sleep_count", sleepIcon],
  ["Stress Level", "stress_level", "stress_count", stressIcon],
  ["Water Intake", "water_intake", "water_count", waterIcon],
  ["Period", "period", "period_count", periodIcon],
  ["Weight Track", "weight_track", "weight_count", weightIcon],
  ["Medication", "water_intake", "water_count", medicationIcon],
  ["Reminder", "water_intake", "water_count", notificationIcon],
  ["Fitness Streak", "water_intake", "water_count", streakIcon],
  ["Track Tabs", "water_intake", "water_count"],
];

function generateSleepArray() {
  let array = [];
  for (let x = 1; x <= 24; x++) {
    array.push(`${x} hrs`);
  }
  return array;
}
function generateCupsArray() {
  let array = [];
  for (let x = 1; x <= 20; x++) {
    array.push(`${x} cups`);
  }
  return array;
}

function generatePeriodArray() {
  let array = ["No Period"];
  for (let x = 1; x <= 30; x++) {
    array.push(`Day ${x}`);
  }
  return array;
}

function generateWeightArray() {
  let array = [];
  for (let x = 130; x >= 30; x--) {
    array.push(`${x} kg`);
  }
  return array;
}

interface itemType {
  name?: string;
  description?: string;
  onPress: () => void;
  image?: any;
  updateAble?: boolean;
}
const RenderItems = memo(
  ({ items, startIndex }: { items: any; startIndex: number }) => {
    const itemsO: itemType[] = Object.values(items) as itemType[];
    const { theme } = useContext(ThemeContext);

    const slicedItems = itemsO.slice(startIndex, startIndex + 3);

    return (
      <View style={styles(theme).containerTab}>
        <View style={styles(theme).topRow}>
          {slicedItems.slice(0, 2).map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles(theme).column}
              onPress={item.onPress}
            >
              {item.updateAble && (
                <TouchableOpacity style={styles(theme).dot2} />
              )}
              {item.name && (
                <Image source={item.image} style={styles(theme).image} />
              )}
              {!item.name && (
                <Image source={item.image} style={styles(theme).imageFull} />
              )}
              {item.name && (
                <Text style={styles(theme).itemText}>{item.name}</Text>
              )}
              {item.description && (
                <Text style={styles(theme).itemTextNumber}>
                  {item.description}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
        {slicedItems[2] && (
          <TouchableOpacity
            style={styles(theme).centered}
            onPress={slicedItems[2].onPress}
          >
            {slicedItems[2].updateAble && (
              <TouchableOpacity style={styles(theme).dot2} />
            )}
            {slicedItems[2].name && (
              <>
                <Image
                  source={slicedItems[2].image}
                  style={styles(theme).imageBot}
                />
                <Text style={styles(theme).itemText}>
                  {slicedItems[2].name}
                </Text>
                {slicedItems[2].description && (
                  <Text style={styles(theme).itemTextNumber}>
                    {slicedItems[2].description}
                  </Text>
                )}
              </>
            )}
            {!slicedItems[2].name && (
              <View style={styles(theme).viewImageBotCenter}>
                <Image
                  source={slicedItems[2].image}
                  style={styles(theme).imageBotCenter}
                />
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

const RenderDots = memo(
  ({
    items,
    startIndex,
    handlePageChange,
  }: {
    items: any;
    startIndex: number;
    handlePageChange: (i: number) => void;
  }) => {
    const { theme } = useContext(ThemeContext);
    const itemsO: itemType[] = Object.values(items) as itemType[];
    const totalPages = Math.ceil(itemsO.length / 3);
    const dots: any[] = [];

    for (let i = 0; i < totalPages; i++) {
      dots.push(
        <TouchableOpacity
          key={i}
          style={[
            styles(theme).dot,
            i === startIndex / 3 ? styles(theme).activeDot : null,
          ]}
          onPress={() => handlePageChange(i)}
        />
      );
    }

    return <View style={styles(theme).dotContainer}>{dots}</View>;
  }
);

const TodayScreen: React.FC = ({ navigation }: any) => {
  useStepCounter();
  const { theme } = useContext(ThemeContext);
  const [percentage, setPercentage] = useState(0);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [showStates, setShowStates] = useState<Globals>();
  const [userData, setUserData] = useState<User>({});
  const [items, setItems] = useState<itemType[]>([]);
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [medication, setMedication] = useState(0);
  const [reminder, setReminder] = useState(0);

  const sleepArray = generateSleepArray();
  const [sleepIndex, setSleepIndex] = useState(0);
  const updateSleep = (index: number) => {
    setSleepIndex(index);
    setDataHolder((prevState) => ({
      ...prevState,
      sleep_time_update: index + 1 || 0,
    }));
  };

  const stressArray = ["Minimal", "Mild", "Moderate", "Severe"];
  const [stressIndex, setStressIndex] = useState(0);
  const updateStress = (index: number) => {
    setStressIndex(index);
    setDataHolder((prevState) => ({
      ...prevState,
      stress_level_update: index + 1 || 0,
    }));
  };

  const cupsArray = generateCupsArray();
  const [cupsIndex, setCupsIndex] = useState(0);
  const updateCups = (index: number) => {
    setCupsIndex(index);
    setDataHolder((prevState) => ({
      ...prevState,
      water_intake_update: index + 1 || 0,
    }));
  };

  const periodArray = generatePeriodArray();
  const [periodIndex, setPeriodIndex] = useState(0);
  const updatePeriod = (index: number) => {
    setPeriodIndex(index);
    setDataHolder((prevState) => ({
      ...prevState,
      period_update: index + 1 || 0,
    }));
  };

  const weightArray = generateWeightArray();
  const [weightIndex, setWeightIndex] = useState(50);
  const updateWeight = (index: number) => {
    setWeightIndex(index);
    setDataHolder((prevState) => ({
      ...prevState,
      weight_track_update: 130 - index || 0,
    }));
  };

  const [exerciseData, setExerciseData] = useState<Exercise[]>();

  const [halfModalVisibilities, setHalfModalVisibilities] = useState(
    Array(12).fill(false)
  );

  const [modalVisibilities, setModalVisibilities] = useState(
    Array(12).fill(false)
  );

  const toggleModal = (index: number) => {
    if (index === 0 || index === 1 || index === 2) {
      openTrackTab(
        index,
        titles[index][0],
        titles[index][1],
        titles[index][2],
        titles[index][3]
      );
    } else if (index === 8 || index === 9 || index === 11) {
      toggleHalfModal(index);
    } else if (index !== 10) {
      setModalVisibilities((prevVisibilities) =>
        prevVisibilities.map((visible, i) => (i === index ? !visible : visible))
      );
    }
  };

  const toggleHalfModal = (index: number) => {
    setHalfModalVisibilities((prevVisibilities) =>
      prevVisibilities.map((visible, i) => (i === index ? !visible : visible))
    );
  };

  useEffect(() => {
    const retrieve = async () => {
      const user = await getUsers();
      const global = await getGlobals();

      const {
        steps,
        minutes,
        cal_burned,
        sleep_time,
        stress_level,
        water_intake,
        period,
        weight_track,
        fitness_streak,
        reminder,
        medication,
        points,
      } = user;

      setPercentage(points!);

      const date = new Date();
      const formattedDate = convertDataHelper(date);
      const currentDateItem = (
        property: any,
        formattedDate: string,
        count_key: any
      ) => {
        const currentDay = property.find(
          (obj: any) => obj.date === formattedDate
        );
        // console.log(property, currentDay);
        return currentDay ? currentDay[count_key] : 0;
      };

      const min_count = currentDateItem(minutes, formattedDate, "min_count");
      const steps_count = currentDateItem(steps, formattedDate, "steps_count");
      const cal_burned_count = currentDateItem(
        cal_burned,
        formattedDate,
        "cal_count"
      );
      const sleep_time_count = currentDateItem(
        sleep_time,
        formattedDate,
        "sleep_count"
      );
      const stress_level_count = currentDateItem(
        stress_level,
        formattedDate,
        "stress_count"
      );
      const water_intake_count = currentDateItem(
        water_intake,
        formattedDate,
        "water_count"
      );

      const weight_track_count = currentDateItem(
        weight_track,
        formattedDate,
        "weight_count"
      );

      setShowStates(global);
      // console.log(global);
      setUserData(user);
      let tempItemData: itemType[] = [];

      if (global!.show_steps) {
        tempItemData.push({
          name: "Steps",
          description: `${steps_count} steps`,
          onPress: () => toggleModal(0),
          image: stepsIcon,
        });
      }

      if (global!.show_minutes) {
        tempItemData.push({
          name: "Minutes",
          description: `${min_count} mins`,
          onPress: () => toggleModal(1),
          image: minutesIcon,
        });
      }

      if (global!.show_calories) {
        tempItemData.push({
          name: "Calories",
          description: `${cal_burned_count} cal`,
          onPress: () => toggleModal(2),
          image: achievementCalIcon,
        });
      }

      if (global!.show_sleep) {
        tempItemData.push({
          name: "Sleep",
          description: `${sleep_time_count} hrs`,
          onPress: () => toggleModal(3),
          image: sleepIcon,
          updateAble: true,
        });
      }

      if (global!.show_stress) {
        let stress_level_display = "No Stress";

        if (stress_level_count == 1) {
          stress_level_display = "Minimal";
        }
        if (stress_level_count == 2) {
          stress_level_display = "Moderate";
        }
        if (stress_level_count == 3) {
          stress_level_display = "High";
        }
        if (stress_level_count == 4) {
          stress_level_display = "Severe";
        }
        tempItemData.push({
          name: "Stress",
          description: `${stress_level_display}`,
          onPress: () => toggleModal(4),
          image: stressIcon,
          updateAble: true,
        });
      }

      if (global!.show_water) {
        tempItemData.push({
          name: "Water",
          description: `${water_intake_count} cups`,
          onPress: () => toggleModal(5),
          image: waterIcon,
          updateAble: true,
        });
      }

      let period_display = `Day ${period}`;
      if (period == 0) {
        period_display = "No Period";
      }
      if (global!.show_period) {
        tempItemData.push({
          name: "Period",
          description: period_display,
          onPress: () => toggleModal(6),
          image: periodIcon,
          updateAble: true,
        });
      }

      if (global!.show_weight) {
        tempItemData.push({
          name: "Weight",
          description: `${weight_track_count} kg`,
          onPress: () => toggleModal(7),
          image: weightIcon,
          updateAble: true,
        });
      }
      if (global!.show_medication) {
        tempItemData.push({
          name: "Medication",
          onPress: () => toggleModal(8),
          image: medicationIcon,
          description: `-`,
        });
      }
      if (global!.show_reminder) {
        tempItemData.push({
          name: "Reminder",
          onPress: () => toggleModal(9),
          image: notificationIcon,
          description: `-`,
        });
      }
      if (global!.show_fitness_streak) {
        tempItemData.push({
          name: "Streak",
          description: `${fitness_streak?.length} Days`,
          onPress: () => toggleModal(10),
          image: streakIcon,
        });
      }
      tempItemData.push({
        onPress: () => toggleModal(11),
        image: plusIcon,
      });
      setItems(() => ({
        ...tempItemData,
      }));
      // console.log(tempItemData);
    };
    retrieve();
  }, [halfModalVisibilities, modalVisibilities, startIndex]);

  const handlePageChange = (pageIndex: number) => {
    setStartIndex(pageIndex * 3);
  };

  useEffect(() => {
    const check = async () => {
      const isLoggedIn = await getGlobalsLogged();
      const randomNumber1 = Math.floor(Math.random() * 6);
      setRandomNumber(randomNumber1);
      const exercise = await getExercises();
      setExerciseData(exercise);
      if (!isLoggedIn) {
        navigation.navigate("Landing");
      }
      // useLoginStreak();
    };
    check();
  }, []);

  const openTrackTab = async (
    index: number,
    type: string,
    key: string,
    count_key: string,
    image?: any
  ) => {
    if (index == 0 || index == 1 || index == 2) {
      navigation.navigate("TodayTrackTab", {
        type,
        navigation,
        key,
        count_key,
        image,
      });
    } else {
      toggleModal(index);
      navigation.navigate("TodayTrackTab", {
        type,
        navigation,
        key,
        count_key,
        image,
      });
    }
  };

  const [dataHolder, setDataHolder] = useState({
    water_intake_update: 0,
    sleep_time_update: 0,
    period_update: 0,
    stress_level_update: 0,
    medication_update: "",
    weight_track_update: 0,
    reminder_updated: "",
  });

  const onDone = async (
    key: any,
    key_count: any,
    update_number?: number,
    update_string?: string
  ) => {
    // console.log(key, key_count, update_number, update_string);
    const date = new Date();
    const formattedDate = convertDataHelper(date);
    let user = await getUsers();
    for (const [userKey, userValue] of Object.entries(user)) {
      if (userKey === key) {
        if (key === "medication") {
          user = { ...user, medication: update_string };
        } else if (key === "reminder") {
          user = { ...user, reminder: update_string };
        } else if (key === "period") {
          user = { ...user, period: update_number };
        } else {
          const existingIndex = userValue!.findIndex(
            (item: any) => item.date === formattedDate
          );
          if (existingIndex === -1) {
            userValue!.push({
              date: formattedDate,
              [key_count]: update_number,
            });
            // console.log(userValue);
          } else {
            userValue![existingIndex][key_count] = update_number;
            // console.log(userValue);
          }
          user = { ...user, [userKey]: userValue };
        }
      }
    }

    await updateUser(user);
  };
  const specialIndices = [0, 1, 2, 8, 9];

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).containerTabs}>
        <RenderItems items={items} startIndex={startIndex} />
        <RenderDots
          items={items}
          startIndex={startIndex}
          handlePageChange={handlePageChange}
        />
      </View>

      <View style={styles(theme).bottomContainer}>
        <Text style={styles(theme).bottomText3}>Start Exercising!</Text>
        {exerciseData && (
          <PressableExerciseComponent
            navigation={navigation}
            exercise={exerciseData![randomNumber]}
            mainIndex={randomNumber}
          />
        )}

        <View style={styles(theme).line} />
      </View>
      <View style={styles(theme).centerContainer}>
        {/* <CircularBarComponent percentage={percentage} /> */}
        <Image
          source={circle}
          resizeMode="contain"
          style={{
            top: 22,
            left: 10,
            alignItems: "center",
            justifyContent: "center",
            opacity: theme.opacity,
          }}
        />
        <Text style={styles(theme).bottomText}>{percentage * 0.1}%</Text>
        <Text style={styles(theme).bottomText2}>COMPLETE</Text>
      </View>
      <View style={styles(theme).headerContainer}>
        <CustomHeader navigation={navigation} isMin={false} />
      </View>

      {titles.map(
        (title, index) =>
          !specialIndices.includes(index) && (
            <TodayTobModal
              key={index}
              visible={modalVisibilities[index]}
              onClose={() => toggleModal(index)}
              onPressTrackTab={() =>
                openTrackTab(index, title[0], title[1], title[2], title[3])
              }
              onPressUpdateData={() => {
                toggleModal(index);
                toggleHalfModal(index);
              }}
              title={title[0]}
            />
          )
      )}
      <HalfScreenModal
        visible={halfModalVisibilities[5]}
        onClose={() => {
          onDone("water_intake", "water_count", dataHolder.water_intake_update);
          toggleHalfModal(5);
        }}
      >
        <View>
          <Text style={styles(theme).modalText}>Water Intake</Text>
          <WheelPicker
            selectedIndex={cupsIndex}
            options={cupsArray}
            onChange={(index) => {
              updateCups(index);
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
        visible={halfModalVisibilities[6]}
        onClose={() => {
          onDone("period", "", dataHolder.period_update);
          toggleHalfModal(6);
        }}
      >
        <View>
          <Text style={styles(theme).modalText}>Period</Text>
          <WheelPicker
            selectedIndex={periodIndex}
            options={periodArray}
            onChange={(index) => {
              updatePeriod(index);
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
        visible={halfModalVisibilities[3]}
        onClose={() => {
          onDone("sleep_time", "sleep_count", dataHolder.sleep_time_update);
          toggleHalfModal(3);
        }}
      >
        <View style={styles(theme).modal}>
          <Text style={styles(theme).modalText}>Sleeping Time</Text>
          {/* <TextInput
            style={[styles(theme).input]}
            value={dataHolder.sleep_time_update.toString()}
            onChangeText={(value) =>
              setDataHolder((prevState) => ({
                ...prevState,
                sleep_time_update: parseInt(value) || 0,
              }))
            }
            placeholder={"Sleep"}
            inputMode="numeric"
          /> */}
          <WheelPicker
            selectedIndex={sleepIndex}
            options={sleepArray}
            onChange={(index) => {
              updateSleep(index);
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
        visible={halfModalVisibilities[4]}
        onClose={() => {
          onDone(
            "stress_level",
            "stress_count",
            dataHolder.stress_level_update
          );
          toggleHalfModal(4);
        }}
      >
        <View>
          <Text style={styles(theme).modalText}>Stress Level</Text>
          <WheelPicker
            selectedIndex={stressIndex}
            options={stressArray}
            onChange={(index) => {
              updateStress(index);
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
        visible={halfModalVisibilities[8]}
        onClose={() => {
          onDone(
            "medication",
            "medication",
            undefined,
            dataHolder.medication_update
          );
          toggleHalfModal(8);
        }}
      >
        <View>
          <Text style={styles(theme).modalText}>Medication</Text>
          <Text style={styles(theme).modalTextRem}>{userData.medication}</Text>
          <TextInput
            style={[styles(theme).input]}
            value={dataHolder.medication_update.toString()}
            onChangeText={(value) =>
              setDataHolder((prevState) => ({
                ...prevState,
                medication_update: value,
              }))
            }
            numberOfLines={2}
            placeholder={userData.medication}
            placeholderTextColor={"white"}
            inputMode="text"
          />
        </View>
      </HalfScreenModal>
      <HalfScreenModal
        visible={halfModalVisibilities[7]}
        onClose={() => {
          onDone(
            "weight_track",
            "weight_count",
            dataHolder.weight_track_update
          );
          toggleHalfModal(7);
        }}
      >
        <View>
          <Text style={styles(theme).modalText}>Weight Track</Text>
          <WheelPicker
            selectedIndex={weightIndex}
            options={weightArray}
            onChange={(index) => {
              updateWeight(index);
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
        visible={halfModalVisibilities[9]}
        onClose={() => {
          onDone(
            "reminder",
            "reminder_count",
            undefined,
            dataHolder.reminder_updated
          );
          toggleHalfModal(9);
        }}
      >
        <View>
          <Text style={styles(theme).modalText}>Reminder</Text>
          <Text style={styles(theme).modalTextRem}>{userData.reminder}</Text>
          <TextInput
            style={styles(theme).input}
            value={dataHolder.reminder_updated.toString()}
            onChangeText={(value) =>
              setDataHolder((prevState) => ({
                ...prevState,
                reminder_updated: value,
              }))
            }
            placeholder={userData.reminder}
            placeholderTextColor={"white"}
            inputMode="text"
          />
        </View>
      </HalfScreenModal>
      <HalfScreenModal
        visible={halfModalVisibilities[11]}
        onClose={() => {
          toggleHalfModal(11);
        }}
      >
        <View>
          <ToggleTrackParentComponent />
        </View>
      </HalfScreenModal>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
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
      marginTop: 120, // Adjust this value to provide enough space for the header
    },
    containerInner: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "stretch",
    },
    topLeftContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginHorizontal: 10,
    },
    itemContainer: {
      width: (width - 40) / 3,
      alignItems: "center",
      marginVertical: 5,
    },

    image: {
      marginTop: 10,
      resizeMode: "contain",
      width: 30,
      height: 30,
    },
    imageBot: {
      marginTop: 15,
      resizeMode: "contain",
      width: 45,
      height: 45,
    },
    viewImageBotCenter: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    imageBotCenter: {
      width: 25,
      height: 25,
      resizeMode: "contain",
    },
    imageFull: {
      marginTop: 25,
      width: 25,
      height: 25,
      resizeMode: "contain",
    },
    itemText: {
      paddingTop: 1,
      fontSize: 10,
      fontFamily: theme.fonts.bold,
      color: "#CCAFCB",
    },
    itemTextNumber: {
      fontSize: 14,
      fontFamily: theme.fonts.bold,
      color: theme.colors.purple,
      textAlign: "center",
    },
    centerContainer: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      position: "absolute",
      top: height * 0.15,
      left: -110,
    },
    rightContainer: {
      position: "absolute",
      right: 20,
      top: height * 0.75 - 40,
    },
    rightText: {
      fontSize: 16,
      marginBottom: 10,
      textAlign: "right",
    },

    bottomText: {
      position: "absolute",
      top: 120,
      left: 115,
      alignItems: "center",
      alignContent: "center",
      fontSize: 68,
      fontFamily: theme.fonts.regular,
      color: theme.colors.dark_purple,
    },
    bottomText2: {
      position: "absolute",
      top: 190,
      left: 125,
      fontSize: 20,
      fontFamily: theme.fonts.regular,
      color: theme.colors.dark_purple,
    },
    bottomText3: {
      paddingBottom: 5,
      paddingLeft: 25,
      fontSize: 16,
      fontFamily: theme.fonts.bold,
      color: theme.colors.text,
    },
    dotContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 5,
    },
    dot: {
      width: 12,
      height: 12,
      borderRadius: 10,
      backgroundColor: "#ABABAB",
      marginHorizontal: 5,
      marginTop: 10,
    },
    dot2: {
      width: 9,
      height: 9,
      borderRadius: 5,
      backgroundColor: theme.colors.primary,
      position: "absolute",
      top: 5,
      left: 5,
    },
    activeDot: {
      backgroundColor: theme.colors.purple,
    },
    input: {
      marginTop: 20,
      borderWidth: 1,
      borderColor: theme.colors.white,
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 12,
      fontSize: 20,
      color: theme.colors.white,
      fontFamily: theme.fonts.regular,
    },
    inputFocused: {
      borderColor: "#000",
    },
    secureInput: {
      fontFamily: "monospace",
    },
    containerTab: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    containerTabs: {
      zIndex: 1,
      position: "absolute",
      top: height * 0.18,
      right: 10,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    topRow: {
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
    },
    column: {
      flex: 1,
      margin: 10,
      alignItems: "center",
      borderRadius: 10,
      backgroundColor: theme.colors.pink,
      width: 80,
      height: 80,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.35,
      shadowRadius: 4.84,
      elevation: 5, // This is for Android
    },
    centered: {
      alignSelf: "center",
      alignItems: "center",
      borderRadius: 10,
      marginTop: 10,
      backgroundColor: theme.colors.pink,
      width: 100,
      height: 100,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.35,
      shadowRadius: 4.84,
      elevation: 5, // This is for Android
    },
    line: {
      alignContent: "center",
      alignSelf: "center",
      width: "80%",
      opacity: 0.7,
      height: 0.5,
      backgroundColor: "black",
      marginTop: 10,
    },
    bottomContainer: {
      position: "absolute",
      top: height * 0.6,
      width: "100%",
    },
    modal: {
      justifyContent: "space-between",
    },
    modalText: {
      fontSize: 30,
      fontFamily: theme.fonts.bold,
      color: theme.colors.white,
      alignContent: "center",
      alignSelf: "center",
      justifyContent: "center",
      textAlign: "center",
      marginHorizontal: 50,
      marginTop: 30,
      width: "100%",
      height: 50,
      // backgroundColor: theme.colors.light_purple,
    },
    modalTextRem: {
      fontSize: 40,
      marginVertical: 10,
      fontFamily: theme.fonts.regular,
      color: theme.colors.white,
      alignContent: "center",
      alignSelf: "center",
      justifyContent: "center",
      textAlign: "center",
      marginHorizontal: 50,
      width: "100%",
      height: 50,
      // backgroundColor: theme.colors.light_purple,
    },
  });

export default TodayScreen;
