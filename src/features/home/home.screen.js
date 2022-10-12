import React, { useContext } from "react";
import { SafeArea } from "../../components/utils/safe-area.component";
import { HomeHeaderComponent } from "./components/header.component";
import styled from "styled-components/native";
import { SearchbarComponent } from "./components/search-bar.component";
import { PersonComponent } from "./components/person.component";
import { HomeContext } from "../../services/app/app.context";
import { HomeSectionScreen } from "./home-section.screen";
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

export const HomeScreen = ({ navigation }) => {
  const { userInfo, groups, friends } = useContext(HomeContext);
  console.log(userInfo, friends);

  const onClickSettings = () => {
    navigation.navigate(APP_NAVIGATION.setting);
  };

  const onClickFriends = () => {
    navigation.navigate(APP_NAVIGATION.friend_add);
  };

  const onNavigate = (chatId, accepterId) => {
    if (chatId && chatId != "") {
      navigation.navigate(APP_NAVIGATION.chat, {
        chatId,
        accepterId,
      });
    } else {
      navigation.navigate(APP_NAVIGATION.group);
    }
  };

  return (
    <>
      <StatusBar />
      <SafeArea>
        <HomeHeaderComponent
          onClickSettings={onClickSettings}
          onClickFriends={onClickFriends}
        />
        <SearchbarComponent />
        <MainContainer>
          <ScrollContainer>
            {userInfo && <PersonComponent CELLInfo={userInfo} />}
            {groups.length > 0 && (
              <HomeSectionScreen
                title="Groups"
                items={groups}
                onNavigate={onNavigate}
              />
            )}
            {friends.length > 0 && (
              <HomeSectionScreen
                title="Friends"
                items={friends}
                onNavigate={onNavigate}
              />
            )}
          </ScrollContainer>
        </MainContainer>
      </SafeArea>
    </>
  );
};
