import {
  containsKey,
  getData,
  removeItem,
  storeData,
} from "@/helpers/dataHelpers";
import data from "@/data.json";
import { Achievement, User } from "@/types/data";
import { MealFormData } from "@/components/MealComponents/MainMealComponent";

export const getUsers = async (): Promise<User> => {
  const user = await getData("user");
  return user;
};
export const initUsers = async (): Promise<boolean> => {
  const hasUsers = await containsKey("user");
  if (!hasUsers) {
    const { user } = data;
    await storeData("user", user);
    return true;
  }
  return false;
};

export const clearUsers = async (): Promise<void> => {
  await removeItem("user");
};
export const getUserBySlug = async (slug: string): Promise<User> => {
  const users = await getUsers();
  return users;
};

// export const storeUser = async (newUser: User): Promise<boolean> => {
//   const users = await getUsers();
//   console.log(users);
//   await storeData("user", [...users, newUser]);
//   return true;
// };

export const updateUser = async (newUserData: User): Promise<void> => {
  try {
    // 1. Retrieve the existing "user" object from AsyncStorage
    const userString = await getData("user");
    let user: User = userString;

    // 2. Update the "user" object with the new values
    user = { ...user, ...newUserData };
    // console.log("user", user);

    // 3. Save the updated "user" object back to AsyncStorage
    await storeData("user", user);
    const meow = await getUsers();
    // console.log(meow);
    console.log("updating");
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const updateMeal = async (
  newUserDataWithMeal: MealFormData
): Promise<void> => {
  try {
    const userString = await getData("user");
    let user: User = userString;

    // Check if meal and meal_type exist in the newUserDataWithMeal object
    if (newUserDataWithMeal.date && newUserDataWithMeal.meal_type) {
      // Find the index of the meal with the same data and meal_type
      const mealIndex = user.meal?.findIndex(
        (meal) =>
          meal.date === newUserDataWithMeal.date &&
          meal.meal_type === newUserDataWithMeal.meal_type
      );

      if (mealIndex !== -1) {
        // Update the existing meal
        user.meal![mealIndex!] = newUserDataWithMeal;
      } else {
        // If no matching meal found, push the new meal
        user.meal?.push(newUserDataWithMeal);
      }
    } else {
      // If data or meal_type is missing, push the new meal
      user.meal?.push(newUserDataWithMeal);
    }

    // console.log("user", user);
    await storeData("user", user);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};
export const updateAchievement = async (
  achievementsToUpdate: Partial<Achievement>
) => {
  try {
    const user = await getUsers();
    if (user !== null) {
      const updatedAchievements: Achievement = { ...(user.achievements || {}) };

      // Update the specific keys in updatedAchievements with the values from achievementsToUpdate
      for (const key in achievementsToUpdate) {
        updatedAchievements[key] = achievementsToUpdate[key];
      }

      user.achievements = updatedAchievements;

      // Save the updated user object
      await storeData("user", user);

      // console.log(user);
    }
  } catch (error) {
    console.error("Error retrieving user data:", error);
  }
};

export const addOrUpdateStats = async () => {};
