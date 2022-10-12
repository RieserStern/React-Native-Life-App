import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { images } from "../../../../images";
import { colors } from "../../../../infrastructures/theme/colors";
import { DateTimeComponent } from "../datetime.component";

const Container = styled.View`
  padding: ${(props) => props.theme.spaces[1]};
  width: 220px;
  height: 40px;
  position: absolute;
  ${(props) => (props.isOwner ? "right: 30px;" : "left: 30px;")}
  top: 12px;
  align-items: flex-start;
  border-radius: 20px;
  z-index: -1;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.bg.lightgray};
  background-color: ${(props) => props.theme.colors.bg.primary};
  flex-direction: row;
`;

const Image = styled.Image`
  width: 30px;
  height: 30px;
  margin-left: 15px;
  margin-right: 15px;
`;

const TextContainer = styled.View`
  flex: 1;
  ${(props) => (props.isOwner ? "" : "margin-left: 30px;")}
  height: 100%;
`;

export const MessageCallComponent = ({ message, isOwner, width }) => {
  const [text, setText] = useState("");
  useEffect(() => {
    if (message.type == 3) {
      setText(isOwner ? "OutGoing Call" : "Incoming Call");
    } else {
      setText(message.text);
    }
  }, []);

  console.log(message);

  return (
    <Container isOwner={isOwner} width={width}>
      {isOwner && (
        <Image
          source={
            message.type == 3 ? images.ic_call_succeed : images.ic_call_missed
          }
        />
      )}
      <TextContainer isOwner={isOwner}>
        <Text
          variant="label"
          color={
            message.type == 3 ? colors.ui.callnormal : colors.ui.callmissed
          }
        >
          {text}
        </Text>
        <DateTimeComponent
          color={colors.text.lightgray}
          timeStamp={message.createdAt}
        />
      </TextContainer>
      {!isOwner && (
        <Image
          source={
            message.type == 3 ? images.ic_call_succeed : images.ic_call_missed
          }
        />
      )}
    </Container>
  );
};
