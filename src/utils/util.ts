const setStorage = (key: string, data: string) =>
  localStorage.setItem(key, data);

const getStorage = (key: string) => localStorage.getItem(key);

export const storageService = {
  get: getStorage,
  set: setStorage,
};
