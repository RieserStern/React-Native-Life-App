import styled from "styled-components/native";

// PHone number View

export const MainContainer = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.spaces[3]};
  align-items: center;
`;

export const LeftContainer = styled.View`
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin-top: 15px;
`;
