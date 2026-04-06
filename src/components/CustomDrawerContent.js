import React from "react";
import { Alert, Platform } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import { clearLoggedInUser } from "../services/storageService";

const showLogoutAlert = (title, message, onConfirm) => {
  if (Platform.OS === "web") {
    const confirmed = window.confirm(`${title}\n\n${message}`);
    if (confirmed && onConfirm) {
      onConfirm();
    }
  } else {
    Alert.alert(title, message, [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: onConfirm },
    ]);
  }
};

export default function CustomDrawerContent(props) {
  const handleLogout = async () => {
    showLogoutAlert("Logout", "Are you sure you want to log out?", async () => {
      try {
        await clearLoggedInUser();
        props.navigation.closeDrawer();
        props.navigation.getParent()?.replace("Login");
      } catch (error) {
        console.log("Logout error:", error);

        if (Platform.OS === "web") {
          window.alert("Error\n\nFailed to log out.");
        } else {
          Alert.alert("Error", "Failed to log out.");
        }
      }
    });
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={handleLogout} />
    </DrawerContentScrollView>
  );
}