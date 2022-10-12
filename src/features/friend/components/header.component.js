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

const IconBack = styled(Ionicons).attrs({
  color: colors.ui.primary,
  size: 32,
  name: "chevron-back-sharp",
})`
  position: absolute;
  left: ${(props) => props.theme.spaces[2]};
`;

export const FriendHeaderComponent = ({ onClickClose }) => {
  return (
    <HeaderComponent color={colors.ui.primary}>
      <Text variant="title" color={colors.text.white}>
        Add Friend
      </Text>
      <IconClose onPress={onClickClose} />
    </HeaderComponent>
  );
};

export const FriendSearchHeaderComponent = ({ onClickClose }) => {
  return (
    <HeaderComponent color={colors.bg.primary}>
      <Text variant="title" color={colors.text.black}>
        Search Friends
      </Text>
      <IconBack onPress={onClickClose} />
    </HeaderComponent>
  );
};
