import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructures/theme/colors";
import { firebaseSDK } from "../../../../libs/firebase";
import { decrypt, encrypt } from "../../../../utils/cryptor";
import { DateTimeComponent } from "../datetime.component";
import RNFS from "react-native-fs";

const Container = styled.View`
  padding: ${(props) => props.theme.spaces[3]};
  width: ${(props) => props.width};
  align-items: ${(props) => (props.isOwner ? "flex-start" : "flex-end")};
  border-radius: 12px;
  background-color: ;
`;

export const MessagePayComponent = ({ message, isOwner, width }) => {
  // Decrypt

  return (
    <Container isOwner={isOwner} width={width}>
      <Text style={{ minWidth: 50 }} variant="label" color={colors.text.black}>
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
