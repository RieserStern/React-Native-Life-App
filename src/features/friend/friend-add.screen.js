import React from "react";
import { SafeArea } from "../../components/utils/safe-area.component";
import styled from "styled-components/native";
import { colors } from "../../infrastructures/theme/colors";
import { Text } from "../../components/typography/text.component";
import { FriendHeaderComponent } from "./components/header.component";
import { images } from "../../images";
import { APP_NAVIGATION } from "../../constants/app";

const StatusBar = styled.View`
  background-color: ${(props) => props.theme.colors.ui.primary};
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 30%;
`;

const Divider = styled.View`
  background-color: ${(props) => props.theme.colors.ui.divider};
  width: 100%;
  height: 1px;
`;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const TopContainer = styled.View`
  background-color: ${(props) => props.theme.colors.ui.primary};
  width: 100%;
  height: 80px;
  flex-direction: row;
  padding: ${(props) => props.theme.spaces[2]};
`;

const ButtonContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image`
  width: 32px;
  height: 32px;
  margin-bottom: ${(props) => props.theme.spaces[2]};
`;

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const FriendAddScreen = ({ navigation }) => {
  const onClickClose = () => {
    navigation.goBack();
  };

  const onClickSearch = () => {
    navigation.navigate(APP_NAVIGATION.friend_search);
  };

  const onClickQRCode = () => {
    console.log("QRCODE");
    navigation.navigate(APP_NAVIGATION.friend_qrcode);
  };

  return (
    <>
      <StatusBar />
      <SafeArea>
        <FriendHeaderComponent onClickClose={onClickClose} />
        <Divider />
        <MainContainer>
          <TopContainer>
            <ButtonContainer>
              <Button onPress={onClickQRCode}>
                <Image source={images.ic_qrcode} />
                <Text variant="label" color={colors.text.lightblue}>
                  QR code
                </Text>
              </Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button onPress={onClickSearch}>
                <Image source={images.ic_search} />
                <Text variant="label" color={colors.text.lightblue}>
                  Search
                </Text>
              </Button>
            </ButtonContainer>
          </TopContainer>
        </MainContainer>
      </SafeArea>
    </>
  );
};
