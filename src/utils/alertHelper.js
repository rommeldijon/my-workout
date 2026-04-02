import { Alert, Platform } from "react-native";

export const showAlert = (title, message, onOk) => {
  if (Platform.OS === "web") {
    window.alert(`${title}\n\n${message}`);
    if (onOk) onOk();
  } else {
    Alert.alert(
      title,
      message,
      onOk ? [{ text: "OK", onPress: onOk }] : undefined
    );
  }
};