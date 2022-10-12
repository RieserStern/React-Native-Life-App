import AsyncStorage from "@react-native-community/async-storage";
import { KEY_APP_DATA } from "../../constants/database";

export const saveUserToDatabase = async (user) => {
  await AsyncStorage.setItem(KEY_APP_DATA.USER, JSON.stringify(user));
};

export const getUserFromDatabase = async () => {
  const user = await AsyncStorage.getItem(KEY_APP_DATA.USER);
  return JSON.parse(user);
};
