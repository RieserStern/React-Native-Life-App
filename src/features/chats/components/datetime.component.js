import React from "react";
import styled from "styled-components/native";
import { timeForChat } from "../../../utils/datetime";

const Text = styled.Text`
  color: ${(props) => props.color};
  font-size: ${(props) => props.theme.fontSizes.small};
`;

export const DateTimeComponent = ({ timeStamp, color }) => (
  <Text color={color}>{timeForChat(timeStamp)}</Text>
);
