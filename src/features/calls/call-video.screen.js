import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from "react-native-agora";
import { TouchableOpacity } from "react-native";

import { AGORA_APP_ID } from "../../constants/app";
import {
  checkCameraPermission,
  checkMicPermission,
} from "../../utils/permissions";
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

const LocalVideoViewContainer = styled.View`
  width: 80px;
  height: 100px;
  position: absolute;
  right: ${(props) => props.theme.spaces[2]};
  bottom: ${(props) => props.bottom}px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.bg.lightgray};
`;

const LocalVideoView = styled(RtcLocalView.SurfaceView)`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const RemoteVideoViewContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.bg.lightgray};
`;

const RemoteVideoView = styled(RtcRemoteView.SurfaceView)`
  width: 100%;
  height: 100%;
`;

const StateContainer = styled.View`
  position: absolute;
  width: 100%;
  align-items: center;
  justify-content: center;
  top: 25%;
  background-color: ${(props) => props.theme.colors.bg.lightgray};
`;

const AvatarImage = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const VideoCallScreen = ({ navigation, route }) => {
  const { chatId, receptId, outGoing } = route.params;

  console.log(outGoing);
  const _engine = useRef(null);
  const [isJoined, setJoined] = useState(false);
  const [peerId, setPeerId] = useState(null);

  const [frontCamera, setFrontCamera] = useState(true);
  const [videoEnable, setVideoEnable] = useState(true);
  const [voiceEnable, setVoiceEnable] = useState(true);

  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState(null);

  const insets = useSafeAreaInsets();

  const reference = database().ref(`/video_call/${chatId}`);

  useEffect(() => {
    /**
     * @name init
     * @description Function to initialize the Rtc Engine, attach event listeners and actions
     */
    const init = async () => {
      await checkCameraPermission();
      await checkMicPermission();
      setJoined(false);
      _engine.current = await RtcEngine.create(AGORA_APP_ID);
      await _engine.current.enableVideo();
      _engine.current.addListener("Warning", (warn) => {
        console.log("Warning", warn);
      });

      _engine.current.addListener("Error", (err) => {
        console.log("Error", err);
      });

      _engine.current.addListener("UserJoined", (uid, elapsed) => {
        console.log("UserJoined", uid, elapsed);
        // If new user
        setPeerId(uid);
        setJoined(true);
      });

      _engine.current.addListener("UserOffline", (uid, reason) => {
        console.log("UserOffline", uid, reason);
        // Remove peer ID from state array
        setPeerId(null);
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

      reference.on("child_removed", (snapshot) => {
        console.log(snapshot);
      });

      setRecepitInfo();

      if (outGoing) {
        reference.set({
          receiver: receptId,
          status: 1,
        });

        reference.on("child_changed", (snapshot) => {
          if (snapshot.val() == 4) {
            joinCall();
          }
        });
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCameraChange = async () => {
    setFrontCamera(!frontCamera);
    await _engine.current.switchCamera();
  };

  const onVideoSettingChange = async () => {
    setVideoEnable(!videoEnable);
    if (videoEnable) {
      _engine.current.enableVideo();
    } else {
      _engine.current.disableVideo();
    }
  };

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

    if (isJoined) {
      await _engine.current?.leaveChannel();
      setPeerId(null);
      setJoined(false);
    }

    navigation.goBack();
  };

  const setRecepitInfo = async () => {
    console.log("Getting");
    if (receptId && receptId != "") {
      const personName = await DB_INTERNAL.getPersonName(receptId);
      console.log(personName);
      setUsername(personName);
      const path = await getImagePath(`${receptId}.jpg`, MEDIA_FOLDER.USER);

      console.log(path);

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
        <RemoteVideoViewContainer>
          {peerId && (
            <RemoteVideoView
              uid={peerId}
              channelId={chatId}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          )}
        </RemoteVideoViewContainer>

        <LocalVideoViewContainer bottom={8 + insets.bottom}>
          {isJoined && (
            <LocalVideoView
              channelId={chatId}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          )}
        </LocalVideoViewContainer>

        {!isJoined && !outGoing ? (
          <ButtomButtonContainer bottom={8 + insets.bottom}>
            <TouchableOpacity onPress={endCall}>
              <ButtonImage source={images.ic_call_video_decline} />
            </TouchableOpacity>
            <InterSpacer />
            <TouchableOpacity onPress={startCall}>
              <ButtonImage source={images.ic_call_video_answer} />
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
            <TouchableOpacity onPress={onCameraChange}>
              <ButtonImage
                source={
                  frontCamera
                    ? images.ic_call_camera_front
                    : images.ic_call_camera_back
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

        {!isJoined && (
          <StateContainer>
            {avatar && <AvatarImage source={{ uri: avatar }} />}
            <Spacer size="large" />
            {username && (
              <Text variant="caption" color={colors.ui.white}>
                {username}
              </Text>
            )}
            <Spacer size="medium" />
            <Text variant="label" color={colors.ui.white}>
              {outGoing ? "Calling..." : "Incoming..."}
            </Text>
          </StateContainer>
        )}
      </SafeArea>
    </>
  );
};
