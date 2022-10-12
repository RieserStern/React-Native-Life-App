import React from "react";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { colors } from "../../../infrastructures/theme/colors";
import Ionicons from "react-native-vector-icons/Ionicons";

const TextContainer = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  margin-left: ${(props) => props.theme.spaces[2]};
`;

const Iconfront = styled(Ionicons).attrs({
  color: colors.ui.primary,
  size: 24,
})`
  margin-left: ${(props) => props.theme.spaces[2]};
`;

const IconBack = styled(Ionicons).attrs({
  color: colors.ui.gray,
  size: 24,
  name: "md-chevron-forward",
})`
  margin-left: ${(props) => props.theme.spaces[2]};
`;

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  flex-direction: row;
`;

export const SettingComponent = ({ title, onClick, frontIcon, backIcon }) => {
  return (
    <Button onPress={onClick}>
      {frontIcon && <Iconfront name={frontIcon} />}
      <TextContainer>
        <Text variant="hint" color={colors.text.black}>
          {title}
        </Text>
      </TextContainer>
      {backIcon && <IconBack />}
    </Button>
  );
};
