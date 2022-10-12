import React, { useState } from "react";
import { Alert } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { isValidEmail } from "../../../../utils/validators";
import { LoginButton, NormalInput } from "../../styles";
import { MainContainer, LeftContainer } from "../singup.styles";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructures/theme/colors";

export const BasicInformationScreen = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const onNext = () => {
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

    if (!username) {
      Alert.alert("Attention", "Please enter username!", [
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

    if (!confirm) {
      Alert.alert("Attention", "Please confirm password!", [
        {
          text: "OK",
          onPress: () => null,
          style: "cancel",
        },
      ]);
      return;
    }

    if (password != confirm) {
      Alert.alert("Attention", "Password doesn't match", [
        {
          text: "OK",
          onPress: () => null,
          style: "cancel",
        },
      ]);
      return;
    }

    setUser(username, email, password);
  };

  return (
    <MainContainer>
      <Text variant="title" color={colors.text.black} center>
        Please fill basic details to complete registration
      </Text>
      <LeftContainer>
        <Text variant="hint" color={colors.text.gray}>
          Email
        </Text>
        <Spacer />
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
        <Spacer />
        <Text variant="hint" color={colors.text.gray}>
          Username
        </Text>
        <Spacer />
        <NormalInput
          mode="outlined"
          label="Username"
          placeholder="Username"
          autoCapitalize="none"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Spacer />
        <Text variant="hint" color={colors.text.gray}>
          Password
        </Text>
        <Spacer />
        <NormalInput
          mode="outlined"
          label="Password"
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Spacer />
        <Text variant="hint" color={colors.text.gray}>
          Confirm Password
        </Text>
        <Spacer />
        <NormalInput
          mode="outlined"
          label="Password"
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          value={confirm}
          onChangeText={(text) => setConfirm(text)}
        />
        <Spacer position="top" size="large" />
        <LoginButton mode="contained" onPress={onNext}>
          Next
        </LoginButton>
      </LeftContainer>
    </MainContainer>
  );
};
