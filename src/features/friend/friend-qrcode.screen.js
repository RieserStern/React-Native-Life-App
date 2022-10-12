import React, { useMemo, useRef, useState, useEffect } from "react";
import styled from "styled-components/native";
import { colors } from "../../infrastructures/theme/colors";
import { Spacer } from "../../components/spacer/spacer.component";
import { StyleSheet, Dimensions, Text } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RNCamera } from "react-native-camera";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { images } from "../../images";
import QRCode from "react-native-qrcode-svg";
import { useSelector } from "react-redux";

const IconBack = styled(Ionicons).attrs({
  color: colors.ui.white,
  size: 32,
  name: "chevron-back-sharp",
})`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.theme.spaces[2]};
`;

const BackgrounButton = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.bg.clear};
`;

const QRCodeButton = styled.TouchableOpacity`
  height: 50px;
  width: 140px;
  border-radius: 25px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.ui.white};
  position: absolute;
  bottom: 30%;
  left: ${(props) => props.offset}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const QRImage = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: ${(props) => props.theme.spaces[2]};
`;

const Image = styled.Image`
  width: 20px;
  height: 20px;
`;

const Button = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.ui.border};
`;

const BottomContainer = styled.View`
  width: 100%;
  flex-direction: row;
`;

const ButtonContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const FriendQRCodeScreen = ({ navigation }) => {
  const sheetRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const { user } = useSelector((state) => state.login_state);

  const [myQRCode, setMyQRCode] = useState(null);

  const maxValue = parseInt(40000 / Dimensions.get("window").height);

  useEffect(() => {
    const value = `${user.id}timestamp${new Date().getTime()}`;
    setMyQRCode(value);
  }, []);

  const snapPoints = useMemo(() => ["25%", `${maxValue}%`], []);

  const onRead = (e) => {
    console.log(e);
  };

  const onBack = () => {
    navigation.goBack();
  };

  const insets = useSafeAreaInsets();

  const onClickBackground = () => {
    sheetRef.current.collapse();
    setExpanded(false);
  };

  const onClickExpand = () => {
    sheetRef.current.expand();
    setExpanded(true);
  };

  const onRefresh = () => {
    const value = `${user.id}timestamp${new Date().getTime()}`;
    setMyQRCode(value);
  };

  return (
    <>
      <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topViewStyle={styles.zeroContainer}
        bottomViewStyle={styles.zeroContainer}
        cameraStyle={styles.cameraContainer}
        showMarker={true}
      />
      <BackgrounButton onPress={onClickBackground}></BackgrounButton>
      <IconBack onPress={onBack} top={8 + insets.top} />
      <QRCodeButton
        offset={Dimensions.get("window").width / 2 - 70}
        onPress={onClickExpand}
      >
        <QRImage source={images.ic_qrcode} />
        <Text style={styles.textButtonStyle}>My QR Code</Text>
      </QRCodeButton>
      <BottomSheet ref={sheetRef} snapPoints={snapPoints}>
        <BottomSheetView style={styles.sheetsContainer}>
          {expanded ? (
            <>
              <Text style={styles.textNormalSheetStyle}>My QR code</Text>
              <Spacer size="large" />
              {myQRCode && <QRCode value={myQRCode} />}
              <Spacer size="large" />
              <Text style={styles.textNameStyle}>{user.username}</Text>
              <Spacer size="medium" />
              <Text style={styles.textPhoneStyle}>{user.phone}</Text>
              <Spacer size="large" />
              <Text style={styles.textIndicatorStyle}>
                You will be added as a friend when your{"\n"}frined scan your QR
                code
              </Text>
              <Spacer size="large" />
              <BottomContainer>
                <ButtonContainer>
                  <Button onPress={onRefresh}>
                    <Image source={images.ic_qr_reload} />
                  </Button>
                </ButtonContainer>
                <ButtonContainer>
                  <Button>
                    <Image source={images.ic_qr_download} />
                  </Button>
                </ButtonContainer>
              </BottomContainer>
            </>
          ) : (
            <Text style={styles.textCenterSheetStyle}>
              Scan QR code to quickly add persons{"\n"}to your friend list
            </Text>
          )}
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  zeroContainer: {
    height: 0,
    flex: 0,
  },

  cameraContainer: {
    height: (Dimensions.get("window").height * 4) / 5,
  },

  sheetsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  textCenterSheetStyle: {
    textAlign: "center",
    color: colors.text.black,
    fontSize: 16,
    marginTop: Dimensions.get("window").height / 15,
  },

  textNormalSheetStyle: {
    textAlign: "center",
    color: colors.text.black,
    fontSize: 16,
    marginTop: 8,
  },

  textButtonStyle: {
    textAlign: "center",
    color: colors.text.white,
    fontSize: 14,
  },

  textNameStyle: {
    textAlign: "center",
    color: colors.text.black,
    fontSize: 16,
    fontWeight: "600",
  },

  textPhoneStyle: {
    textAlign: "center",
    color: colors.text.gray,
    fontSize: 14,
  },

  textIndicatorStyle: {
    textAlign: "center",
    color: colors.text.black,
    fontSize: 14,
    fontWeight: "600",
  },
});
