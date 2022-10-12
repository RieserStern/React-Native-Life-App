import React, { useState } from "react";
import { Searchbar as SearchBarMain } from "react-native-paper";
import styled from "styled-components/native";
import { colors } from "../../../infrastructures/theme/colors";

const SearchBarContainer = styled.View`
  padding-horizontal: ${(props) => props.theme.spaces[3]};
  padding-vertical: ${(props) => props.theme.spaces[3]};
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

const SearchBar = styled(SearchBarMain).attrs({
  color: colors.text.lightgray,
  iconColor: colors.text.lightgray,
})`
  height: 32px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.ui.secondary};
  color: ${(props) => props.theme.colors.text.white};
`;

export const SearchbarComponent = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <SearchBarContainer>
      <SearchBar
        clearAccessibilityLabel="Cancel"
        placeholder="Search"
        value={searchKeyword}
        onChangeText={(text) => setSearchKeyword(text)}
        onSubmitEditing={() => console.log("Search")}
      />
    </SearchBarContainer>
  );
};
