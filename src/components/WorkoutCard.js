import React, { useEffect, useState } from "react";
import {
  View,
  Text,
 TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import workoutStyles from "../styles/workoutStyles";

const WorkoutCard = ({
  item,
  onPress,
  onDelete,
  onStartEdit,
  onSave,
  onCancel,
  isEditing = false,
  showCategory = false,
  showStatus = false,
  variant = "default",
}) => {
  const isHorizontal = variant === "horizontal";

  // Local state for inline editing.
  const [editedTitle, setEditedTitle] = useState(item.title || "");
  const [editedDescription, setEditedDescription] = useState(
    item.description || ""
  );
  const [editedCategory, setEditedCategory] = useState(item.category || "");

  useEffect(() => {
    setEditedTitle(item.title || "");
    setEditedDescription(item.description || "");
    setEditedCategory(item.category || "");
  }, [item, isEditing]);

  const handleSave = () => {
    if (!onSave) return;

    onSave({
      ...item,
      title: editedTitle,
      description: editedDescription,
      category: editedCategory,
    });
  };

  return (
    <View
      style={
        isHorizontal
          ? workoutStyles.horizontalWorkoutCard
          : workoutStyles.workoutCard
      }
    >
      <TouchableOpacity
        onPress={() => {
          if (!isEditing && onPress) {
            onPress(item);
          }
        }}
        activeOpacity={0.8}
      >
        {item.image ? (
          <Image
            source={item.image}
            resizeMode="contain"
            style={
              isHorizontal
                ? workoutStyles.horizontalWorkoutImage
                : workoutStyles.workoutImage
            }
          />
        ) : null}

        {isEditing ? (
          <>
            <Text style={workoutStyles.label}>Title</Text>
            <TextInput
              value={editedTitle}
              onChangeText={setEditedTitle}
              style={workoutStyles.inlineInput}
              placeholder="Title"
            />

            <Text style={workoutStyles.label}>Description</Text>
            <TextInput
              value={editedDescription}
              onChangeText={setEditedDescription}
              style={[workoutStyles.inlineInput, workoutStyles.inlineMultiline]}
              placeholder="Description"
              multiline
            />

            <Text style={workoutStyles.label}>Category</Text>
            <TextInput
              value={editedCategory}
              onChangeText={setEditedCategory}
              style={workoutStyles.inlineInput}
              placeholder="Category"
            />
          </>
        ) : (
          <>
            <Text
              style={
                isHorizontal
                  ? workoutStyles.horizontalWorkoutTitle
                  : workoutStyles.workoutTitle
              }
            >
              {item.title}
            </Text>

            {item.description && !isHorizontal ? (
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
          </>
        )}
      </TouchableOpacity>

      {!isHorizontal ? (
        <View style={workoutStyles.cardActionRow}>
          {!isEditing ? (
            <>
              {onStartEdit ? (
                <TouchableOpacity
                  style={workoutStyles.cardIconButton}
                  onPress={() => onStartEdit(item)}
                >
                  <MaterialIcons name="edit" size={22} color="#ffffff" />
                </TouchableOpacity>
              ) : null}

              {onDelete ? (
                <TouchableOpacity
                  style={workoutStyles.cardIconButton}
                  onPress={() => onDelete(item.id, item.title)}
                >
                  <MaterialIcons name="delete" size={22} color="#ffffff" />
                </TouchableOpacity>
              ) : null}
            </>
          ) : (
            <>
              {onSave ? (
                <TouchableOpacity
                  style={workoutStyles.cardIconButton}
                  onPress={handleSave}
                >
                  <MaterialIcons name="save" size={22} color="#ffffff" />
                </TouchableOpacity>
              ) : null}

              {onCancel ? (
                <TouchableOpacity
                  style={workoutStyles.cardIconButton}
                  onPress={() => onCancel(item)}
                >
                  <MaterialIcons name="cancel" size={22} color="#ffffff" />
                </TouchableOpacity>
              ) : null}

              {onDelete ? (
                <TouchableOpacity
                  style={workoutStyles.cardIconButton}
                  onPress={() => onDelete(item.id, item.title)}
                >
                  <MaterialIcons name="delete" size={22} color="#ffffff" />
                </TouchableOpacity>
              ) : null}
            </>
          )}
        </View>
      ) : null}
    </View>
  );
};

export default WorkoutCard;