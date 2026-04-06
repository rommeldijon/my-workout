import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import workoutStyles from "../styles/workoutStyles";

const WorkoutCard = ({
  item,
  onPress,
  onDelete,
  showCategory = false,
  showStatus = false,
}) => {
  return (
    <View style={workoutStyles.workoutCard}>
      <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.8}>
        {item.image ? (
          <Image source={item.image} style={workoutStyles.workoutImage} />
        ) : null}

        <Text style={workoutStyles.workoutTitle}>{item.title}</Text>

        {item.description ? (
          <Text style={workoutStyles.workoutDescription}>
            {item.description}
          </Text>
        ) : null}

        {showCategory && item.category ? (
          <Text style={workoutStyles.workoutCategory}>
            Category: {item.category}
          </Text>
        ) : null}

        {showStatus ? (
          <Text style={workoutStyles.workoutStatus}>
            Status: {item.completed ? "Completed" : "Not Completed"}
          </Text>
        ) : null}
      </TouchableOpacity>

      {onDelete ? (
        <TouchableOpacity
          style={workoutStyles.deleteButton}
          onPress={() => onDelete(item.id, item.title)}
        >
          <Text style={workoutStyles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default WorkoutCard;