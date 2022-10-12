import styled from "styled-components/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../../../infrastructures/theme/colors";

const ButtonContainer = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.enabled
      ? props.theme.colors.ui.primary
      : props.theme.colors.bg.lightgray};
`;

const IconImage = styled(Ionicons).attrs({
  color: colors.ui.white,
  size: 32,
  name: "arrow-forward-sharp",
})``;

export const NextButton = ({ onNext, enabled }) => {
  return enabled ? (
    <TouchableOpacity onPress={onNext}>
      <ButtonContainer enabled>
        <IconImage />
      </ButtonContainer>
    </TouchableOpacity>
  ) : (
    <ButtonContainer enabled={false}>
      <IconImage />
    </ButtonContainer>
  );
};
