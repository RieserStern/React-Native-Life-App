import AsyncStorage from "@react-native-community/async-storage";
import { KEY_APP_DATA } from "../../constants/database";

export const saveGroups = async (groups) => {
  await AsyncStorage.setItem(KEY_APP_DATA.GROUP, JSON.stringify(groups));
};

export const getGroup = async (group_id) => {
  const groups = await AsyncStorage.getItem(KEY_APP_DATA.GROUP);

  const groupArray = JSON.parse(groups);

  groupArray.forEach((group) => {
    if (group.objectId == group_id) {
      return group;
    }
  });

  return null;
};

export const getGroupName = async (group_id) => {
  const groups = await AsyncStorage.getItem(KEY_APP_DATA.GROUP);

  const groupArray = JSON.parse(groups);

  let result = null;

  groupArray.forEach((group) => {
    if (group.objectId == group_id) {
      result = group.name;
    }
  });

  return result;
};
