import React from "react";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../../infrastructures/theme/colors";
import { TouchableOpacity } from "react-native";

const Container = styled.View`
  height: 32px;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: ${(props) => props.theme.spaces[2]};
`;

const TextContainer = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: center;
`;

export const SectionComponent = ({ showContent, onClick, title }) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <Container>
        <TextContainer>
          <Text variant="label" color={colors.text.black}>
            {title}
          </Text>
        </TextContainer>
        <Ionicons
          name={showContent ? "md-chevron-down" : "md-chevron-up"}
          size={24}
        />
      </Container>
    </TouchableOpacity>
  );
};
