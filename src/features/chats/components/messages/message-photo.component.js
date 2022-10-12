import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructures/theme/colors";
import { firebaseSDK } from "../../../../libs/firebase";
import { DateTimeComponent } from "../datetime.component";
import RNFS from "react-native-fs";
import { MEDIA_FOLDER } from "../../../../libs/firebase/storage";

var CryptoJS = require("crypto-js");

const Container = styled.View`
  padding: ${(props) => props.theme.spaces[3]};
  width: ${(props) => props.maxWidth};
  align-items: ${(props) => (props.isOwner ? "flex-start" : "flex-end")};
  border-radius: 12px;
  background-color: ;
`;

const ImagePhoto = styled.Image`
  width: 100px;
  height: 100px;
`;

export const MessagePhotoComponent = ({ message, isOwner, maxWidth }) => {
  // Decrypt

  const [imageLink, setImageLink] = useState(null);

  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    setImage(`${message.objectId}.jpg`);
  }, [message]);

  const setImage = async (fileName) => {
    const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    const exists = await RNFS.exists(filePath);

    console.log(filePath);

    if (exists) {
      const file = await RNFS.readFile(filePath, "base64");

      const encryptedText = CryptoJS.enc.Base64.parse(file);

      const encrypted = encryptedText.toString(CryptoJS.enc.Base64);

      const pass = CryptoJS.SHA1(message.chatId).toString();

      const encodedFile = await CryptoJS.AES.decrypt(encrypted, pass, {
        format: CryptoJS.enc.Base64,
        iv: pass,
      });

      console.log(encodedFile);

      setImageData(file);

      //setImageLink(filePath);
    } else {
      const url = await firebaseSDK.getDownloadURL(
        `${MEDIA_FOLDER.MEDIA}/${fileName}`
      );
      console.log(url);

      RNFS.downloadFile({ fromUrl: url, toFile: filePath })
        .promise.then((r) => {
          console.log(r);
          setImageLink(filePath);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Container isOwner={isOwner} maxWidth={maxWidth}>
      {imageLink && <ImagePhoto source={{ uri: imageLink }} />}
      {imageData && (
        <ImagePhoto source={{ uri: `data:image/jpeg;base64,${imageData}` }} />
      )}
    </Container>
  );
};
