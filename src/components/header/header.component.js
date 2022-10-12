import React from "react";
import styled from "styled-components/native";

const HeaderContainer = styled.View`
  height: 48px;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  ${(props) => (props.color ? `background-color: ${props.color};` : "")}
`;

export const HeaderComponent = ({ color, children }) => {
  return <HeaderContainer color={color}>{children}</HeaderContainer>;
};
