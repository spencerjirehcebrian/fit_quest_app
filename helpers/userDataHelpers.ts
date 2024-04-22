import {
  containsKey,
  getData,
  removeItem,
  storeData,
} from "@/helpers/dataHelpers";
import data from "@/data.json";
import { User } from "@/types/data";
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
    // const meow = await getUsers();
    // console.log(meow);
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

    user.meal?.push(newUserDataWithMeal);

    user = { ...user, ...newUserDataWithMeal };
    // console.log("user", user);

    await storeData("user", user);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};
