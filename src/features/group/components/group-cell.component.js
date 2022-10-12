import React from "react";
import { Text } from "../../../components/typography/text.component";
import styled from "styled-components/native";
import { images } from "../../../images";
import { colors } from "../../../infrastructures/theme/colors";

const Container = styled.View`
  flex: ${1 / 4};
  align-items: center;
  justify-content: center;
`;

export const ButtonAdd = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.ui.border};
  margin-bottom: ${(props) => props.theme.spaces[3]};
  align-items: center;
  justify-content: center;
`;

export const ImageAdd = styled.Image`
  width: 30px;
  height: 30px;
`;

export const ImageHeader = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

export const GROUP_CELL_TYPE = {
  add: "add",
  member: "member",
};

export const GroupCellComponent = ({ item }) => {
  const { type, friend_id } = item;
  return (
    <Container>
      <ButtonAdd>
        <ImageAdd
          source={
            type == GROUP_CELL_TYPE.add
              ? images.ic_add_group
              : images.ic_default_profile
          }
        />
      </ButtonAdd>
      <Text variant="label" color={colors.text.black}>
        {type == GROUP_CELL_TYPE.add ? "ADD" : "CELL"}
      </Text>
    </Container>
  );
};
