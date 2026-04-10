// This file centralizes all image handling for the app.
// It supports BOTH:
// 1. Built-in local images (imageKey)
// 2. Remote images (imageUri)

export const exerciseImages = {
  pushup: require("../../assets/exercises/push_ups.png"),
  squat: require("../../assets/exercises/squat.png"),
  jumpingjacks: require("../../assets/exercises/jumping_jacks.png"),
  plank: require("../../assets/exercises/plank_on_elbows.png"),
  arms: require("../../assets/exercises/arms.png"),
  legs: require("../../assets/exercises/legs.png"),
  back: require("../../assets/exercises/back.png"),
  core: require("../../assets/exercises/core.png"),
  cardio: require("../../assets/exercises/cardio.png"),

  // Default fallback image (IMPORTANT)
  // Make sure this file exists in your assets folder
  default: require("../../assets/exercises/default.png"),
};

export const appImages = {
  logo: require("../../assets/logo.png"),
};

/**
 * Returns the correct image source for React Native <Image />
 *
 * Priority:
 * 1. If imageUri exists → use remote image
 * 2. Else if imageKey exists → use local image
 * 3. Else → use default fallback image
 *
 * @param {string} imageKey - key for built-in images
 * @param {string} imageUri - remote image URL
 */
export const getExerciseImage = (imageKey, imageUri) => {
  // PRIORITY 1: Use remote image if available
  if (imageUri && imageUri.trim() !== "") {
    return { uri: imageUri };
  }

  // PRIORITY 2: Use local image if key exists
  if (imageKey && exerciseImages[imageKey]) {
    return exerciseImages[imageKey];
  }

  // PRIORITY 3: Fallback image
  return exerciseImages.default;
};