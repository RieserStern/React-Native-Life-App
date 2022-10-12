import React from "react";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../../infrastructures/theme/colors";
import { Text } from "../../../components/typography/text.component";
import { HeaderComponent } from "../../../components/header/header.component";

const IconClose = styled(Ionicons).attrs({
  size: 24,
  name: "md-close",
})`
  position: absolute;
  left: ${(props) => props.theme.spaces[2]};
`;

const IconCheck = styled(Ionicons).attrs({
  size: 24,
  name: "md-checkmark",
})`
  position: absolute;
  right: ${(props) => props.theme.spaces[2]};
`;

export const GroupHeaderComponent = ({ onClickClose, onClickDone }) => {
  return (
    <HeaderComponent color={colors.ui.primary}>
      <IconClose onPress={onClickClose} color={colors.ui.white} />
      <Text variant="title" color={colors.text.white}>
        Create Group Profile
      </Text>
      <IconCheck onPress={onClickDone} color={colors.ui.white} />
    </HeaderComponent>
  );
};

export const GroupMemberHeaderComponent = ({ onClickClose, onClickDone }) => {
  return (
    <HeaderComponent color={colors.bg.primary}>
      <IconClose onPress={onClickClose} color={colors.ui.primary} />
      <Text variant="title" color={colors.text.primary}>
        Add Participants
      </Text>
      <IconCheck onPress={onClickDone} color={colors.ui.primary} />
    </HeaderComponent>
  );
};
