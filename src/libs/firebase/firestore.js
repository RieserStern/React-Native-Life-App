import firestore from "@react-native-firebase/firestore";
import { DB_INTERNAL } from "../database";
import { deleteAuthedUser } from "./auth";

export const FIRESTORE_ACTION = {
  ADD: "Add",
  DEL: "Del",
  UDT: "Udt",
};

export const FIRESTORE_TABLES = {
  USER: "Person",
  Friend: "Friend",
  Group: "Group",
  Member: "Member",
  Message: "Message",
  Detail: "Detail",
  Payment_Method: "PaymentMethod",
  Single: "Single",
  Stripe_Customer: "StripeCustomer",
  ZEDPay: "ZEDPay",
};

export const createUser = (user) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(FIRESTORE_TABLES.USER)
      .add(user)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

export const deleteUser = (user_id) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(FIRESTORE_TABLES.USER)
      .doc(user_id)
      .then(() => {
        console.log("User Deleted");
      })
      .catch((error) => {
        console.log(error);
      });
    deleteAuthedUser()
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getUser = (user_id) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(FIRESTORE_TABLES.USER)
      .doc(user_id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const user = {
            id: user_id,
            ...snapshot.data(),
          };
          resolve(user);
        }
        reject("No exists");
      })
      .catch((error) => reject(error));
  });
};

export const updateToken = (user_id, token) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(FIRESTORE_TABLES.USER)
      .doc(user_id)
      .update({
        oneSignalId: token,
      })
      .then(() => {
        resolve(true);
      })
      .catch((error) => reject(error));
  });
};

export const getPerson = (user_id) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(FIRESTORE_TABLES.USER)
      .doc(user_id)
      .get()
      .then(async (snapshot) => {
        if (snapshot.exists) {
          const user = snapshot.data();

          await DB_INTERNAL.addPerson(user);

          resolve(user);
        }
        reject("No exists");
      })
      .catch((error) => reject(error));
  });
};

export const getUsers = (userIds) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(FIRESTORE_TABLES.USER)
      .where("objectId", "in", userIds)
      .get()
      .then(async (snapshot) => {
        let results = [];
        snapshot.forEach((data) => {
          results.push(data.data());
        });

        await DB_INTERNAL.savePersons(results);

        resolve(results);
      })
      .catch((error) => reject(error));
  });
};

export const getUserWithName = (userId, username) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(FIRESTORE_TABLES.USER)
      .where("objectId", "!=", userId)
      .where("username", "==", username)
      .limit(1)
      .get()
      .then(async (snapshot) => {
        let result;
        snapshot.forEach((data) => {
          result = data.data();
        });
        console.log("getuserwithname", result);
        await DB_INTERNAL.addPerson(result);

        resolve(result);
      })
      .catch((error) => reject(error));
  });
};

export const getUserWithPhonenumber = (userId, phone) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(FIRESTORE_TABLES.USER)
      .where("objectId", "!=", userId)
      .where("phone", "==", phone)
      .limit(1)
      .get()
      .then(async (snapshot) => {
        let result;
        snapshot.forEach((data) => {
          result = data.data();
        });

        await DB_INTERNAL.addPerson(result);

        resolve(result);
      })
      .catch((error) => reject(error));
  });
};

