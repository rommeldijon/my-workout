import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Notifications</Text>
        <Switch />
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#222",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  settingText: {
    fontSize: 18,
    color: "#333",
  },
});