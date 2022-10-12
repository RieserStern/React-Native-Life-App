import React from "react";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { colors } from "../../../infrastructures/theme/colors";
import { Text } from "../../../components/typography/text.component";
import { HeaderComponent } from "../../../components/header/header.component";

const IconSettings = styled(Ionicons).attrs({
  color: colors.ui.white,
  size: 24,
  name: "md-settings-outline",
})`
  position: absolute;
  left: ${(props) => props.theme.spaces[2]};
`;

const IconFriends = styled(SimpleLineIcons).attrs({
  color: colors.ui.white,
  size: 24,
  name: "user-follow",
})`
  position: absolute;
  right: ${(props) => props.theme.spaces[2]};
`;

const IconCreate = styled(Ionicons).attrs({
  color: colors.ui.white,
  size: 24,
  name: "md-create-outline",
})`
  position: absolute;
  right: ${(props) => props.theme.spaces[2]};
`;

export const HomeHeaderComponent = ({ onClickSettings, onClickFriends }) => {
  return (
    <HeaderComponent color={colors.ui.primary}>
      <IconSettings onPress={onClickSettings} />
      <Text variant="title" color={colors.text.white}>
        Home
      </Text>
      <IconFriends onPress={onClickFriends} />
    </HeaderComponent>
  );
};

export const ChatListHeaderComponent = () => {
  return (
    <HeaderComponent color={colors.ui.primary}>
      <Text variant="title" color={colors.text.white}>
        Chats
      </Text>
      <IconCreate onPress={() => null} />
    </HeaderComponent>
  );
};
