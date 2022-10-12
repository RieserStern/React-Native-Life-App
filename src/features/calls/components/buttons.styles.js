import styled from "styled-components/native";

export const ButtonImage = styled.Image`
  width: 56px;
  height: 56px;
`;

export const ControlButtonsContainer = styled.View`
  width: 72px;
  position: absolute;
  right: ${(props) => props.theme.spaces[2]};
  top: ${(props) => props.top}px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.bg.darkalpha};
  padding: ${(props) => props.theme.spaces[2]};
`;

export const ButtomButtonContainer = styled.View`
  width: 100%;
  height: 72px;
  position: absolute;
  flex-direction: row;
  bottom: ${(props) => props.bottom}px;
  left: 0;
  padding: ${(props) => props.theme.spaces[2]};
  align-items: center;
  justify-content: center;
`;
