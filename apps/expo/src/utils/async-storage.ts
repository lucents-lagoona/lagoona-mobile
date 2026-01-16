import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async <T>(key: string, value: T): Promise<boolean> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    console.error(`Failed to save data for key "${key}" to async storage`, e);
    return false;
  }
};

export const getItem = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue === null) {
      return null;
    }
    return JSON.parse(jsonValue) as T;
  } catch (e) {
    console.error(`Failed to get data for key "${key}" from async storage`, e);
    return null;
  }
};

export const removeItem = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    console.error(
      `Failed to remove data for key "${key}" from async storage`,
      e,
    );
    return false;
  }
};
