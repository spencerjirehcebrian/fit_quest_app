import { useEffect, useState } from "react";
import * as Font from "expo-font";
import {
  clearGlobals,
  getGlobals,
  initGlobals,
} from "@/helpers/globalsDataHelpers";
import {
  clearExercises,
  getExercises,
  initExercises,
} from "@/helpers/exerciseDataHelpers";
import { clearUsers, getUsers, initUsers } from "@/helpers/userDataHelpers";

export default function useCachedResources() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        // await clearGlobals();
        // await clearExercises();
        // await clearUsers();
        await initGlobals();
        await initExercises();
        await initUsers();
        await Font.loadAsync({
          "Inter-Regular": require("@/assets/fonts/Inter-Regular.ttf"),
          "Inter-Medium": require("@/assets/fonts/Inter-Medium.ttf"),
          "Inter-Bold": require("@/assets/fonts/Inter-Bold.ttf"),
        });
      } catch (error) {
        console.warn(error);
      } finally {
        // const globals = await getGlobals();
        // const users = await getUsers();
        // const exercises = await getExercises();
        // console.log(globals, users, exercises);
        setIsLoadingComplete(true);
        // console.log("Fonts Loaded");
      }
    };
    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
