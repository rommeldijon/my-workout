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
};

export const appImages = {
  logo: require("../../assets/logo.png"),
};

export const getExerciseImage = (imageKey) => {
  return exerciseImages[imageKey] || null;
};