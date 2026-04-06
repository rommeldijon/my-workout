import { Alert, Platform } from "react-native";

export const showAlert = (title, message, onOk) => {
  if (Platform.OS === "web") {
    window.alert(`${title}\n\n${message}`);
    if (onOk) onOk();
  } else {
    Alert.alert(
      title,
      message,
      onOk ? [{ text: "OK", onPress: onOk }] : [{ text: "OK" }]
    );
  }
};

export const showConfirmAlert = (title, message, onConfirm) => {
  if (Platform.OS === "web") {
    const confirmed = window.confirm(`${title}\n\n${message}`);
    if (confirmed && onConfirm) onConfirm();
  } else {
    Alert.alert(title, message, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: onConfirm },
    ]);
  }
};