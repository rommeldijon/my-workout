import AsyncStorage from "@react-native-async-storage/async-storage";
import storageKeys from "../constants/storageKeys";

export const getWorkouts = async () => {
  const storedWorkouts = await AsyncStorage.getItem(storageKeys.workouts);
  return storedWorkouts ? JSON.parse(storedWorkouts) : [];
};

export const saveWorkouts = async (workouts) => {
  await AsyncStorage.setItem(storageKeys.workouts, JSON.stringify(workouts));
};

export const addWorkout = async (newWorkout) => {
  const existingWorkouts = await getWorkouts();
  const updatedWorkouts = [...existingWorkouts, newWorkout];
  await saveWorkouts(updatedWorkouts);
  return updatedWorkouts;
};

export const saveUserDetails = async (userDetails) => {
  await AsyncStorage.setItem(
    storageKeys.userDetails,
    JSON.stringify(userDetails)
  );
};

export const getUserDetails = async () => {
  const storedUser = await AsyncStorage.getItem(storageKeys.userDetails);
  return storedUser ? JSON.parse(storedUser) : null;
};

export const saveLoggedInUser = async (email) => {
  await AsyncStorage.setItem(storageKeys.loggedInUser, email);
};

export const getLoggedInUser = async () => {
  return await AsyncStorage.getItem(storageKeys.loggedInUser);
};

export const clearLoggedInUser = async () => {
  await AsyncStorage.removeItem(storageKeys.loggedInUser);
};