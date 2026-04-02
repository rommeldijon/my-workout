export const exerciseImages = {
  pushup: require("../../assets/exercises/push_ups.png"),
  squat: require("../../assets/exercises/squat.png"),
  jumpingjacks: require("../../assets/exercises/jumping_jacks.png"),
  plank: require("../../assets/exercises/plank_on_elbows.png"),
};

export const appImages = {
  logo: require("../../assets/logo.png"),
};

export const getExerciseImage = (imageKey) => {
  return exerciseImages[imageKey] || null;
};