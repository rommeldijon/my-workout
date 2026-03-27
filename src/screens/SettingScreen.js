import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <Text>Dark Mode</Text>
      <Switch />

      <Text>Notifications</Text>
      <Switch />
    </View>
  );
};

export default SettingsScreen;