export const setUser = (userInfo) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(FIRESTORE_TABLES.USER)
      .doc(userInfo.objectId)
      .set(userInfo)
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getMembers = (user_id) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(FIRESTORE_TABLES.Member)
      .where("userId", "==", user_id)
      .get()
      .then(async (querySnapshot) => {
        let result = [];
        querySnapshot.forEach((documentSnapshot) => {
          result.push(documentSnapshot.data());
        });

        await DB_INTERNAL.saveMembers(result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const getFriends = async (user_id) => {
  let results = [];

  const query1 = await firestore()
    .collection(FIRESTORE_TABLES.Friend)
    .where("userId", "==", user_id)
    .where("isAccepted", "==", true)
    .get();

  query1.forEach((docSnap) => {
    results.push(docSnap.data());
  });

  const query2 = await firestore()
    .collection(FIRESTORE_TABLES.Friend)
    .where("friendId", "==", user_id)
    .where("isAccepted", "==", true)
    .get();

  query2.forEach((docSnap) => {
    results.push(docSnap.data());
  });

  await DB_INTERNAL.saveFriends(results);

  return results;
};

export const checkFriend = async (user_id, friend_id) => {
  let results = false;

  const query1 = await firestore()
    .collection(FIRESTORE_TABLES.Friend)
    .where("userId", "==", user_id)
    .where("friendId", "==", friend_id)
    .get();

  console.log(query1);

  results = query1.docs.length > 0;

  if (results) {
    return results;
  }

  const query2 = await firestore()
    .collection(FIRESTORE_TABLES.Friend)
    .where("userId", "==", friend_id)
    .where("friendId", "==", user_id)
    .get();
  console.log(query2);

  results = query2.docs.length > 0;

  return results;
};

export const creatFriend = async (user_id, friend_id, doc_id) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(FIRESTORE_TABLES.Friend)
      .doc(doc_id)
      .set({
        createdAt: new Date().getTime(),
        friendId: friend_id,
        isAccepted: false,
        isDeleted: false,
        objectId: doc_id,
        pending: true,
        updatedAt: new Date().getTime(),
        userId: user_id,
      })
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const deleteFriend = async (doc_id) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(FIRESTORE_TABLES.Friend)
      .doc(doc_id)
      .delete()
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const getSingles = async (user_id) => {
  let results = [];

  const query1 = await firestore()
    .collection(FIRESTORE_TABLES.Single)
    .where("userId1", "==", user_id)
    .get();

  query1.forEach((docSnap) => {
    results.push(docSnap.data());
  });

  const query2 = await firestore()
    .collection(FIRESTORE_TABLES.Single)
    .where("userId2", "==", user_id)
    .get();

  query2.forEach(async (docSnap) => {
    results.push(docSnap.data());
  });

  await DB_INTERNAL.saveSingles(results);

  return results;
};

export const getSingle = async (single_id) => {
  const user = await DB_INTERNAL.getUserFromDatabase();

  if (!user) {
    return null;
  }

  let result = null;

  try {
    const query1 = await firestore()
      .collection(FIRESTORE_TABLES.Single)
      .where("userId1", "==", user.id)
      .where("userId2", "==", single_id)
      .get();

    query1.forEach((docSnap) => {
      result = docSnap.data();
    });

    if (result) {
      await DB_INTERNAL.addSingle(result);

      return result;
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const query2 = await firestore()
      .collection(FIRESTORE_TABLES.Single)
      .where("userId1", "==", single_id)
      .where("userId2", "==", user.id)
      .get();

    query2.forEach(async (docSnap) => {
      result = docSnap.data();
    });
  } catch (error) {
    console.log(error);
  }

  if (result) {
    await DB_INTERNAL.addSingle(result);
  }

  return result;
};

export const getGroups = (chatIDs) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(FIRESTORE_TABLES.Group)
      .where("chatId", "in", chatIDs)
      .get()
      .then(async (querySnapshot) => {
        let result = [];
        querySnapshot.forEach((documentSnapshot) => {
          result.push(documentSnapshot.data());
        });

        await DB_INTERNAL.saveGroups(result);

        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const getGroup = (group_id) => {
  console.log(group_id);
  return new Promise((resolve, reject) => {
    firestore()
      .collection(FIRESTORE_TABLES.Group)
      .doc(group_id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const group = {
            id: group_id,
            ...snapshot.data(),
          };
          resolve(group);
        }
        reject("No exists");
      })
      .catch((error) => reject(error));
  });
};

export const getLastMessasge = (chatId) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(FIRESTORE_TABLES.Message)
      .where("chatId", "==", chatId)
      .orderBy("updatedAt", "desc")
      .limit(1)
      .get()
      .then((querySnapshot) => {
        let result;
        querySnapshot.forEach((documentSnapshot) => {
          result = documentSnapshot.data();
        });
        if (result) {
          resolve(result);
        } else {
          reject("No message");
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const getZedPay = (payId) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(FIRESTORE_TABLES.ZEDPay)
      .where("transId", "==", payId)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        let result;
        querySnapshot.forEach((documentSnapshot) => {
          result = documentSnapshot.data();
        });
        if (result) {
          resolve(result);
        } else {
          reject("No message");
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
