import {
  containsKey,
  getData,
  removeItem,
  storeData,
} from "@/helpers/dataHelpers";
import data from "@/data.json";
import { Globals } from "@/types/data";

export const getGlobalsLogged = async (): Promise<boolean> => {
  const globals = await getData("globals");
  const check = globals["isLoggedIn"];
  // console.log(check);
  return check;
};

export const getGlobals = async (): Promise<Globals> => {
  const globals = await getData("globals");
  return globals;
};

export const initGlobals = async (): Promise<boolean> => {
  const hasGlobals = await containsKey("globals");
  if (!hasGlobals) {
    const { globals } = data;
    await storeData("globals", globals);
    return true;
  }
  return false;
};

export const clearGlobals = async (): Promise<void> => {
  await removeItem("globals");
};
export const getGlobalsBySlug = async (slug: string): Promise<Globals[]> => {
  const globals = await getGlobals();
  return globals;
};

export const storeGlobals = async (newGlobals: Globals): Promise<boolean> => {
  const globals = await getGlobals();
  console.log(globals);
  await storeData("globals", [...globals, newGlobals]);
  return true;
};

export const updateGlobals = async (newglobalsData: Globals): Promise<void> => {
  try {
    // 1. Retrieve the existing "globals" object from AsyncStorage
    const globalsString = await getData("globals");
    console.log(globalsString);
    let globals: Globals = globalsString;

    // 2. Update the "globals" object with the new values
    globals = { ...globals, ...newglobalsData };
    console.log("globals", globals);

    // 3. Save the updated "globals" object back to AsyncStorage
    await storeData("globals", globals);
    // const meow = await getGlobals();
    // console.log(meow);
  } catch (error) {
    console.error("Error updating globals:", error);
  }
};
