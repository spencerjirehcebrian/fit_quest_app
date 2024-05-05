import convertDateHelper from "@/helpers/convertDateHelper";
import React, { useEffect } from "react";
import { getUsers, updateUser } from "@/helpers/userDataHelpers";

const useLoginStreak = () => {
  const retrieve = async () => {
    const users = await getUsers();
    if (users) {
      let { fitness_streak } = users;

      const today = new Date();
      const formattedToday = convertDateHelper(today);

      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      const formattedYesterday = convertDateHelper(yesterday);

      // console.log(
      //   formattedToday,
      //   formattedYesterday,
      //   fitness_streak?.[fitness_streak.length - 1]
      // );
      if (
        fitness_streak?.length === 0 ||
        fitness_streak?.[fitness_streak.length - 1] !== formattedYesterday
      ) {
        fitness_streak = [formattedToday];
      } else if (
        fitness_streak?.[fitness_streak.length - 1] === formattedYesterday
      ) {
        fitness_streak = [...fitness_streak, formattedToday];
      }
      await updateUser({ fitness_streak: fitness_streak });
    }
  };
  retrieve();
};

export default useLoginStreak;
