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
});

export default workoutStyles;