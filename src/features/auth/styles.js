import styled from "styled-components/native";
import { Button, TextInput, ActivityIndicator } from "react-native-paper";
import { colors } from "../../infrastructures/theme/colors";

export const LoginButton = styled(Button).attrs({
  color: colors.ui.primary,
})`
  padding: ${(props) => props.theme.spaces[1]};
  width: 100%;
  margin-bottom: ${(props) => props.theme.spaces[3]};
  border-radius: ${(props) => props.theme.sizes[0]};
`;

export const NormalInput = styled(TextInput)`
  width: 100%;
`;

export const AuthLoading = styled(ActivityIndicator).attrs({
  color: colors.ui.primary,
  animated: true,
})``;

export const AuthLoadingContainer = styled.View`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.bg.darkalpha};
  align-items: center;
  justify-content: center;
`;
