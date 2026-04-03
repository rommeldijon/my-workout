import { StyleSheet } from "react-native";
import colors from "../constants/colors";

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 24,
    paddingBottom: 100,
  },
  screenHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  headerIcon: {
    fontSize: 22,
    color: colors.black,
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.black,
  },
  welcomeCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 18,
    marginBottom: 18,
    elevation: 2,
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 8,
  },
  subheading: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    textAlign: "center",
  },
  actionButtonsContainer: {
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "bold",
  },
  placeholderCard: {
    backgroundColor: "#fff3cd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  placeholderText: {
    color: "#7a5c00",
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 12,
  },
  workoutCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  horizontalScroll: {
    paddingRight: 10,
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
  workoutImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "contain",
    alignSelf: "center",
  },
  horizontalWorkoutImage: {
    width: "100%",
    height: 80,
    borderRadius: 10,
    marginBottom: 8,
    resizeMode: "contain",
    alignSelf: "center",
  },
  workoutTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 6,
  },
  workoutDescription: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  emptySectionText: {
    fontSize: 14,
    color: colors.gray,
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 10,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  fabText: {
    fontSize: 30,
    color: colors.white,
    fontWeight: "bold",
    marginTop: -2,
  },
});

export default homeStyles;