import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RNFS from "react-native-fs";
import styled from "styled-components/native";
import { images } from "../../../../images";
import { firebaseSDK } from "../../../../libs/firebase";
import { MessageTextComponent } from "./message-text.component";
import { Dimensions } from "react-native";
import { MessagePayComponent } from "./message-pay.component";
import { MessagePhotoComponent } from "./message-photo.component";
import { MEDIA_FOLDER } from "../../../../libs/firebase/storage";
import { getImagePath } from "../../../../utils/media";
import { MessageCallComponent } from "./message-call.component";

const Container = styled.TouchableOpacity`
  width: 100%;
  align-items: flex-end;
  justify-content: ${(props) => (props.isOwner ? "flex-end" : "flex-start")};
  flex-direction: row;
  padding: ${(props) => props.theme.spaces[2]};
`;

const HeaderImage = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: ${(props) => (props.isOwner ? props.theme.spaces[2] : "0px")};
  margin-right: ${(props) => (props.isOwner ? "0px" : props.theme.spaces[2])};
`;

const messageContent = (message, isOwner, maxWidth) => {
  const { type } = message;

  console.log(type);

  if (type == "pay") {
    return (
      <MessagePayComponent
        message={message}
        isOwner={isOwner}
        width={maxWidth}
      />
    );
  }

  if (type == "photo") {
    return (
      <MessagePhotoComponent
        message={message}
        isOwner={isOwner}
        maxWidth={maxWidth}
      />
    );
  }

  if (type == 1 || type == 2 || type == 3) {
    return (
      <MessageCallComponent
        message={message}
        isOwner={isOwner}
        width={maxWidth}
      />
    );
  }

  return (
    <MessageTextComponent
      message={message}
      isOwner={isOwner}
      maxWidth={maxWidth}
    />
  );
};

export const MessageComponent = ({ message }) => {
  const { user } = useSelector((state) => state.login_state);

  const maxWidth = Dimensions.get("window").width - 128;

  const [avatar, setAvatar] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (message && message != {}) {
      setAvataImage(`${message.item.userId}.jpg`);
      setIsOwner(message.item.userId == user.id);
    }
  }, [message]);

  const setAvataImage = async (fileName) => {
    const path = await getImagePath(fileName, MEDIA_FOLDER.USER);

    if (path) {
      setAvatar(path);
    }
  };

  return (
    <Container isOwner={isOwner}>
      {isOwner && messageContent(message.item, isOwner, maxWidth)}
      <HeaderImage
        source={avatar ? { uri: avatar } : images.ic_default_profile}
        isOwner={isOwner}
      />
      {!isOwner && messageContent(message.item, isOwner, maxWidth)}
    </Container>
  );
};
