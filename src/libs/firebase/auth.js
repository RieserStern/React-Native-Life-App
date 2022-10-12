import auth from "@react-native-firebase/auth";

export const checkAuthedUser = (callBack) => {
  auth().onAuthStateChanged(callBack);
};

export const signInEmailPassword = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const signOut = () => {
  new Promise((resolve, reject) => {
    auth()
      .signOut()
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const signInWithPhoneNumber = async (phoneNumber) => {
  const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  return confirmation;
};

export const getCredential = (verify_id, code) => {
  const credential = auth.PhoneAuthProvider.credential(verify_id, code);
  return credential;
};

export const linkCredential = async (credential) => {
  const userData = await auth().currentUser.linkWithCredential(credential);
  return userData;
};

export const updateEmail = (email) => {
  return auth().currentUser.updateEmail(email);
};

export const updatePassword = (password) => {
  return auth().currentUser.updatePassword(password);
};

export const updateDisplayName = (username) => {
  return auth().currentUser.updateDisplayName(username);
};

export const authorizedUser = async () => {
  try {
    if (!auth().currentUser) return null;
    await auth().currentUser.reload();
    return auth().currentUser;
  } catch (e) {
    return null;
  }
};

export const deleteAuthedUser = () => {
  return auth().currentUser.delete();
};
