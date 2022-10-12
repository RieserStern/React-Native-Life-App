import storage from "@react-native-firebase/storage";

export const MEDIA_TYPE = {
  AVATAR: "user",
  PHOTO: "photo",
  VIDEO: "video",
};

export const MEDIA_FOLDER = {
  USER: "user",
  MEDIA: "media",
  GROUP: "group",
};

export const uploadMedia = (type, path) => {
  const milliSeconds = new Date().getMilliseconds();
  return new Promise((resolve, reject) => {
    let ref = storage().ref(`${type}_${milliSeconds}`);

    ref
      .putFile(path)
      .then(async (res) => {
        const downloadURL = await ref.getDownloadURL();
        resolve(downloadURL);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const uploadAvata = (fileName, path) => {
  return new Promise((resolve, reject) => {
    let ref = storage().ref(`${MEDIA_FOLDER.USER}/${fileName}`);

    ref
      .putFile(path)
      .then(async (res) => {
        const downloadURL = await ref.getDownloadURL();
        resolve(downloadURL);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getDownloadURL = async (fileName) => {
  const downloadURL = await storage().ref(fileName).getDownloadURL();
  return downloadURL;
};
