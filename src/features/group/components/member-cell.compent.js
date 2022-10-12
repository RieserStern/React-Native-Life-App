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
import Ionicons from "react-native-vector-icons/Ionicons";

const Container = styled.View`
  height: 80px;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: black;
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

const SelectionCheckBox = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  ${(props) => (props.selected ? "border-radius: 1px;" : "")}
  boerder-color: ${(props) => props.theme.colors.ui.gray};
  background-color: ${(props) =>
    props.selected ? props.theme.colors.ui.green : props.theme.colors.ui.white};
  margin-right: ${(props) => props.theme.spaces[2]};
`;

const IconCheck = styled(Ionicons).attrs({
  size: 24,
  name: "md-checkmark",
})``;

export const MemberCellComponent = ({ friend, onSelect, selected }) => {
  const [image_uri, setImage_url] = useState(null);
  const [phone, setPhone] = useState(null);
  const [name, setName] = useState(null);

  const { user } = useSelector((state) => state.login_state);

  useEffect(() => {
    if (friend && friend != {}) {
      console.log(friend);
      setName("Test");
      setPhone("Test");
      //setImage(`${friend.objectId}.jpg`);
    }
  }, [friend]);

  const setImage = async (fileName) => {
    const path = await getImagePath(fileName, MEDIA_FOLDER.USER);

    if (path) {
      setImage_url(path);
    }
  };

  const onClickSelect = () => {
    onSelect(friend.objectId);
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
      <TouchableOpacity onPress={onClickSelect}>
        <SelectionCheckBox>{selected && <IconCheck />}</SelectionCheckBox>
      </TouchableOpacity>
    </Container>
  );
};
