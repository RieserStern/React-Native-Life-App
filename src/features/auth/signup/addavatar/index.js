import React, { useState } from "react";
import styled from "styled-components/native";
import { Alert, TouchableOpacity } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { LoginButton, NormalInput } from "../../styles";
import { MainContainer, LeftContainer } from "../singup.styles";
import { images } from "../../../../images";
import ImagePicker from "react-native-image-crop-picker";
import {
  checkCameraPermission,
  checkPhotosPermission,
  imagePickerConfig,
} from "../../../../utils/permissions";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructures/theme/colors";

const AvataContainer = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${(props) => props.theme.colors.bg.lightgray};
  align-items: center;
  justify-content: center;
`;

const AvataImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const IconImage = styled.Image`
  width: 20px;
  height: 20px;
  position: absolute;
  left: ${(props) => (props.center ? "40px" : "70px")};
  top: ${(props) => (props.center ? "40px" : "70px")};
`;

export const AddAvatarScreen = ({ onSubmit }) => {
  const [publicName, setPublicName] = useState("");
  const [image_path, setImagePath] = useState(null);

  const takePhoto = async () => {
    if (await checkCameraPermission()) {
      ImagePicker.openCamera(imagePickerConfig).then((image) => {
        setImagePath(image.path);
      });
    }
  };

  const chooseFromLibrary = async () => {
    if (await checkPhotosPermission()) {
      ImagePicker.openPicker(imagePickerConfig).then((image) => {
        setImagePath(image.path);
      });
    }
  };

  const onPhotoSelect = () => {
    Alert.alert("", "Upload_profile_photo", [
      {
        text: "Take_a_photo",
        onPress: () => {
          takePhoto();
        },
      },
      {
        text: "Choose_a_photo",
        onPress: () => {
          chooseFromLibrary();
        },
      },
      {
        text: "Cancel",
        onPress: () => {},
        style: "destructive",
      },
    ]);
  };

  const verify = () => {
    if (!publicName) {
      Alert.alert("Attention", "Please enter Public Name!", [
        {
          text: "OK",
          onPress: () => null,
          style: "cancel",
        },
      ]);
      return;
    }
    if (!image_path) {
      Alert.alert("Attention", "Please add Image!", [
        {
          text: "OK",
          onPress: () => null,
          style: "cancel",
        },
      ]);
      return;
    }
    onSubmit(image_path, publicName);
  };

  return (
    <MainContainer>
      <Text variant="title" color={colors.text.black} center>
        Please fill basic details to complete registration
      </Text>
      <Spacer position="top" size="large" />
      <TouchableOpacity onPress={onPhotoSelect}>
        <AvataContainer>
          {image_path && <AvataImage source={{ uri: image_path }} />}
          <IconImage source={images.ic_camera} center={image_path == null} />
        </AvataContainer>
      </TouchableOpacity>
      <LeftContainer>
        <Spacer position="top" size="medium" />
        <Text variant="hint" color={colors.text.gray}>
          Public Name
        </Text>
        <NormalInput
          mode="outlined"
          label="Public Name"
          placeholder="Public Name"
          autoCapitalize="none"
          value={publicName}
          onChangeText={(text) => setPublicName(text)}
        />
        <Spacer position="top" size="large" />
        <LoginButton mode="contained" onPress={verify}>
          Next
        </LoginButton>
      </LeftContainer>
    </MainContainer>
  );
};
