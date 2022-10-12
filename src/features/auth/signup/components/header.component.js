import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import { HeaderComponent } from "../../../../components/header/header.component";
import { images } from "../../../../images";
import { colors } from "../../../../infrastructures/theme/colors";

const IconBack = styled(Ionicons).attrs({
  color: colors.ui.primary,
  size: 32,
  name: "chevron-back-sharp",
})`
  position: absolute;
  left: 10;
`;

const Circle = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  margin-left: 4px;
  background-color: ${(props) =>
    props.selected
      ? props.theme.colors.ui.primary
      : props.theme.colors.ui.gray};
`;

export const SignUpHeaderComponent = ({ onBack, pageIndex }) => {
  return (
    <HeaderComponent>
      <IconBack icon={images.ic_back} onPress={onBack} />
      <Circle selected={pageIndex == 0} />
      <Circle selected={pageIndex == 1} />
      <Circle selected={pageIndex == 2} />
      <Circle selected={pageIndex == 3} />
    </HeaderComponent>
  );
};
