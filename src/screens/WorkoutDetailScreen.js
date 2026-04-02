import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

const WorkoutDetailScreen = ({ route, navigation }) => {
  const { item } = route.params || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Workout Details</Text>

      <View style={styles.card}>
        {item?.image ? (
          <Image source={item.image} style={styles.image} />
        ) : null}

        <Text style={styles.label}>Title</Text>
        <Text style={styles.value}>{item?.title || "No title available"}</Text>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>
          {item?.description || "No description available"}
        </Text>

        <Text style={styles.label}>Category</Text>
        <Text style={styles.value}>{item?.category || "No category"}</Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>
          {item?.completed ? "Done" : "To Do"}
        </Text>

        <Text style={styles.label}>Workout ID</Text>
        <Text style={styles.value}>{item?.id || "No ID available"}</Text>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Previous</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default WorkoutDetailScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F4F7FB",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#222",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
    marginTop: 10,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  value: {
    fontSize: 18,
    color: "#222",
    lineHeight: 26,
  },
  backButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 12,
    resizeMode: "contain",
    alignSelf: "center",
  },
});