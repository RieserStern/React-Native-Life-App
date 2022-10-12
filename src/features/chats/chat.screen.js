import React, { useContext, useRef, useState } from "react";
import styled from "styled-components/native";
import { ChatHeaderComponent } from "./components/header.component";
import { SearchbarComponent } from "./components/search-bar.component";
import { ChatContext } from "../../services/chat/chat.context";
import { CallControlComponent } from "./components/call-control.component";
import { KeyboardAccessoryView } from "react-native-ui-lib/keyboard";
import { NativeModules, SafeAreaView as RNSafeAreaView } from "react-native";
import { ChatInputComponent } from "./components/chat-input.component";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { MessageComponent } from "./components/messages";
import { APP_NAVIGATION } from "../../constants/app";

const StatusBar = styled.View`
  background-color: ${(props) => props.theme.colors.ui.primary};
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 30%;
`;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const ChatScreen = ({ navigation, route }) => {
  const { chatId, accepterId } = route.params;
  const [showControl, setShowControl] = useState(false);
  const [message, setMessage] = useState("");

  const tracking = useRef(null);
  const input = useRef(null);

  const { title, messages } = useContext(ChatContext);

  const onClickClose = () => {
    navigation.goBack();
  };

  const onClickCall = () => {
    setShowControl(!showControl);
  };

  const onChangeChat = (text) => {
    setMessage(text);
  };

  const onVideoCall = () => {
    navigation.push(APP_NAVIGATION.video, {
      chatId,
      receptId: accepterId,
      outGoing: true,
    });
    setShowControl(false);
  };

  const onVoiceCall = () => {
    navigation.push(APP_NAVIGATION.audio, {
      chatId,
      receptId: accepterId,
      outGoing: true,
    });
    setShowControl(false);
  };

  return (
    <>
      <StatusBar />
      <RNSafeAreaView style={{ height: 0 }}></RNSafeAreaView>
      <ChatHeaderComponent
        title={title}
        onClickClose={onClickClose}
        onClickCall={onClickCall}
      />
      <SearchbarComponent />
      <MainContainer>
        <KeyboardAwareFlatList
          style={{ flex: 1 }}
          data={messages}
          renderItem={(item, index) => <MessageComponent message={item} />}
          keyExtractor={(item) => item.objectId}
          inverted
          contentContainerStyle={{ paddingTop: 4 }}
        />
        <KeyboardAccessoryView
          ref={tracking}
          key="input"
          renderContent={() => (
            <ChatInputComponent
              input={input}
              message={message}
              onChangeChat={onChangeChat}
            />
          )}
          requiresSameParentToManageScrollView
          addBottomView
          iOSScrollbehavior={
            NativeModules.KeyboardTrackingViewManager
              ?.keyboardTrackingScrollBehaviorFixedOffset
          }
        />
        {showControl && (
          <CallControlComponent
            onVideoCall={onVideoCall}
            onVoiceCall={onVoiceCall}
          />
        )}
      </MainContainer>
    </>
  );
};
