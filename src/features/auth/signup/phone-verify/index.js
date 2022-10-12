import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { NextButton } from "../components/nextbutton.componet";
import { Text } from "../../../../components/typography/text.component";
import PhoneInput from "react-native-phone-number-input";
import { colors } from "../../../../infrastructures/theme/colors";
import { Spacer } from "../../../../components/spacer/spacer.component";

// Phone number View

const MainContainer = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.spaces[3]};
`;

const PhoneNumberInput = styled(PhoneInput)`
  width: 100%;
`;

const BottomContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spaces[3]};
`;

const BottomTextContainer = styled.View`
  flex: 1;
  margin-right: 20px;
`;

export const PhoneVerifyScreen = ({ onSendCode }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const phoneInput = useRef(null);

  const sendCode = () => {
    onSendCode(phoneNumber);
  };

  return (
    <>
      <MainContainer>
        <Text variant="title" color={colors.text.black}>
          What is the phone number for this device?
        </Text>
        <Spacer position="top" size="large" />
        <PhoneNumberInput
          ref={phoneInput}
          defaultValue={phoneNumber}
          defaultCode={"JP"}
          layout="first"
          autoFocus
          onChangeFormattedText={(text) => setPhoneNumber(text)}
        />
      </MainContainer>
      <BottomContainer>
        <BottomTextContainer>
          <Text variant="small" color={colors.text.gray}>
            By continuing you will receive an SMS for verification. Messages and
            data rates may apply.
          </Text>
        </BottomTextContainer>
        <NextButton onNext={sendCode} enabled={phoneNumber.length > 9} />
      </BottomContainer>
    </>
  );
};
