import React, { useState, createContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { PERSONCELLTYPE } from "../../features/home/components/person.component";
import { firebaseSDK } from "../../libs/firebase";

export const HomeContext = createContext();

export const HomeContextProvider = ({ children }) => {
  const { user } = useSelector((state) => state.login_state);

  const [userInfo, setUserInfo] = useState(null);
  const [groups, setGroups] = useState([]);
  const [friends, setFriends] = useState([]);

  const [chats, setChats] = useState([]);

  const createUser = () => {
    setUserInfo({
      ...user,
      cell_type: PERSONCELLTYPE.user,
    });
  };

  const createGroups = async (datas) => {
    let tempGroups = [];

    tempGroups.push({
      title: "Create Group",
      message: "Create a group for you and your friends.",
      cell_type: PERSONCELLTYPE.group_header,
    });

    datas.forEach(async (data) => {
      tempGroups.push({ ...data, cell_type: PERSONCELLTYPE.group });
    });

    setGroups(tempGroups);
    createChats(datas);
  };

  const createFriends = async (friends) => {
    const friendIds = friends.map((data) => {
      if (!data.isDeleted) {
        return data.friendId == user.id ? data.userId : data.friendId;
      }
    });

    let tempFriends = [];

    if (friendIds.length > 0) {
      const users = await firebaseSDK.getUsers(friendIds);

      users.forEach(async (data) => {
        const person = {
          ...data,
          cell_type: PERSONCELLTYPE.friend,
        };

        tempFriends.push(person);
      });
    }
    setFriends(tempFriends);
  };

  const createChats = async (datas) => {
    datas.forEach((data) => {
      addChat(data);
    });
  };

  const addChat = async (data) => {
    let newChat = chats;

    const chat_id = data.chatId ?? data.objectId;

    const message = await getLastMessasge(chat_id);

    newChat.push({
      ...message,
      cell_type: PERSONCELLTYPE.chats,
      user_id:
        data.userId1 == user.id ? data.userId2 : data.userId1 ?? data.objectId,
      isGroup: data.userId1 == null,
    });

    newChat = newChat.sort(function (a, b) {
      return b.createdAt - a.createdAt;
    });

    setChats(newChat);
  };

  const getLastMessasge = async (chat_id) => {
    const message = await firebaseSDK.getLastMessasge(chat_id);
    return message;
  };

  const getFriends = async (user_id) => {
    const results = await firebaseSDK.getFriends(user_id);

    createFriends(results);
  };

  const getSingles = async (user_id) => {
    const singles = await firebaseSDK.getSingles(user_id);
    createChats(singles);
  };

  const getGroups = async (user_id) => {
    firebaseSDK
      .getMembers(user_id)
      .then((results) => {
        const chatIds = results.map((data) => data.chatId);
        if (chatIds.length > 0) {
          firebaseSDK
            .getGroups(chatIds)
            .then((results) => {
              createGroups(results);
            })
            .catch(() => {
              createGroups([]);
            });
        } else {
          createGroups([]);
        }
      })
      .catch((error) => {
        createGroups([]);
      });
  };

  useEffect(() => {
    if (user && user != {}) {
      setChats([]);
      createUser(user.id);
      getGroups(user.id);
      getFriends(user.id);
      getSingles(user.id);
    }
  }, [user]);

  return (
    <HomeContext.Provider value={{ userInfo, groups, friends, chats }}>
      {children}
    </HomeContext.Provider>
  );
};
