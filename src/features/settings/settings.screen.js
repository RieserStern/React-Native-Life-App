import React from "react";
import { SafeArea } from "../../components/utils/safe-area.component";
import styled from "styled-components/native";
import { SettingHeaderComponent } from "./components/header.component";
import { SettingComponent } from "./components/setting.component";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../infrastructures/theme/colors";
import { Text } from "../../components/typography/text.component";
import { useDispatch } from "react-redux";
import { DB_INTERNAL } from "../../libs/database";
import { firebaseSDK } from "../../libs/firebase";
import AsyncStorage from "@react-native-community/async-storage";

const StatusBar = styled.View`
  background-color: ${(props) => props.theme.colors.ui.primary};
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 30%;
`;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const SettingsContainer = styled.View`
  flex: 1;
`;

const SignOutButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const IconSignout = styled(Ionicons).attrs({
  color: colors.ui.error,
  size: 24,
  name: "md-power-sharp",
})`
  margin-left: ${(props) => props.theme.spaces[2]};
`;

const TextContainer = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  margin-left: ${(props) => props.theme.spaces[2]};
`;

const TITLES = [
  "General Settings",
  "Account Settings",
  "Zed Pay",
  "Privacy Policy",
  "EULA",
];

const ICONS = [
  null,
  "md-settings-sharp",
  "md-reader",
  "md-reader",
  "md-alert-circle",
];

export const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const onClickClose = () => {
    navigation.goBack();
  };

  const onSignOut = async () => {
    AsyncStorage.removeItem("User")
    await firebaseSDK.signOut();
    dispatch({ type: LOGIN_ACTION.LOGOUT });

    const friends = DB_INTERNAL.getSingle();
  };

  return (
    <>
      <StatusBar />
      <SafeArea>
        <SettingHeaderComponent onClickClose={onClickClose} />

        <MainContainer>
          <SettingsContainer>
            {TITLES.map((title, index) => {
              return (
                <SettingComponent
                  title={title}
                  frontIcon={ICONS[index]}
                  backIcon={ICONS[index] != null}
                  key={`data-${index}`}
                />
              );
            })}
          </SettingsContainer>
          <SignOutButton onPress={onSignOut}>
            <IconSignout />
            <TextContainer>
              <Text variant="hint" color={colors.ui.error}>
                Sign out
              </Text>
            </TextContainer>
          </SignOutButton>
        </MainContainer>
      </SafeArea>
    </>
  );
};
