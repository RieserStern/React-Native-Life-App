import React from "react";
import { SafeArea } from "../../components/utils/safe-area.component";
import styled from "styled-components/native";
import { images } from "../../images";
import { Text } from "../../components/typography/text.component";
import { Button } from "react-native-paper";
import { colors } from "../../infrastructures/theme/colors";
import { Spacer } from "../../components/spacer/spacer.component";
import { LoginButton } from "./styles";

const BottomContainer = styled.View`
  padding: ${(props) => props.theme.spaces[3]};
  align-items: center;
  justify-content: center;
`;

const TopContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ImageLogo = styled.Image`
  width: 240px;
  height: 240px;
`;

const SignUpButton = styled(Button).attrs({
  color: colors.ui.primary,
})`
  padding: ${(props) => props.theme.spaces[1]};
  width: 100%;
  margin-bottom: ${(props) => props.theme.spaces[4]};
  border-radius: ${(props) => props.theme.sizes[0]};
`;

export const AuthScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <TopContainer>
        <ImageLogo source={images.logo} />
        <Spacer position="top" size="extra" />
        <Text variant="caption">Easy, safe and SECURE</Text>
        <Text variant="hint">Get started with LIFE app</Text>
      </TopContainer>
      <BottomContainer>
        <LoginButton
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          Log in
        </LoginButton>
        <SignUpButton
          mode="outlined"
          style={{ borderColor: colors.ui.primary }}
          onPress={() => navigation.navigate("Regist")}
        >
          Sign up
        </SignUpButton>
        <Text variant="bottom">{`"END-TO-END ENCRYPTED"`}</Text>
      </BottomContainer>
    </SafeArea>
  );
};
