import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeArea } from "../../../components/utils/safe-area.component";
import styled from "styled-components/native";
import { images } from "../../../images";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { TouchableOpacity } from "react-native";
import { NormalInput, AuthLoading, LoginButton } from "../styles";
import { firebaseSDK } from "../../../libs/firebase";
import { Alert } from "react-native";
import { isValidEmail } from "../../../utils/validators";
import { colors } from "../../../infrastructures/theme/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View } from "react-native";
import { KeyboardView } from "../../../components/utils/keyboardview.component";
import { LOGIN_ACTION } from "../../../constants/redux";

// Images

const ImageLogo = styled.Image`
  width: 100px;
  height: 100px;
`;

//Containers

const TopContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: ${(props) => props.theme.spaces[3]};
`;

const LoginContainer = styled.View`
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;

const ButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const BottomContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { isLoading } = useSelector((state) => state.login_state);

  const dispatch = useDispatch();

  const onLogin = () => {
    if (!email) {
      Alert.alert("Attention", "Please enter email!", [
        {
          text: "OK",
          onPress: () => null,
          style: "cancel",
        },
      ]);
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Attention", "Please enter correct email!", [
        {
          text: "OK",
          onPress: () => null,
          style: "cancel",
        },
      ]);
      return;
    }

    if (!password) {
      Alert.alert("Attention", "Please enter password!", [
        {
          text: "OK",
          onPress: () => null,
          style: "cancel",
        },
      ]);
      return;
    }

    if (password.length < 6) {
      Alert.alert("Attention", "Please enter correct Password!", [
        {
          text: "OK",
          onPress: () => null,
          style: "cancel",
        },
      ]);
      return;
    }

    dispatch({ type: LOGIN_ACTION.LOGIN, email, password });
  };

  return (
    <SafeArea>
      <KeyboardView>
        <View style={{ flex: 1 }}>
          <TopContainer>
            <ImageLogo source={images.logo} />
            <Spacer position="top" size="medium" />
            <Text variant="caption">Login to your account</Text>
            <LoginContainer>
              <Text variant="hint" color={colors.text.gray}>
                Email
              </Text>
              <Spacer position="top" size="medium" />
              <NormalInput
                mode="outlined"
                label="Email"
                placeholder="Eg.john@gmail.com"
                textContentType="emailAddress"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <Spacer position="top" size="large" />
              <Text variant="hint" color={colors.text.gray}>
                Password
              </Text>
              <Spacer position="top" size="medium" />
              <NormalInput
                mode="outlined"
                label="Password"
                placeholder="Password"
                autoCapitalize="none"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <Spacer position="top" size="large" />
              <ButtonContainer>
                {isLoading ? (
                  <AuthLoading />
                ) : (
                  <LoginButton mode="contained" onPress={onLogin}>
                    Log In
                  </LoginButton>
                )}
              </ButtonContainer>
            </LoginContainer>
          </TopContainer>
          <BottomContainer>
            <Text variant="small" color={colors.text.black}>
              Don't have an accnout? Please{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Regist")}>
              <Text variant="small" color={colors.text.primary}>
                Register
              </Text>
            </TouchableOpacity>
            <Text variant="small" color={colors.text.black}>
              {" "}
              now
            </Text>
          </BottomContainer>
        </View>
      </KeyboardView>
    </SafeArea>
  );
};
