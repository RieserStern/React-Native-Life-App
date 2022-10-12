import React from "react";
import styled from "styled-components/native";
import { images } from "../../images";

const BackGround = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
  align-items: center;
  justify-content: center;
`;

const ImageLogo = styled.Image`
  width: 150px;
  height: 150px;
`;

export const Splash = () => {
  return (
    <BackGround>
      <ImageLogo source={images.logo} />
    </BackGround>
  );
};
