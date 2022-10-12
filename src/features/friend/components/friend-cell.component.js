import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { images } from "../../../images";
import { colors } from "../../../infrastructures/theme/colors";
import { MEDIA_FOLDER } from "../../../libs/firebase/storage";
import { getImagePath } from "../../../utils/media";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { firebaseSDK } from "../../../libs/firebase";

const Container = styled.View`
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

const AddImage = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: ${(props) => props.theme.spaces[2]};
`;

export const FriendCellComponent = ({ friend, onAdd }) => {
  const [image_uri, setImage_url] = useState(null);
  const [phone, setPhone] = useState(null);
  const [name, setName] = useState(null);
  const [canAdd, setCanAdd] = useState(false);

  const { user } = useSelector((state) => state.login_state);

  useEffect(() => {
    console.log(friend);
    if (friend && friend != {}) {
      console.log(friend);
      setName(friend.username);
      setPhone(friend.phone);
      setImage(`${friend.objectId}.jpg`);
      checkFriend(user.id, friend.objectId);
    }
  }, [friend]);

  const checkFriend = async (user_id, friend_id) => {
    const isFriend = await firebaseSDK.checkFriend(user_id, friend_id);
    setCanAdd(!isFriend);
  };

  const setImage = async (fileName) => {
    const path = await getImagePath(fileName, MEDIA_FOLDER.USER);

    if (path) {
      setImage_url(path);
    }
  };

  const onClickAdd = () => {
    onAdd(friend.objectId);
  };

  return (
    <Container>
      {image_uri ? (
        <HeaderImage source={{ uri: image_uri }} />
      ) : (
        <HeaderImage source={images.ic_default_profile} />
      )}
      <TextContainer>
        {name && (
          <Text variant="label" color={colors.text.black}>
            {name}
          </Text>
        )}
        {phone && (
          <Text variant="hint" color={colors.text.gray}>
            {phone}
          </Text>
        )}
      </TextContainer>
      {canAdd && (
        <TouchableOpacity onPress={onClickAdd}>
          <AddImage source={images.ic_add_friend} />
        </TouchableOpacity>
      )}
    </Container>
  );
};
