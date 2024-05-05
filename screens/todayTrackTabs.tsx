import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import CustomHeader from "@/components/CustomHeader";
import { getUsers } from "@/helpers/userDataHelpers";
import convertDataHelper from "@/helpers/convertDateHelper";
import { User } from "@/types/data";
import { ThemeContext, Theme } from "@/themes/ThemeContext";
import BButton from "@/assets/HomeAssets/b_arrow.png";
import NButton from "@/assets/HomeAssets/n_arrow.png";

const { width, height } = Dimensions.get("window");

// Function to get the total steps count for each day of the current week
function getTotalStepsForCurrentWeek(
  countData: any,
  propertyName: any
): { [key: string]: number } {
  const currentDate = new Date();
  const startOfWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - currentDate.getDay()
  );
  const endOfWeek = new Date(
    startOfWeek.getFullYear(),
    startOfWeek.getMonth(),
    startOfWeek.getDate() + 6
  );

  const stepsForWeek: { [key: string]: number } = {};

  for (
    let date = startOfWeek;
    date <= endOfWeek;
    date.setDate(date.getDate() + 1)
  ) {
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    stepsForWeek[dateString] = 0;
  }

  for (const { date, [propertyName]: count } of countData) {
    if (stepsForWeek[date]) {
      stepsForWeek[date] += count;
    }
  }

  return stepsForWeek;
}

// Function to get the total steps count for each month of the current year
function getTotalStepsForCurrentYear(
  countData: any,
  propertyName: any
): {
  [key: string]: number;
} {
  const currentYear = new Date().getFullYear();
  const countForYear: { [key: string]: number } = {};

  for (let month = 0; month < 12; month++) {
    const monthString = `${currentYear}-${(month + 1)
      .toString()
      .padStart(2, "0")}`;
    countForYear[monthString] = 0;
  }

  for (const { date, [propertyName]: count } of countData) {
    const [year, month] = date.split("-");
    if (parseInt(year) === currentYear) {
      const monthString = `${year}-${month}`;
      countForYear[monthString] += count;
    }
  }

  return countForYear;
}

// Function to get the total steps count for each year from 2024 to 2029
function getTotalStepsForYears(
  countData: any,
  propertyName: any
): { [key: string]: number } {
  const stepsForYears: { [key: string]: number } = {};

  for (let year = 2024; year <= 2029; year++) {
    stepsForYears[year.toString()] = 0;
  }

  for (const { date, [propertyName]: count } of countData) {
    const year = parseInt(date.split("-")[0]);
    if (year >= 2024 && year <= 2029) {
      stepsForYears[year.toString()] += count;
    }
  }

  return stepsForYears;
}

const daysOfWeek = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type TUserData = {
  steps: any[] | undefined;
  minutes: any[] | undefined;
  cal_burned: any[] | undefined;
  sleep_time: any[] | undefined;
  stress_level: any[] | undefined;
  water_intake: any[] | undefined;
  period: any[] | undefined;
  weight_track: any[] | undefined;
};

