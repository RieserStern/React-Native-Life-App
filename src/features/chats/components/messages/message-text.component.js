import React from "react";
import styled from "styled-components/native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructures/theme/colors";
import { DateTimeComponent } from "../datetime.component";

const Container = styled.View`
  padding: ${(props) => props.theme.spaces[3]};
  max-width: ${(props) => props.maxWidth};
  align-items: flex-end;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom-left-radius: ${(props) => (props.isOwner ? "12px" : "0px")};
  border-bottom-right-radius: ${(props) => (props.isOwner ? "0px" : "12px")};
  ${(props) =>
    !props.isOwner &&
    `border-width: 1px; border-color: ${props.theme.colors.ui.gray};`}
  background-color: ${(props) =>
    props.isOwner
      ? props.theme.colors.ui.primary
      : props.theme.colors.bg.lightgray};};
`;

export const MessageTextComponent = ({ message, isOwner, maxWidth }) => {
  return (
    <Container isOwner={isOwner} maxWidth={maxWidth}>
      <Text
        style={{ minWidth: 50 }}
        variant="label"
        color={isOwner ? colors.text.white : colors.text.black}
      >
        {message.text}
      </Text>

      <Spacer />

      <DateTimeComponent
        color={isOwner ? colors.text.white : colors.text.gray}
        timeStamp={message.createdAt}
      />
    </Container>
  );
};
