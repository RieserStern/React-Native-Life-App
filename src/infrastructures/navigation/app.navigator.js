import React from "react";
import { HomeContextProvider } from "../../services/app/app.context";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { HomeNavigator } from "./home.navigator";
import { SettingsScreen } from "../../features/settings/settings.screen";
import { ChatScreen } from "../../features/chats/chat.screen";
import { VideoCallScreen } from "../../features/calls/call-video.screen";
import { VoiceCallScreen } from "../../features/calls/call-audio.screen";
import { ChatContextProvider } from "../../services/chat/chat.context";
import { FriendAddScreen } from "../../features/friend/friend-add.screen";
import { FriendSearchScreen } from "../../features/friend/friend-search.screen";
import { APP_NAVIGATION } from "../../constants/app";
import { FriendQRCodeScreen } from "../../features/friend/friend-qrcode.screen";
import { GroupScreen } from "../../features/group/group.screen";

const Stack = createStackNavigator();

const getChatScreen = (route, navigation) => {
  return (
    <ChatContextProvider route={route} navigation={navigation}>
      <ChatScreen navigation={navigation} route={route} />
    </ChatContextProvider>
  );
};

export const AppNavigator = () => {
  return (
    <>
      <HomeContextProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}
        >
          <Stack.Screen name={APP_NAVIGATION.home} component={HomeNavigator} />
          <Stack.Screen
            name={APP_NAVIGATION.setting}
            component={SettingsScreen}
          />
          <Stack.Screen
            name={APP_NAVIGATION.chat}
            component={({ route, navigation }) =>
              getChatScreen(route, navigation)
            }
          />
          <Stack.Screen
            name={APP_NAVIGATION.video}
            component={VideoCallScreen}
          />
          <Stack.Screen
            name={APP_NAVIGATION.audio}
            component={VoiceCallScreen}
          />
          <Stack.Screen
            name={APP_NAVIGATION.friend_add}
            component={FriendAddScreen}
          />
          <Stack.Screen
            name={APP_NAVIGATION.friend_search}
            component={FriendSearchScreen}
          />
          <Stack.Screen
            name={APP_NAVIGATION.friend_qrcode}
            component={FriendQRCodeScreen}
          />
          <Stack.Screen name={APP_NAVIGATION.group} component={GroupScreen} />
        </Stack.Navigator>
      </HomeContextProvider>
    </>
  );
};
