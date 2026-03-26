import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import WorkoutDetailScreen from "./src/screens/WorkoutDetailScreen";
import AddWorkoutScreen from "./src/screens/AddWorkoutScreen";
import ViewWorkoutsScreen from "./src/screens/ViewWorkoutsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="WorkoutDetail"
          component={WorkoutDetailScreen}
          options={{ title: "Workout Detail" }}
        />

        <Stack.Screen
          name="AddWorkout"
          component={AddWorkoutScreen}
          options={{ title: "Add Workout" }}
        />

        <Stack.Screen
          name="ViewWorkouts"
          component={ViewWorkoutsScreen}
          options={{ title: "View Workouts" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}