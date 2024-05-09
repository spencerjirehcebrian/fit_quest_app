import { useState, useEffect } from "react";
import { Pedometer } from "expo-sensors";
import { getUsers, updateUser } from "@/helpers/userDataHelpers";
import convertDataHelper from "./convertDateHelper";

export default function useStepCounter() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [stepCount, setStepCount] = useState(0);

  const onDone = async (duration: number) => {
    const date = new Date();
    const formattedDate = convertDataHelper(date);
    let user = await getUsers();
    const yesterday = new Date(date.getTime() - 24 * 60 * 60 * 1000);
    const formattedYesterday = convertDataHelper(yesterday);

    let { steps, cal_burned, fitness_streak } = user;
    const existingStepsIndex = steps!.findIndex(
      (item) => item.date === formattedDate
    );
    const existingCalBurnedIndex = cal_burned!.findIndex(
      (item) => item.date === formattedDate
    );

    if (existingStepsIndex === -1) {
      steps!.push({ date: formattedDate, steps_count: duration });
    } else {
      if (steps![existingStepsIndex].steps_count >= duration) {
        steps![existingStepsIndex].steps_count += 5;
      } else {
        steps![existingStepsIndex].steps_count = duration;
      }
    }

    const calories = duration * 0.04;
    if (existingCalBurnedIndex === -1) {
      cal_burned!.push({ date: formattedDate, cal_count: calories });
    } else {
      if (cal_burned![existingCalBurnedIndex].cal_count <= calories) {
        cal_burned![existingCalBurnedIndex].cal_count =
          cal_burned![existingCalBurnedIndex].cal_count - calories + calories;
      }
    }
    if (
      fitness_streak?.length === 0 ||
      fitness_streak?.[fitness_streak.length - 1] !== formattedYesterday
    ) {
      fitness_streak = [formattedDate];
    } else if (
      fitness_streak?.[fitness_streak.length - 1] === formattedYesterday
    ) {
      fitness_streak = [...fitness_streak, formattedDate];
    }
    user = { ...user, steps, cal_burned, fitness_streak };

    await updateUser(user);
  };

  const requestPedometerPermission = async () => {
    try {
      const { status } = await Pedometer.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Pedometer permission denied");
        return false;
      }

      //   console.log(status);
      return true;
    } catch (error) {
      console.log("Error requesting pedometer permission:", error);
      return false;
    }
  };

  //   const getStepCount = async () => {
  //     const isAvailable = await Pedometer.isAvailableAsync();
  //     setIsPedometerAvailable(String(isAvailable));

  //     if (isAvailable) {
  //       //   const now = new Date();
  //       //   const midnight = new Date(
  //       //     now.getFullYear(),
  //       //     now.getMonth(),
  //       //     now.getDate(),
  //       //     0,
  //       //     0,
  //       //     0
  //       //   );
  //       //   const stepCountResult = await Pedometer.getStepCountAsync(midnight, now);
  //       //   if (stepCountResult) {
  //       //     setStepCount(stepCountResult.steps);
  //       //     console.log(stepCountResult.steps);
  //       //     onDone(stepCountResult.steps);
  //       //   }
  //       //   console.log(stepCountResult);
  //     }
  //   };

  //   useEffect(() => {
  //     requestPedometerPermission();
  //     getStepCount();
  //   }, []);
  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      return Pedometer.watchStepCount((result) => {
        console.log("steps", result.steps);
        onDone(result.steps);
      });
    } else {
      // alert("There is no available pedometer on this device");
    }
  };

  useEffect(() => {
    requestPedometerPermission();
    subscribe();
  }, []);
}
