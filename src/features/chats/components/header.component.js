import React from "react";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../../infrastructures/theme/colors";
import { Text } from "../../../components/typography/text.component";
import { HeaderComponent } from "../../../components/header/header.component";

const IconPlus = styled(Ionicons).attrs({
  color: colors.ui.white,
  size: 24,
  name: "md-add",
})`
  position: absolute;
  right: ${(props) => props.theme.spaces[2]};
`;

const IconBack = styled(Ionicons).attrs({
  color: colors.ui.white,
  size: 24,
  name: "md-chevron-back",
})`
  position: absolute;
  left: ${(props) => props.theme.spaces[2]};
`;

export const ChatHeaderComponent = ({ title, onClickClose, onClickCall }) => {
  return (
    <HeaderComponent color={colors.ui.primary}>
      <IconBack onPress={onClickClose} />
      <Text variant="title" color={colors.text.white}>
        {title}
      </Text>
      <IconPlus onPress={onClickCall} />
    </HeaderComponent>
  );
};
