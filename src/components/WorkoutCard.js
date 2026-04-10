import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import workoutStyles from "../styles/workoutStyles";
import { getExerciseImage } from "../constants/images";

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
  const [editedStatus, setEditedStatus] = useState(
    item.status || (item.completed ? "Done" : "To Do")
  );

  useEffect(() => {
    setEditedTitle(item.title || "");
    setEditedDescription(item.description || "");
    setEditedCategory(item.category || "");
    setEditedStatus(item.status || (item.completed ? "Done" : "To Do"));
  }, [item, isEditing]);

  // Support both built-in local images and URL-based images.
  const workoutImage = getExerciseImage(item.imageKey, item.imageUri);

  // Read-only status used when not editing.
  const currentStatus = item.status || (item.completed ? "Done" : "To Do");

  const handleSave = () => {
    if (!onSave) return;

    onSave({
      ...item,
      title: editedTitle.trim(),
      description: editedDescription.trim(),
      category: editedCategory.trim(),
      status: editedStatus,
      completed: editedStatus === "Done",
    });
  };

  const getStatusStyle = (status) => {
    if (status === "Done") {
      return workoutStyles.statusDone;
    }

    if (status === "Started") {
      return workoutStyles.statusStarted;
    }

    return workoutStyles.statusTodo;
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
        <Image
          source={workoutImage}
          resizeMode={isHorizontal ? "contain" : "cover"}
          style={
            isHorizontal
              ? workoutStyles.horizontalWorkoutImage
              : workoutStyles.workoutImage
          }
        />

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

            {showStatus ? (
              <>
                <Text style={workoutStyles.label}>Status</Text>

                <View style={workoutStyles.statusContainer}>
                  <TouchableOpacity
                    style={[
                      workoutStyles.statusButton,
                      editedStatus === "To Do" &&
                        workoutStyles.statusButtonActive,
                    ]}
                    onPress={() => setEditedStatus("To Do")}
                  >
                    <Text
                      style={[
                        workoutStyles.statusButtonText,
                        editedStatus === "To Do" &&
                          workoutStyles.statusButtonTextActive,
                      ]}
                    >
                      To Do
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      workoutStyles.statusButton,
                      editedStatus === "Started" &&
                        workoutStyles.statusButtonActive,
                    ]}
                    onPress={() => setEditedStatus("Started")}
                  >
                    <Text
                      style={[
                        workoutStyles.statusButtonText,
                        editedStatus === "Started" &&
                          workoutStyles.statusButtonTextActive,
                      ]}
                    >
                      Started
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      workoutStyles.statusButton,
                      editedStatus === "Done" &&
                        workoutStyles.statusButtonActive,
                    ]}
                    onPress={() => setEditedStatus("Done")}
                  >
                    <Text
                      style={[
                        workoutStyles.statusButtonText,
                        editedStatus === "Done" &&
                          workoutStyles.statusButtonTextActive,
                      ]}
                    >
                      Done
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : null}
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
              <Text
                style={[
                  workoutStyles.workoutStatus,
                  getStatusStyle(currentStatus),
                ]}
              >
                Status: {currentStatus}
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