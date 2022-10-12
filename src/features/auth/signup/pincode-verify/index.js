import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import { NextButton } from "../components/nextbutton.componet";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { colors } from "../../../../infrastructures/theme/colors";

const MainContainer = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.spaces[3]};
  align-items: center;
`;

const BottomContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spaces[3]};
`;

export const PincodeVerifyScreen = ({ onVerify }) => {
  const [code, setCode] = useState("");
  const pinInput = useRef(null);

  return (
    <>
      <MainContainer>
        <Text variant="title" color={colors.text.black} center>
          Please Enter the Code you received by SMS
        </Text>
        <Spacer position="top" size="large" />
        <SmoothPinCodeInput
          ref={pinInput}
          value={code}
          onTextChange={(text) => setCode(text)}
          codeLength={6}
        />
      </MainContainer>
      <BottomContainer>
        <NextButton onNext={() => onVerify(code)} enabled={code.length == 6} />
      </BottomContainer>
    </>
  );
};
