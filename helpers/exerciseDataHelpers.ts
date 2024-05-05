import {
  containsKey,
  getData,
  removeItem,
  storeData,
} from "@/helpers/dataHelpers";
import data from "@/data.json";
import { Exercise, SequenceType } from "@/types/data";

export const getExercises = async (): Promise<Exercise[]> => {
  const exercise = await getData("exercises");
  return exercise;
};
export const getExercisesByIndex = async (
  index: number
): Promise<SequenceType[]> => {
  try {
    const exercises = await getExercises();
    if (index >= 0 && index < exercises.length) {
      return exercises[index].sequence;
    }
    return []; // Return an empty array if the index is out of bounds
  } catch (error) {
    console.error("Error retrieving sequence from AsyncStorage:", error);
    return [];
  }
};
export const initExercises = async (): Promise<boolean> => {
  const hasExercises = await containsKey("exercises");
  if (!hasExercises) {
    const { exercises } = data;
    console.log("Storing data");
    await storeData("exercises", exercises);
    return true;
  }
  return false;
};

export const clearExercises = async (): Promise<void> => {
  await removeItem("exercises");
};

export const storeExercise = async (
  newExercise: Exercise
): Promise<boolean> => {
  const exercises = await getExercises();
  console.log(exercises);
  // await storeData("exercises", [...exercises, newExercise]);
  return true;
};
