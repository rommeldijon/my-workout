import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import workoutStyles from "../styles/workoutStyles";

const ConfirmModal = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={workoutStyles.modalOverlay}>
        <View style={workoutStyles.modalCard}>
          <Text style={workoutStyles.modalTitle}>{title}</Text>
          <Text style={workoutStyles.modalMessage}>{message}</Text>

          <View style={workoutStyles.modalButtonRow}>
            <TouchableOpacity
              style={workoutStyles.modalCancelButton}
              onPress={onCancel}
            >
              <Text style={workoutStyles.modalCancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={workoutStyles.modalDeleteButton}
              onPress={onConfirm}
            >
              <Text style={workoutStyles.modalDeleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;