export default function TodayTrackTab({ route, navigation }: any) {
  const { theme } = useContext(ThemeContext);
  const { type, key, count_key, image } = route.params;
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const [weekData, setWeekData] = useState<any>({});
  const [monthData, setMonthData] = useState<any>({});
  const [yearData, setYearData] = useState<any>({});
  const [timePeriodFilter, setTimePeriodFilter] = useState<any>({
    week: true,
    month: false,
    year: false,
  });
  useEffect(() => {
    const retrieve = async () => {
      const users = await getUsers();
      const {
        steps,
        minutes,
        cal_burned,
        sleep_time,
        stress_level,
        water_intake,
        period,
        weight_track,
      } = users;
      const dataToPass = {
        steps: key === "steps" ? steps : [key],
        minutes: key === "minutes" ? minutes : [key],
        cal_burned: key === "cal_burned" ? cal_burned : [key],
        sleep_time: key === "sleep_time" ? sleep_time : [key],
        stress_level: key === "stress_level" ? stress_level : [key],
        water_intake: key === "water_intake" ? water_intake : [key],
        period: key === "period" ? period : [key],
        weight_track: key === "weight_track" ? weight_track : [key],
      };

      setWeekData(
        getTotalStepsForCurrentWeek(
          dataToPass[key as keyof TUserData] || [],
          count_key
        )
      );
      setMonthData(
        getTotalStepsForCurrentYear(
          dataToPass[key as keyof TUserData] || [],
          count_key
        )
      );
      setYearData(
        getTotalStepsForYears(
          dataToPass[key as keyof TUserData] || [],
          count_key
        )
      );
    };
    retrieve();
  }, []);

  const weekContainer = (weekData: any) => {
    const items: { day: string; value: any }[] = Object.entries(weekData).map(
      ([dateStr, value]: [string, any]) => {
        let value_text = "";
        if (key == "steps") {
          value = value.toFixed(0);
          value_text = value + " steps";
        } else if (key == "minutes") {
          value = value.toFixed(0);
          value_text = value + " min";
        } else if (key == "cal_burned") {
          value = value.toFixed(0);
          value_text = value + " kcal";
        } else if (key == "sleep_time") {
          value = value.toFixed(0);
          value_text = value + " hrs";
        } else if (key == "water_intake") {
          value = value.toFixed(0);
          value_text = value + " cups";
        } else if (key == "stress_level") {
          if (value == 0) {
            value_text = "No stress";
          } else if (value == 1) {
            value_text = "Minimal";
          } else if (value == 2) {
            value_text = "Mild";
          } else if (value == 3) {
            value_text = "Moderate";
          } else if (value == 4) {
            value_text = "Severe";
          }
        } else if (key == "period") {
          if (value == 0) {
            value_text = "No Peroid";
          } else {
            value = value.toFixed(0);
            value_text = "Day " + value;
          }
        } else if (key == "weight_track") {
          value = value.toFixed(0);
          value_text = value + "kg";
        }
        const dayIndex = new Date(dateStr).getDay();
        const day = daysOfWeek[dayIndex];
        return { day, value: value_text };
      }
    );
    return (
      <View style={styles(theme).containerTab}>
        <View style={styles(theme).topRow}>
          {items.slice(0, 4).map((item: any, index: any) => (
            <TouchableOpacity
              key={index}
              style={styles(theme).column}
              onPress={item.onPress}
            >
              <Text style={styles(theme).itemText}>{item.day}</Text>
              <Text style={styles(theme).itemTextNumber}>{item.value}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles(theme).topRow}>
          {items.slice(4, 7).map((item: any, index: any) => (
            <TouchableOpacity
              key={index}
              style={styles(theme).centered}
              onPress={item.onPress}
            >
              <Text style={styles(theme).itemText}>{item.day}</Text>
              <Text style={styles(theme).itemTextNumber}>{item.value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setShowNext(true);
      if (currentPage == 1) {
        setShowPrev(false);
      }
    }
  };

  const handleNextPage = () => {
    if (
      currentPage <
      Math.ceil(Object.keys(monthData).length / itemsPerPage) - 1
    ) {
      setCurrentPage(currentPage + 1);
      setShowPrev(true);
      if (
        currentPage ===
        Math.ceil(Object.keys(monthData).length / itemsPerPage) - 2
      ) {
        setShowNext(false);
      }
    }
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const monthContainer = (monthData: any) => {
    const items: { day: string; value: any }[] = Object.entries(monthData).map(
      ([dateStr, value]: [string, any]) => {
        let value_text = "";
        if (key == "steps") {
          value = value.toFixed(0);
          value_text = value + " steps";
        } else if (key == "minutes") {
          value = value.toFixed(0);
          value_text = value + " min";
        } else if (key == "cal_burned") {
          value = value.toFixed(0);
          value_text = value + " kcal";
        } else if (key == "sleep_time") {
          value = value.toFixed(0);
          value_text = value + " hrs";
        } else if (key == "water_intake") {
          value = value.toFixed(0);
          value_text = value + " cups";
        } else if (key == "stress_level") {
          if (value == 0) {
            value_text = "No stress";
          } else if (value == 1) {
            value_text = "Minimal";
          } else if (value == 2) {
            value_text = "Mild";
          } else if (value == 3) {
            value_text = "Moderate";
          } else if (value == 4) {
            value_text = "Severe";
          }
        } else if (key == "period") {
          if (value == 0) {
            value_text = "No Peroid";
          } else {
            value = value.toFixed(0);
            value_text = "Day " + value;
          }
        } else if (key == "weight_track") {
          value = value.toFixed(0);
          value_text = value + "kg";
        }
        const dayIndex = new Date(dateStr).getMonth();
        const day = monthNames[dayIndex];
        return { day, value: value_text };
      }
    );
    return (
      <View style={styles(theme).containerTab}>
        <View style={styles(theme).topRowLeft}>
          {items
            .slice(startIndex, startIndex + 3)
            .map((item: any, index: any) => (
              <TouchableOpacity
                key={index}
                style={styles(theme).columnLeft}
                onPress={item.onPress}
              >
                <Text style={styles(theme).itemText}>{item.day}</Text>
                <Text style={styles(theme).itemTextNumber}>{item.value}</Text>
              </TouchableOpacity>
            ))}
        </View>
        <View style={styles(theme).topRowRight}>
          {items
            .slice(startIndex + 3, endIndex)
            .map((item: any, index: any) => (
              <TouchableOpacity
                key={index}
                style={styles(theme).centeredRight}
                onPress={item.onPress}
              >
                <Text style={styles(theme).itemText}>{item.day}</Text>
                <Text style={styles(theme).itemTextNumber}>{item.value}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    );
  };

  const yearContainer = (yearData: any) => {
    const items: { day: string; value: any }[] = Object.entries(yearData).map(
      ([dateStr, value]: [string, any]) => {
        let value_text = "";
        if (key == "steps") {
          value = value.toFixed(0);
          value_text = value + " steps";
        } else if (key == "minutes") {
          value = value.toFixed(0);
          value_text = value + " min";
        } else if (key == "cal_burned") {
          value = value.toFixed(0);
          value_text = value + " kcal";
        } else if (key == "sleep_time") {
          value = value.toFixed(0);
          value_text = value + " hrs";
        } else if (key == "water_intake") {
          value = value.toFixed(0);
          value_text = value + " cups";
        } else if (key == "stress_level") {
          if (value == 0) {
            value_text = "No stress";
          } else if (value == 1) {
            value_text = "Minimal";
          } else if (value == 2) {
            value_text = "Mild";
          } else if (value == 3) {
            value_text = "Moderate";
          } else if (value == 4) {
            value_text = "Severe";
          }
        } else if (key == "period") {
          if (value == 0) {
            value_text = "No Peroid";
          } else {
            value = value.toFixed(0);
            value_text = "Day " + value;
          }
        } else if (key == "weight_track") {
          value = value.toFixed(0);
          value_text = value + "kg";
        }
        return { day: dateStr, value: value_text };
      }
    );
    return (
      <View style={styles(theme).containerTab}>
        <View style={styles(theme).topRowLeft}>
          {items.slice(0, 3).map((item: any, index: any) => (
            <TouchableOpacity
              key={index}
              style={styles(theme).columnLeft}
              onPress={item.onPress}
            >
              <Text style={styles(theme).itemText}>{item.day}</Text>
              <Text style={styles(theme).itemTextNumber}>{item.value}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles(theme).topRowRight}>
          {items.slice(3, 6).map((item: any, index: any) => (
            <TouchableOpacity
              key={index}
              style={styles(theme).centeredRight}
              onPress={item.onPress}
            >
              <Text style={styles(theme).itemText}>{item.day}</Text>
              <Text style={styles(theme).itemTextNumber}>{item.value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).headerContainer}>
        <CustomHeader navigation={navigation} isMin={false} />
      </View>

      <View style={styles(theme).contentContainer}>
        <View style={styles(theme).buttonContainer}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles(theme).buttonx}
          >
            <Text style={styles(theme).xText}>X</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              setTimePeriodFilter(() => ({
                week: true,
                month: false,
                year: false,
              }))
            }
            style={[
              timePeriodFilter.week
                ? styles(theme).selectedButton
                : styles(theme).button,
            ]}
          >
            <Text style={styles(theme).buttonText}>Week</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              setTimePeriodFilter(() => ({
                week: false,
                month: true,
                year: false,
              }))
            }
            style={[
              timePeriodFilter.month
                ? styles(theme).selectedButton
                : styles(theme).button,
            ]}
          >
            <Text style={styles(theme).buttonText}>Month</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              setTimePeriodFilter(() => ({
                week: false,
                month: false,
                year: true,
              }))
            }
            style={[
              timePeriodFilter.year
                ? styles(theme).selectedButton
                : styles(theme).button,
            ]}
          >
            <Text style={styles(theme).buttonText}>Year</Text>
          </Pressable>
        </View>
        <Text style={styles(theme).text}>{formattedDate}</Text>
        <Image source={image} style={styles(theme).image} />
        <Text style={styles(theme).text2}>{type}</Text>
        <View style={styles(theme).containerTabs}>
          {timePeriodFilter.week && weekContainer(weekData)}
          {timePeriodFilter.month && monthContainer(monthData)}
          {timePeriodFilter.year && yearContainer(yearData)}
          <View style={styles(theme).line} />
        </View>
      </View>

      {timePeriodFilter.month && (
        <>
          {showPrev && (
            <TouchableOpacity onPress={handlePrevPage}>
              {/* <Text style={styles(theme).buttonText}>Prev</Text> */}
              <Image source={BButton} style={styles(theme).pbutton} />
            </TouchableOpacity>
          )}
          {showNext && (
            <TouchableOpacity onPress={handleNextPage}>
              {/* <Text style={styles(theme).buttonText}>Next</Text> */}
              <Image source={NButton} style={styles(theme).nbutton} />
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.background,
      width: "100%",
      height: "100%",
    },
    contentContainer: {
      flex: 1,
      alignItems: "center",
      marginTop: 120,
    },
    buttonContainer: {
      width: "90%",
      flexDirection: "row",
      justifyContent: "center",
    },
    button: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: theme.colors.purple,
      fontFamily: theme.fonts.regular,
      paddingVertical: 1,
      paddingHorizontal: 15,
      borderRadius: 8,
    },
    buttonx: {
      color: theme.colors.purple,
      fontFamily: theme.fonts.regular,
      justifyContent: "center",
      paddingVertical: 1,
      paddingHorizontal: 5,
    },
    selectedButton: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: theme.colors.light_purple,
      fontFamily: theme.fonts.regular,
      paddingVertical: 1,
      paddingHorizontal: 15,
      borderRadius: 8,
    },
    buttonText: {
      color: theme.colors.white,
      fontFamily: theme.fonts.bold,
      fontSize: 12,
      alignSelf: "center",
    },
    xText: {
      color: theme.colors.purple,
      fontFamily: theme.fonts.bold,
      fontSize: 20,
    },
    text: {
      fontFamily: theme.fonts.bold,
      color: theme.colors.primary,
      fontSize: 14,
      marginVertical: 16,
      textAlign: "center",
    },
    text2: {
      fontFamily: theme.fonts.bold,
      color: theme.colors.text,
      fontSize: 32,
      marginVertical: 16,
      textAlign: "center",
    },
    image: {
      resizeMode: "contain",
      width: "100%",
      height: "30%",
    },
    headerContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
    },
    paginationContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    column: {
      flex: 1,
      marginHorizontal: 10,
      marginTop: 10,
      alignItems: "center",
      borderRadius: 10,
      backgroundColor: theme.colors.pink,
      width: 75,
      height: 75,
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
      backgroundColor: theme.colors.pink,
      width: 75,
      height: 75,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.35,
      shadowRadius: 4.84,
      marginHorizontal: 10,
      marginTop: 20,
      elevation: 5, // This is for Android
    },
    columnLeft: {
      margin: 10,
      alignItems: "center",
      borderRadius: 10,
      backgroundColor: theme.colors.pink,
      width: 75,
      height: 75,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.35,
      shadowRadius: 4.84,
      elevation: 5, // This is for Android
    },
    centeredRight: {
      alignItems: "center",
      borderRadius: 10,
      backgroundColor: theme.colors.pink,
      width: 75,
      height: 75,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.35,
      shadowRadius: 4.84,
      marginHorizontal: 10,
      marginTop: 10,
      elevation: 5, // This is for Android
    },
    line: {
      marginTop: 40,
      marginBottom: 40,
      alignContent: "center",
      alignSelf: "center",
      width: "90%",
      opacity: 0.7,
      height: 0.5,
      backgroundColor: "black",
    },
    containerTab: {},
    containerTabs: {
      marginTop: 10,
      width: "100%",
    },
    topRow: {
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
    },
    topRowLeft: {
      flexDirection: "row",
      justifyContent: "flex-start",
      width: "100%",
    },
    topRowRight: {
      flexDirection: "row",
      justifyContent: "flex-end",
      width: "100%",
    },
    itemText: {
      paddingTop: 5,
      fontSize: 12,
      fontFamily: theme.fonts.bold,
      color: "#2B0029",
      opacity: 0.5,
    },
    itemTextNumber: {
      paddingTop: 10,
      fontSize: 16,
      fontFamily: theme.fonts.bold,
      color: theme.colors.dark_purple,
      textAlign: "center",
    },
    pbutton: {
      resizeMode: "contain",
      position: "absolute",
      bottom: height * 0.23,
      left: -13,
      width: 20,
      height: 25,
    },
    nbutton: {
      resizeMode: "contain",
      position: "absolute",
      bottom: height * 0.23,
      right: -13,
      width: 20,
      height: 25,
    },
  });
