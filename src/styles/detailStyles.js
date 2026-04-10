import { StyleSheet } from "react-native";
import colors from "../constants/colors";

const detailStyles = StyleSheet.create({
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
    color: colors.black,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },

  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.gray,
    marginTop: 10,
    marginBottom: 4,
    textTransform: "uppercase",
  },

  value: {
    fontSize: 18,
    color: colors.black,
    lineHeight: 26,
  },

  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 12,
    alignSelf: "center",
  },

  backButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  backButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "bold",
  },

  deleteButton: {
    backgroundColor: "#D9534F",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 12,
  },

  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  modalContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },

  modalMessage: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },

  modalButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  modalCancelButton: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  modalCancelButtonText: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "600",
  },

  modalDeleteButton: {
    flex: 1,
    backgroundColor: "#D9534F",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  modalDeleteButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#fff",
    marginBottom: 12,
    fontSize: 16,
    color: colors.black,
  },

  multilineInput: {
    minHeight: 90,
    textAlignVertical: "top",
  },

  iconButtonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    marginTop: 10,
    marginBottom: 20,
  },

  iconButton: {
    backgroundColor: "#4A90E2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    minWidth: 100,
  },

  iconButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    marginLeft: 6,
  },

  // New styles for the 3-state status selector in edit mode
  statusContainer: {
    flexDirection: "row",
    backgroundColor: "#E9EEF5",
    borderRadius: 12,
    padding: 4,
    marginBottom: 12,
    marginTop: 4,
  },

  statusButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  statusButtonActive: {
    backgroundColor: "#4A90E2",
  },

  statusButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },

  statusButtonTextActive: {
    color: "#FFFFFF",
  },
});

export default detailStyles;