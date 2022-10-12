import React, { useContext } from "react";
import { SafeArea } from "../../components/utils/safe-area.component";
import { ChatListHeaderComponent } from "./components/header.component";
import styled from "styled-components/native";
import { SearchbarComponent } from "./components/search-bar.component";
import { PersonComponent } from "./components/person.component";
import { HomeContext } from "../../services/app/app.context";
import { APP_NAVIGATION } from "../../constants/app";

const StatusBar = styled.View`
  background-color: ${(props) => props.theme.colors.ui.primary};
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
`;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  margin-horizontal: 10px;
`;

export const ChatListScreen = ({ navigation }) => {
  const { chats } = useContext(HomeContext);

  const onNavigate = (chatId, accepterId) => {
    navigation.navigate(APP_NAVIGATION.chat, {
      chatId,
      accepterId,
    });
  };

  return (
    <>
      <StatusBar />
      <SafeArea>
        <ChatListHeaderComponent />
        <SearchbarComponent />
        <MainContainer>
          <ScrollContainer>
            {chats.length > 0 &&
              chats.map((chat, index) => {
                return (
                  <PersonComponent
                    CELLInfo={chat}
                    key={`data-${index}`}
                    onNavigate={onNavigate}
                  />
                );
              })}
          </ScrollContainer>
        </MainContainer>
      </SafeArea>
    </>
  );
};
