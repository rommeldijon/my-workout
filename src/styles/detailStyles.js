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
    resizeMode: "contain",
    alignSelf: "center",
  },
});

export default detailStyles;