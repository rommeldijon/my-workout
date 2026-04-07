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
  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 12,
    alignSelf: "center",
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
});

export default detailStyles;