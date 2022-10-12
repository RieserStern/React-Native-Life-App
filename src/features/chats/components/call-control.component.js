import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { images } from "../../../images";

const Background = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.bg.darkalpha};
  position: absolute;
  left: 0;
  top: 0;
`;

const CallControlContainer = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.ui.primary};
  align-items: center;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image`
  width: 32px;
  height: 32px;
`;

export const CallControlComponent = ({ onVideoCall, onVoiceCall }) => {
  return (
    <Background>
      <CallControlContainer>
        <Container>
          <TouchableOpacity>
            <Image source={images.ic_chat_zedpay} />
          </TouchableOpacity>
        </Container>
        <Container>
          <TouchableOpacity onPress={onVideoCall}>
            <Image source={images.ic_chat_video_call} />
          </TouchableOpacity>
        </Container>
        <Container>
          <TouchableOpacity onPress={onVoiceCall}>
            <Image source={images.ic_chat_voice_call} />
          </TouchableOpacity>
        </Container>
      </CallControlContainer>
    </Background>
  );
};
