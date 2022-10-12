import React from "react";
import styled from "styled-components/native";

import { SafeAreaView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../../infrastructures/theme/colors";
import { TouchableOpacity } from "react-native";

const InputAreaContainer = styled.View`
  width: 100%;
  max-height: 100px;
  flex-direction: row;
  align-items: center;
  max-height: 100px;
  border-top-color: ${(props) => props.theme.colors.ui.gray};
  border-top-width: 1px;
`;

const Input = styled.TextInput`
  flex: 1;
  flex-grow: 1;
  flex-wrap: wrap;
  border-radius: 16px;
  flex-wrap: wrap;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-horizontal: 12px;
  border-color: ${(props) => props.theme.colors.ui.gray};
  border-width: 1px;
  margin-top: 6px;
  margin-bottom: 6px;
  margin-right: 4px;
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

const IconAttach = styled(Ionicons).attrs({
  name: "md-attach",
  size: 28,
  color: colors.ui.gray,
})``;

const AttachContainer = styled.View`
  padding: 4px;
  margin-left: ${(props) => props.theme.spaces[1]};
  margin-right: ${(props) => props.theme.spaces[1]};
  border-radius: 18px;
`;

const IconMic = styled(Ionicons).attrs({
  name: "md-mic",
  size: 28,
  color: colors.ui.primary,
})``;

const MicContainer = styled.View`
  padding: 4px;
  margin-left: ${(props) => props.theme.spaces[1]};
  margin-right: ${(props) => props.theme.spaces[1]};
  border-radius: 18px;
`;

const IconSend = styled(Ionicons).attrs({
  name: "md-arrow-up",
  size: 28,
  color: colors.ui.white,
})``;

const SendContainer = styled.View`
  padding: 4px;
  background-color: ${(props) => props.theme.colors.ui.primary};
  margin-left: ${(props) => props.theme.spaces[1]};
  margin-right: ${(props) => props.theme.spaces[1]};
  border-radius: 18px;
`;

export const ChatInputComponent = ({
  input,
  message,
  onChangeChat,
  onSubmitChat,
  onAttach,
  onMic,
}) => {
  return (
    <SafeAreaView style={{ backgroundColor: colors.bg.primary }}>
      <InputAreaContainer>
        <TouchableOpacity>
          <AttachContainer>
            <IconAttach />
          </AttachContainer>
        </TouchableOpacity>
        <Input
          ref={(r) => (input = r)}
          returnKeyType={"default"}
          keyboardType="default"
          multiline
          placeholder="Enter a Message"
          onChangeText={(text) => onChangeChat(text)}
          onSubmitEditing={onSubmitChat}
          value={message}
        />
        {message ? (
          <TouchableOpacity>
            <SendContainer>
              <IconSend />
            </SendContainer>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <MicContainer>
              <IconMic />
            </MicContainer>
          </TouchableOpacity>
        )}
      </InputAreaContainer>
    </SafeAreaView>
  );
};
