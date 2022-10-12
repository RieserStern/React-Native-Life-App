import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import RtcEngine from "react-native-agora";
import { TouchableOpacity } from "react-native";

import { AGORA_APP_ID } from "../../constants/app";
import { checkMicPermission } from "../../utils/permissions";
import database from "@react-native-firebase/database";
import { SafeArea } from "../../components/utils/safe-area.component";
import { images } from "../../images";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Spacer } from "../../components/spacer/spacer.component";
import {
  ButtonImage,
  ControlButtonsContainer,
  ButtomButtonContainer,
} from "./components/buttons.styles";
import { Text } from "../../components/typography/text.component";
import { MEDIA_FOLDER } from "../../libs/firebase/storage";
import { DB_INTERNAL } from "../../libs/database";
import { colors } from "../../infrastructures/theme/colors";
import { getImagePath } from "../../utils/media";

const InterSpacer = styled.View`
  flex: 1;
`;

const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const TopContainer = styled.View`
  flex: 2;
  width: 100%;
`;

const BottomContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const VoiceCallScreen = ({ navigation, route }) => {
  const { chatId, receptId, outGoing } = route.params;

  const _engine = useRef(null);
  const [isJoined, setJoined] = useState(false);

  const [speakerEnable, setSpeakerEnable] = useState(true);
  const [videoEnable, setVideoEnable] = useState(true);
  const [voiceEnable, setVoiceEnable] = useState(true);

  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState(null);

  const insets = useSafeAreaInsets();

  const reference = database().ref(`/voice_call/${chatId}`);

  useEffect(() => {
    /**
     * @name init
     * @description Function to initialize the Rtc Engine, attach event listeners and actions
     */
    const init = async () => {
      await checkMicPermission();
      setJoined(false);
      _engine.current = await RtcEngine.create(AGORA_APP_ID);
      _engine.current.addListener("Warning", (warn) => {
        console.log("Warning", warn);
      });

      _engine.current.addListener("Error", (err) => {
        console.log("Error", err);
      });

      _engine.current.addListener("UserJoined", (uid, elapsed) => {
        console.log("UserJoined", uid, elapsed);
        // If new user
        setJoined(true);
      });

      _engine.current.addListener("UserOffline", (uid, reason) => {
        console.log("UserOffline", uid, reason);
        // Remove peer ID from state array
      });

      // If Local user joins RTC channel
      _engine.current.addListener(
        "JoinChannelSuccess",
        (channel, uid, elapsed) => {
          console.log("JoinChannelSuccess", channel, uid, elapsed);
          // Set state variable to true
          setJoined(true);
        }
      );

      reference.on("child_removed", (snapshot) => {});

      setRecepitInfo();

      if (outGoing) {
        reference.set({
          receiver: receptId,
          status: 1,
        });

        reference.on("child_changed", (snapshot) => {
          if (snapshot.val() == 4) {
            console.log(snapshot);
            joinCall();
          }
        });
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSpeakerEnable = async () => {
    setSpeakerEnable(!speakerEnable);
    await _engine.current.setEnableSpeakerphone(videoEnable);
  };

  const onVideoSettingChange = async () => {};

  const onVoiceSettingChange = async () => {
    setVoiceEnable(!voiceEnable);
    await _engine.current.muteLocalAudioStream(videoEnable);
  };

  const startCall = async () => {
    // Join Channel using null token and channel name
    console.log("Start Call");
    reference.set({
      receiver: receptId,
      status: 4,
    });
    joinCall();
  };

  const joinCall = async () => {
    await _engine.current?.joinChannel("", chatId, null, 0);
  };

  /**
   * @name endCall
   * @description Function to end the call
   */
  const endCall = async () => {
    reference.remove();

    await _engine.current?.leaveChannel();
    setJoined(false);

    navigation.goBack();
  };

  const setRecepitInfo = async () => {
    if (receptId && receptId != "") {
      const personName = await DB_INTERNAL.getPersonName(receptId);
      setUsername(personName);
      const path = await getImagePath(`${receptId}.jpg`, MEDIA_FOLDER.USER);

      if (path) {
        setAvatar(path);
      }
    } else {
      const titleGet = await DB_INTERNAL.getGroupName(chatId);

      setUsername(titleGet);

      const path = await getImagePath(`${chatId}.jpg`, MEDIA_FOLDER.USER);

      if (path) {
        setAvatar(path);
      }
    }
  };

  return (
    <>
      <SafeArea>
        <TopContainer>
          {avatar && <AvatarImage source={{ uri: avatar }} />}
        </TopContainer>
        <BottomContainer>
          <Spacer size="large" />
          <Text variant="label" color={colors.text.gray}>
            Full HD Voice
          </Text>
          <Spacer size="large" />
          {username && (
            <Text variant="caption" color={colors.text.black}>
              {username}
            </Text>
          )}
          <Spacer size="large" />
          <Text variant="label" color={colors.text.lightgray}>
            {outGoing ? "Calling..." : "Incoming..."}
          </Text>
          <Spacer size="large" />
        </BottomContainer>
        {!isJoined && !outGoing ? (
          <ButtomButtonContainer bottom={8 + insets.bottom}>
            <TouchableOpacity onPress={endCall}>
              <ButtonImage source={images.ic_call_video_decline} />
            </TouchableOpacity>
            <InterSpacer />
            <TouchableOpacity onPress={startCall}>
              <ButtonImage source={images.ic_call_voice_answer} />
            </TouchableOpacity>
          </ButtomButtonContainer>
        ) : (
          <ButtomButtonContainer bottom={8 + insets.bottom}>
            <TouchableOpacity onPress={endCall}>
              <ButtonImage source={images.ic_call_video_decline} />
            </TouchableOpacity>
          </ButtomButtonContainer>
        )}
        {isJoined && (
          <ControlButtonsContainer top={8 + insets.top}>
            <TouchableOpacity onPress={onSpeakerEnable}>
              <ButtonImage
                source={
                  speakerEnable
                    ? images.ic_call_audio_off
                    : images.ic_call_audio_on
                }
              />
            </TouchableOpacity>
            <Spacer size="large" />
            <TouchableOpacity onPress={onVideoSettingChange}>
              <ButtonImage
                source={
                  videoEnable
                    ? images.ic_call_video_off
                    : images.ic_call_video_on
                }
              />
            </TouchableOpacity>
            <Spacer size="large" />
            <TouchableOpacity onPress={onVoiceSettingChange}>
              <ButtonImage
                source={
                  voiceEnable
                    ? images.ic_call_voice_off
                    : images.ic_call_voice_on
                }
              />
            </TouchableOpacity>
          </ControlButtonsContainer>
        )}
      </SafeArea>
    </>
  );
};
