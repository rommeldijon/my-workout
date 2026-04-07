import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import workoutStyles from "../styles/workoutStyles";

const WorkoutCard = ({
  item,
  onPress,
  onDelete,
  showCategory = false,
  showStatus = false,
  variant = "default",
}) => {
  const isHorizontal = variant === "horizontal";

  return (
    <View
      style={
        isHorizontal
          ? workoutStyles.horizontalWorkoutCard
          : workoutStyles.workoutCard
      }
    >
      <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.8}>
        {/* Image */}
        {item.image ? (
          <Image
            source={item.image}
            resizeMode={isHorizontal ? "contain" : "contain"}
            style={
              isHorizontal
                ? workoutStyles.horizontalWorkoutImage
                : workoutStyles.workoutImage
            }
          />
        ) : null}

        {/* Title (UPDATED as requested) */}
        <Text
          style={
            isHorizontal
              ? workoutStyles.horizontalWorkoutTitle
              : workoutStyles.workoutTitle
          }
        >
          {item.title}
        </Text>

        {/* Description (hide for horizontal cards) */}
        {item.description && !isHorizontal ? (
          <Text style={workoutStyles.workoutDescription}>
            {item.description}
          </Text>
        ) : null}

        {/* Category */}
        {showCategory && item.category ? (
          <Text style={workoutStyles.workoutCategory}>
            Category: {item.category}
          </Text>
        ) : null}

        {/* Status */}
        {showStatus ? (
          <Text style={workoutStyles.workoutStatus}>
            Status: {item.completed ? "Completed" : "Not Completed"}
          </Text>
        ) : null}
      </TouchableOpacity>

      {/* Delete button (hide for horizontal cards) */}
      {onDelete && !isHorizontal ? (
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