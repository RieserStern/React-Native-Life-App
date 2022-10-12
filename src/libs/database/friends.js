import AsyncStorage from "@react-native-community/async-storage";
import { KEY_APP_DATA } from "../../constants/database";

export const saveFriends = async (friends) => {
  await AsyncStorage.setItem(KEY_APP_DATA.FRIEND, JSON.stringify(friends));
};

export const getFriend = async (frined_id) => {
  const friend = await AsyncStorage.getItem(KEY_APP_DATA.FRIEND);

  const friendsList = JSON.parse(friend);

  console.log(friendsList);

  return friendsList;
};

export const getFriends = async () => {
  const friends = await AsyncStorage.getItem(KEY_APP_DATA.FRIEND);

  const friendsList = JSON.parse(friends);

  let results = [];

  friendsList.forEach((friend) => {
    if (!friend.isDeleted) {
      results.push(friend);
    }
  });

  return results;
};
