export const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

export const isEmpty = (value) => {
  return !value || !value.trim();
};

