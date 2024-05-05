import {
  getUsers,
  updateAchievement,
  updateUser,
} from "@/helpers/userDataHelpers";
import { Achievement } from "@/types/data";
import { useEffect, useState } from "react";
import achievementNotificationHelper from "@/helpers/achievementNotificationHelper";

interface INewUserData {
  light_purple_count: number;
  purple_count: number;
  kettle_points: number;
  dark_purple_count: number;
  achievements: Achievement;
}

export default function useCheckAcheivements() {
  const [trigger, setTrigger] = useState(0);
  const [newUserData, setNewUserData] = useState<INewUserData>({
    light_purple_count: 0,
    purple_count: 0,
    kettle_points: 0,
    dark_purple_count: 0,
    achievements: {
      step_champ: false,
      progress_champ: false,
      streak_star: false,
      health_foodie: false,
      calorie_crusher: false,
      sleep_sensei: false,
      workout_warrior: false,
    },
  });

  const updateAchievement = (achievementKey: string, newValue: boolean) => {
    setNewUserData((prevUserData) => ({
      ...prevUserData,
      achievements: {
        ...prevUserData.achievements,
        [achievementKey]: newValue,
      },
    }));
  };

  const updateUserData1 = (
    light_points_update?: number,
    purple_points_update?: number,
    dark_points_update?: number,
    kettle_update?: number
  ) => {
    setNewUserData((prevUserData) => ({
      ...prevUserData,
      light_purple_count: light_points_update as number,
      purple_count: purple_points_update as number,
      dark_purple_count: dark_points_update as number,
      kettle_points: kettle_update as number,
    }));
  };

  const updateUserData = (achievementType: string) => {
    if (achievementType === "light_purple") {
      setNewUserData((prevUserData) => ({
        ...prevUserData,
        light_purple_count: prevUserData.light_purple_count + 4,
        kettle_points: prevUserData.kettle_points + 15,
      }));
    } else if (achievementType === "purple_healthy_foodie") {
      setNewUserData((prevUserData) => ({
        ...prevUserData,
        purple_count: prevUserData.purple_count + 3,
        kettle_points: prevUserData.kettle_points + 13,
      }));
    } else if (achievementType === "purple_calorie_crusher") {
      setNewUserData((prevUserData) => ({
        ...prevUserData,
        purple_count: prevUserData.purple_count + 2,
        kettle_points: prevUserData.kettle_points + 12,
      }));
    } else if (achievementType === "dark_purple") {
      setNewUserData((prevUserData) => ({
        ...prevUserData,
        dark_purple_count: prevUserData.dark_purple_count + 4,
        kettle_points: prevUserData.kettle_points + 15,
      }));
    }
  };

  useEffect(() => {
    const retreive = async () => {
      const users = await getUsers();
      const {
        achievements,
        steps,
        points,
        fitness_streak,
        meal,
        cal_burned,
        sleep_time,
        done_workouts,
        light_purple_count,
        purple_count,
        dark_purple_count,
        kettle_points,
      } = users;

      updateUserData1(
        light_purple_count,
        purple_count,
        dark_purple_count,
        kettle_points
      );

      updateAchievement("step_champ", achievements!.step_champ as boolean);
      updateAchievement(
        "progress_champ",
        achievements!.progress_champ as boolean
      );
      updateAchievement("streak_star", achievements!.streak_star as boolean);
      updateAchievement(
        "health_foodie",
        achievements!.health_foodie as boolean
      );
      updateAchievement(
        "calorie_crusher",
        achievements!.calorie_crusher as boolean
      );
      updateAchievement("sleep_sensei", achievements!.sleep_sensei as boolean);
      updateAchievement(
        "workout_warrior",
        achievements!.workout_warrior as boolean
      );

      const totalSteps = steps!.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.steps_count;
      }, 0);

      const totalCalories = cal_burned!.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.cal_count;
      }, 0);

      const totalSleep = sleep_time!.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.sleep_count;
      }, 0);

      if (achievements!.step_champ == false && totalSteps >= 15000) {
        updateAchievement("step_champ", true);
        updateUserData("light_purple");
      }

      if (achievements!.progress_champ == false && points == 1000) {
        updateAchievement("progress_champ", true);
        updateUserData("light_purple");
      }

      if (achievements!.streak_star == false && fitness_streak!.length >= 3) {
        updateAchievement("streak_star", true);
        updateUserData("light_purple");
      }

      if (achievements!.health_foodie == false && meal!.length >= 9) {
        updateAchievement("health_foodie", true);
        updateUserData("purple_healthy_foodie");
      }

      if (achievements!.calorie_crusher == false && totalCalories >= 500) {
        updateAchievement("calorie_crusher", true);
        updateUserData("purple_calorie_crusher");
      }

      if (achievements!.sleep_sensei == false && totalSleep >= 30) {
        updateAchievement("sleep_sensei", true);
        updateUserData("dark_purple");
      }

      if (
        achievements!.workout_warrior == false &&
        done_workouts!.length == 6
      ) {
        updateAchievement("workout_warrior", true);
        updateUserData("dark_purple");
      }
    };

    retreive();
  }, []);

  useEffect(() => {
    const load = async () => {
      await updateUser(newUserData);
    };
    load();
  }, [newUserData]);
}
