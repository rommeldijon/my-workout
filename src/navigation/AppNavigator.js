import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import HomeScreen from "../screens/HomeScreen";
import WorkoutDetailScreen from "../screens/WorkoutDetailScreen";
import AddWorkoutScreen from "../screens/AddWorkoutScreen";
import ViewWorkoutsScreen from "../screens/ViewWorkoutsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CustomDrawerContent from "../components/CustomDrawerContent";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home", headerShown: false }}
      />

      <Drawer.Screen
        name="AddWorkout"
        component={AddWorkoutScreen}
        options={{ title: "Add Workout", headerShown: true }}
      />

      <Drawer.Screen
        name="ViewWorkouts"
        component={ViewWorkoutsScreen}
        options={{ title: "View Workouts", headerShown: true }}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Settings", headerShown: true }}
      />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Main"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="WorkoutDetail"
        component={WorkoutDetailScreen}
        options={{ title: "Workout Detail", headerShown: true }}
      />
    </Stack.Navigator>
  );
}