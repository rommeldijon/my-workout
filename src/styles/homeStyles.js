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
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerIcon: {
    fontSize: 24,
    color: colors.black,
    fontWeight: "bold",
  },
  headerLogo: {
    width: 45,
    height: 45,
  },
  welcomeCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    elevation: 2,
    alignItems: "center",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 4,
    textAlign: "center",
  },
  subheading: {
    fontSize: 12,
    color: "#555",
    lineHeight: 22,
    textAlign: "center",
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  smallActionButton: {
    flex: 1,
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  smallActionButtonText: {
    color: colors.white,
    fontSize: 14,
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
    fontSize: 16,
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
    width: 120,
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
    alignSelf: "center",
  },
  horizontalWorkoutImage: {
    width: "100%",
    height: 80,
    borderRadius: 10,
    marginBottom: 8,
    alignSelf: "center",
  },
  workoutTitle: {
    fontSize: 10,
    fontWeight: "500",
    color: colors.black,
    marginBottom: 6,
  },
  workoutDescription: {
    fontSize: 10,
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
    width: 40,
    height: 40,
    borderRadius: 20,
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