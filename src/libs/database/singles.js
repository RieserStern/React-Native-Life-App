import AsyncStorage from "@react-native-community/async-storage";
import { KEY_APP_DATA } from "../../constants/database";

export const saveSingles = async (singles) => {
  await AsyncStorage.setItem(KEY_APP_DATA.SINGLE, JSON.stringify(singles));
};

export const getSingle = async (single_id) => {
  const singles = await AsyncStorage.getItem(KEY_APP_DATA.SINGLE);

  const singlArray = JSON.parse(singles);

  let result = null;

  singlArray.forEach((single) => {
    if (single.userId1 == single_id || single.userId2 == single_id) {
      result = single;
    }
  });
  return result;
};

export const addSingle = async (single) => {
  const singles = await AsyncStorage.getItem(KEY_APP_DATA.SINGLE);

  const singleArray = JSON.parse(singles);

  singleArray.push(single);

  await AsyncStorage.setItem(KEY_APP_DATA.SINGLE, JSON.stringify(singleArray));
};
