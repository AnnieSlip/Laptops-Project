export const setItemToStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getItemFromStorage = (key) => {
  if (localStorage.getItem(key)) {
    return localStorage.getItem(key);
  }
  return console.log("NOT FOUND!");
};
