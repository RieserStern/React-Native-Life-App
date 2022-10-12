import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { images } from "../../../images";
import { colors } from "../../../infrastructures/theme/colors";
import { MEDIA_FOLDER } from "../../../libs/firebase/storage";
import { firebaseSDK } from "../../../libs/firebase";
import { DB_INTERNAL } from "../../../libs/database";
import { dateStringFromNow } from "../../../utils/datetime";
import { getImagePath } from "../../../utils/media";

const Container = styled.TouchableOpacity`
  height: 80px;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: ${(props) => props.theme.spaces[2]};
`;

const HeaderImage = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-right: ${(props) => props.theme.spaces[2]};
`;

const TextContainer = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: center;
`;

const DateContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const PERSONCELLTYPE = {
  group: "group",
  friend: "friend",
  chats: "chats",
  group_header: "header",
  user: "user",
};

export const PersonComponent = ({ CELLInfo, onNavigate }) => {
  const [image_uri, setImage_url] = useState(null);
  const [title, setTitle] = useState(null);
  const [message, setMessage] = useState(null);
  const [name, setName] = useState(null);
  const { cell_type } = CELLInfo;

  useEffect(() => {
    if (CELLInfo && CELLInfo != {}) {
      if (cell_type == PERSONCELLTYPE.user) {
        const titleNew =
          CELLInfo.fullname ??
          CELLInfo.username ??
          CELLInfo.email ??
          CELLInfo.phone;
        setTitle(titleNew);
        const messageNew = CELLInfo.about;
        setMessage(messageNew);
        setImage(`${CELLInfo.id}.jpg`);
      } else if (cell_type == PERSONCELLTYPE.group_header) {
        setTitle(CELLInfo.title);
        setMessage(CELLInfo.message);
      } else if (cell_type == PERSONCELLTYPE.group) {
        setName(CELLInfo.name);
        setImage(`${CELLInfo.objectId}.jpg`);
      } else if (cell_type == PERSONCELLTYPE.friend) {
        const nameNew =
          CELLInfo.fullname ??
          CELLInfo.username ??
          CELLInfo.email ??
          CELLInfo.phone;
        console.log(nameNew);
        setName(nameNew);
        setImage(`${CELLInfo.objectId}.jpg`);
      } else if (cell_type == PERSONCELLTYPE.chats) {
        setChatsContent();
        setImage(`${CELLInfo.user_id}.jpg`);
      }
    }
  }, [CELLInfo]);

  const setChatsContent = async () => {
    if (CELLInfo.isGroup) {
      const groupName = await DB_INTERNAL.getGroupName(CELLInfo.user_id);

      if (groupName) {
        setTitle(groupName);
        setMessage(CELLInfo.text);
      } else {
        const group = await firebaseSDK.getGroup(CELLInfo.user_id);
        if (group) {
          setTitle(group.name);
          setMessage(CELLInfo.text);
        }
      }
    } else {
      const personData = await DB_INTERNAL.getPerson(CELLInfo.user_id);

      console.log(CELLInfo);

      if (personData) {
        const titleNew =
          personData.fullname ??
          personData.username ??
          personData.email ??
          personData.phone;
        setTitle(titleNew);
        setCellMessage();
      } else {
        const person = await firebaseSDK.getPerson(CELLInfo.user_id);

        if (person) {
          const titleNew =
            person.fullname ?? person.username ?? person.email ?? person.phone;
          setTitle(titleNew);
          setCellMessage();
        }
      }
    }
  };

  const setCellMessage = () => {
    if (CELLInfo.type == "pay") {
      if (CELLInfo.userId == CELLInfo.user_id) {
        setMessage("Payment Received.");
      } else {
        setMessage("Payment Sent.");
      }
    } else {
      setMessage(CELLInfo.text);
    }
  };

  const setImage = async (fileName) => {
    const path = await getImagePath(fileName, MEDIA_FOLDER.USER);

    if (path) {
      setImage_url(path);
    }
  };

  const onClick = async () => {
    if (cell_type == PERSONCELLTYPE.group) {
      onNavigate(CELLInfo.chatId, "");
    } else if (cell_type == PERSONCELLTYPE.friend) {
      const singleData = await DB_INTERNAL.getSingle(CELLInfo.objectId);
      console.log("singleData", singleData);
      if (singleData) {
        onNavigate(singleData.chatId, CELLInfo.objectId);
      } else {
        const single = await firebaseSDK.getSingle(CELLInfo.objectId);
        if (single) {
          onNavigate(single.chatId, CELLInfo.objectId);
        }
      }
    } else if (cell_type == PERSONCELLTYPE.chats) {
      if (CELLInfo.isGroup) {
        onNavigate(CELLInfo.chatId, "");
      } else {
        onNavigate(CELLInfo.chatId, CELLInfo.user_id);
      }
      //console.log(dateStringFromNow(CELLInfo.createdAt));
    } else if (cell_type == PERSONCELLTYPE.group_header) {
      onNavigate("", "");
    }
  };

  return (
    <Container onPress={onClick}>
      {cell_type == PERSONCELLTYPE.group_header ? (
        <HeaderImage source={images.ic_create_group} />
      ) : image_uri ? (
        <HeaderImage source={{ uri: image_uri }} />
      ) : (
        <HeaderImage source={images.ic_default_profile} />
      )}
      <TextContainer>
        {title && (
          <>
            <Text variant="label" color={colors.text.black}>
              {title}
            </Text>
            <Text variant="hint" color={colors.text.gray}>
              {message}
            </Text>
          </>
        )}
        {name && (
          <Text variant="label" color={colors.text.black}>
            {name}
          </Text>
        )}
      </TextContainer>
      {cell_type == PERSONCELLTYPE.chats && (
        <DateContainer>
          <Text variant="hint" color={colors.text.gray}>
            {dateStringFromNow(CELLInfo.createdAt)}
          </Text>
        </DateContainer>
      )}
    </Container>
  );
};
