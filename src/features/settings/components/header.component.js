import React from "react";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../../infrastructures/theme/colors";
import { Text } from "../../../components/typography/text.component";
import { HeaderComponent } from "../../../components/header/header.component";

const IconClose = styled(Ionicons).attrs({
  color: colors.ui.white,
  size: 24,
  name: "md-close",
})`
  position: absolute;
  right: ${(props) => props.theme.spaces[2]};
`;

export const SettingHeaderComponent = ({ onClickClose }) => {
  return (
    <HeaderComponent color={colors.ui.primary}>
      <Text variant="title" color={colors.text.white}>
        Settings
      </Text>
      <IconClose onPress={onClickClose} />
    </HeaderComponent>
  );
};
