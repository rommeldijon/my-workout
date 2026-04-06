import { StyleSheet } from "react-native";
import colors from "../constants/colors";

const workoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
    paddingTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.black,
    marginBottom: 15,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  emptyCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 18,
    marginBottom: 20,
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    textAlign: "center",
  },

  workoutCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  horizontalWorkoutCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 180,
    elevation: 2,
  },
  doneWorkoutCard: {
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
  },

  workoutTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 6,
  },
  workoutDescription: {
    fontSize: 15,
    color: "#555",
    marginBottom: 8,
    lineHeight: 22,
  },
  workoutCategory: {
    fontSize: 14,
    color: "#666",
    marginTop: 6,
  },
  workoutStatus: {
    fontSize: 14,
    color: "#444",
    marginTop: 6,
    fontWeight: "600",
  },
  workoutMeta: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 2,
  },
  workoutImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 12,
    resizeMode: "contain",
    alignSelf: "center",
  },
  horizontalWorkoutImage: {
    width: "100%",
    height: 70,
    borderRadius: 10,
    marginBottom: 8,
    resizeMode: "contain",
    alignSelf: "center",
  },

  backButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  backButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "bold",
  },

  formContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F4F7FB",
  },
  formTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: colors.black,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    marginTop: 10,
  },
  formInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: colors.white,
    marginBottom: 14,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    marginTop: 5,
  },
  statusButton: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 5,
  },
  statusButtonActive: {
    backgroundColor: "#2196F3",
    borderColor: "#2196F3",
  },
  statusButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statusButtonTextActive: {
    color: colors.white,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteButton: {
    marginTop: 12,
    backgroundColor: "#D9534F",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default workoutStyles;