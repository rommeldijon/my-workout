import "react-native-gesture-handler";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import WorkoutDetailScreen from "./src/screens/WorkoutDetailScreen";
import AddWorkoutScreen from "./src/screens/AddWorkoutScreen";
import ViewWorkoutsScreen from "./src/screens/ViewWorkoutsScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
 
  return (
    <Drawer.Navigator
      initialRouteName="Home"
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

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}