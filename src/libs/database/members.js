import AsyncStorage from "@react-native-community/async-storage";
import { KEY_APP_DATA } from "../../constants/database";

export const saveMembers = async (members) => {
  await AsyncStorage.setItem(KEY_APP_DATA.MEMBER, JSON.stringify(members));
};

export const getMember = async (member_id) => {
  const member = await AsyncStorage.getItem(
    `${KEY_APP_DATA.SINGLE}_${member_id}`
  );
  return JSON.parse(member);
};
