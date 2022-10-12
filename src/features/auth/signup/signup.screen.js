import React, { useState } from "react";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { firebaseSDK } from "../../../libs/firebase";
import { SignUpHeaderComponent } from "./components/header.component";
import { PhoneVerifyScreen } from "./phone-verify";
import { PincodeVerifyScreen } from "./pincode-verify";
import { Alert } from "react-native";
import { BasicInformationScreen } from "./basic-information";
import { AddAvatarScreen } from "./addavatar";
import { AuthLoading, AuthLoadingContainer } from "../styles";
import { KeyboardView } from "../../../components/utils/keyboardview.component";
import { useDispatch } from "react-redux";
import ImageResizer from "react-native-image-resizer";
import { APP_STATE_ACTION } from "../../../constants/redux";
import { getUserFromDatabase, saveUserToDatabase } from "../../../libs/database/user";
import AsyncStorage from "@react-native-community/async-storage";

export const SignUpScreen = ({ navigation }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [confirm, setConfirm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  const onBack = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    } else {
      navigation.pop();
    }
  };

  const sendCode = async (phoneNumber) => {
    setIsLoading(true);
    const confirmation = await firebaseSDK.signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
    setIsLoading(false);
    setPageIndex(1);
  };

  const verifyCode = async (code) => {
    setIsLoading(true);
    try {
      await confirm.confirm(code);
      setIsLoading(false);
      setPageIndex(2);
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Invalid Code");
    }
  };

  const setBasicInformation = (username, email, password) => {
    setIsLoading(true);

    firebaseSDK
      .updateEmail(email)
      .then(() => {
        firebaseSDK
          .updatePassword(password)
          .then(() => {
            setUsername(username);
            setIsLoading(false);
            setPageIndex(3);
          })
          .catch((error) => {
            setIsLoading(false);
            console.log(error);
          });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const onSubmit = (image_path, publicName) => {
    setIsLoading(true);
    console.log("beforeresizedImage");

    ImageResizer.createResizedImage(
      image_path,
      300,
      300,
      "JPEG",
      30,
      0,
      undefined,
      false,
      { mode: "contain", onlyscaleDown: false }
    )
      .then(async (resizedImage) => {
        const user = await firebaseSDK.authorizedUser();

        const avatar_url = await firebaseSDK.uploadAvata(
          `${user.uid}.jpg`,
          resizedImage.path
        );

        const userInfo = {
          username,
          fullName: publicName,
          email: user.email,
          phone: user.phoneNumber,
          objectId: user.uid,
          pictureAt: avatar_url,
          createdAt: new Date().getTime(),
        };

        await firebaseSDK.setUser(userInfo)
        await dispatch({ type: APP_STATE_ACTION.FOREGROUND });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <SafeArea>
        <SignUpHeaderComponent onBack={onBack} pageIndex={pageIndex} />
        <KeyboardView>
          {pageIndex == 0 ? (
            <PhoneVerifyScreen onSendCode={sendCode} />
          ) : pageIndex == 1 ? (
            <PincodeVerifyScreen onVerify={verifyCode} />
          ) : pageIndex == 2 ? (
            <BasicInformationScreen setUser={setBasicInformation} />
          ) : (
            <AddAvatarScreen onSubmit={onSubmit} />
          )}
        </KeyboardView>
      </SafeArea>
      {isLoading && (
        <AuthLoadingContainer>
          <AuthLoading />
        </AuthLoadingContainer>
      )}
    </>
  );
};
