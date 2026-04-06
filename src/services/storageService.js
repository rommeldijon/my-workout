import AsyncStorage from "@react-native-async-storage/async-storage";
import storageKeys from "../constants/storageKeys";

export const getUsers = async () => {
  const storedUsers = await AsyncStorage.getItem(storageKeys.users);
  return storedUsers ? JSON.parse(storedUsers) : [];
};

export const saveUsers = async (users) => {
  await AsyncStorage.setItem(storageKeys.users, JSON.stringify(users));
};

export const saveUserDetails = async (userDetails) => {
  const existingUsers = await getUsers();
  const updatedUsers = [...existingUsers, userDetails];
  await saveUsers(updatedUsers);
};

export const getUserDetails = async (email) => {
  const users = await getUsers();

  if (!email) return null;

  return users.find(
    (user) => user.email.trim().toLowerCase() === email.trim().toLowerCase()
  ) || null;
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

export const getCurrentUser = async () => {
  const loggedInEmail = await getLoggedInUser();

  if (!loggedInEmail) return null;

  return await getUserDetails(loggedInEmail);
};

export const getWorkouts = async () => {
  const loggedInEmail = await getLoggedInUser();
  const storedWorkouts = await AsyncStorage.getItem(storageKeys.workouts);
  const allWorkouts = storedWorkouts ? JSON.parse(storedWorkouts) : {};

  if (!loggedInEmail) return [];

  return allWorkouts[loggedInEmail] || [];
};

export const saveWorkouts = async (workouts) => {
  const loggedInEmail = await getLoggedInUser();
  const storedWorkouts = await AsyncStorage.getItem(storageKeys.workouts);
  const allWorkouts = storedWorkouts ? JSON.parse(storedWorkouts) : {};

  if (!loggedInEmail) return;

  allWorkouts[loggedInEmail] = workouts;
  await AsyncStorage.setItem(storageKeys.workouts, JSON.stringify(allWorkouts));
};

export const addWorkout = async (newWorkout) => {
  const existingWorkouts = await getWorkouts();
  const updatedWorkouts = [...existingWorkouts, newWorkout];
  await saveWorkouts(updatedWorkouts);
  return updatedWorkouts;
};