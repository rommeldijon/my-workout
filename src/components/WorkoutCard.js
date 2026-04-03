import React from "react";
import { TouchableOpacity, Text, Image, View } from "react-native";

import workoutStyles from "../styles/workoutStyles";

const WorkoutCard = ({
  item,
  onPress,
  variant = "default",
  showCategory = true,
  showStatus = false,
}) => {
  const cardStyle =
    variant === "horizontal"
      ? workoutStyles.horizontalWorkoutCard
      : variant === "done"
      ? workoutStyles.doneWorkoutCard
      : workoutStyles.workoutCard;

  const imageStyle =
    variant === "horizontal"
      ? workoutStyles.horizontalWorkoutImage
      : workoutStyles.workoutImage;

  return (
    <TouchableOpacity style={cardStyle} onPress={() => onPress(item)}>
      {item?.image ? <Image source={item.image} style={imageStyle} /> : null}

      <Text style={workoutStyles.workoutTitle}>
        {item?.title || "Untitled Workout"}
      </Text>

      <Text style={workoutStyles.workoutDescription}>
        {item?.description || "No description available"}
      </Text>

      {showCategory ? (
        <Text style={workoutStyles.workoutMeta}>
          Category: {item?.category || "N/A"}
        </Text>
      ) : null}

      {showStatus ? (
        <Text style={workoutStyles.workoutMeta}>
          Status: {item?.completed ? "Done" : "To Do"}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default WorkoutCard;