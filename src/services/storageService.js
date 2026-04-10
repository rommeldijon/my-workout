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

  return (
    users.find(
      (user) => user.email.trim().toLowerCase() === email.trim().toLowerCase()
    ) || null
  );
};

export const saveLoggedInUser = async (email) => {
  await AsyncStorage.setItem(
    storageKeys.loggedInUser,
    email.trim().toLowerCase()
  );
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

// Normalize workout objects so older data still works with the new app structure.
const normalizeWorkout = (workout) => {
  const currentStatus =
    workout.status || (workout.completed ? "Done" : "To Do");

  return {
    ...workout,
    status: currentStatus,
    completed: currentStatus === "Done",
    imageKey: workout.imageKey || "",
    imageUri: workout.imageUri || "",
  };
};

const getAllWorkoutsMap = async () => {
  const storedWorkouts = await AsyncStorage.getItem(storageKeys.workouts);

  if (!storedWorkouts) {
    return {};
  }

  const parsedWorkouts = JSON.parse(storedWorkouts);

  // Support old data format where workouts were stored as one plain array.
  if (Array.isArray(parsedWorkouts)) {
    const loggedInEmail = await getLoggedInUser();

    if (!loggedInEmail) {
      return {};
    }

    return {
      [loggedInEmail]: parsedWorkouts.map(normalizeWorkout),
    };
  }

  // New format: workouts grouped by logged-in user's email.
  const normalizedMap = {};

  Object.keys(parsedWorkouts || {}).forEach((email) => {
    normalizedMap[email] = (parsedWorkouts[email] || []).map(normalizeWorkout);
  });

  return normalizedMap;
};

export const getWorkouts = async () => {
  const loggedInEmail = await getLoggedInUser();

  if (!loggedInEmail) return [];

  const allWorkouts = await getAllWorkoutsMap();

  return allWorkouts[loggedInEmail] || [];
};

export const saveWorkouts = async (workouts) => {
  const loggedInEmail = await getLoggedInUser();

  if (!loggedInEmail) return;

  const allWorkouts = await getAllWorkoutsMap();
  allWorkouts[loggedInEmail] = workouts.map(normalizeWorkout);

  await AsyncStorage.setItem(storageKeys.workouts, JSON.stringify(allWorkouts));
};

export const addWorkout = async (newWorkout) => {
  const existingWorkouts = await getWorkouts();
  const updatedWorkouts = [...existingWorkouts, normalizeWorkout(newWorkout)];
  await saveWorkouts(updatedWorkouts);
  return updatedWorkouts;
};

export const updateWorkout = async (updatedWorkout) => {
  const existingWorkouts = await getWorkouts();

  const updatedWorkouts = existingWorkouts.map((workout) =>
    workout.id === updatedWorkout.id
      ? normalizeWorkout(updatedWorkout)
      : normalizeWorkout(workout)
  );

  await saveWorkouts(updatedWorkouts);
  return updatedWorkouts;
};

export const deleteWorkout = async (workoutId) => {
  const existingWorkouts = await getWorkouts();

  const updatedWorkouts = existingWorkouts.filter(
    (workout) => workout.id !== workoutId
  );

  await saveWorkouts(updatedWorkouts);
  return updatedWorkouts;
};