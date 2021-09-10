import AsyncStorage from "@react-native-async-storage/async-storage";

const getItem = async <T>(storageName: string, defaultValue: T) => {
  const storageItem = await AsyncStorage.getItem(storageName);

  if (storageItem) {
    return JSON.parse(storageItem) as T;
  } else {
    AsyncStorage.setItem(storageName, JSON.stringify(defaultValue));

    return defaultValue;
  }
};

const getItemOrNull = async <T>(storageName: string, defaultValue?: T) => {
  const storageItem = await AsyncStorage.getItem(storageName);

  if (storageItem) {
    return JSON.parse(storageItem) as T;
  }

  return defaultValue || null;
};

const setItem = async <T>(storageName: string, value: T) => {
  await AsyncStorage.setItem(storageName, JSON.stringify(value));
};

export const storage = {
  getItem,
  getItemOrNull,
  setItem,
};
