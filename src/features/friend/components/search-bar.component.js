import React, { useState } from "react";
import { Searchbar as SearchBarMain } from "react-native-paper";
import styled from "styled-components/native";
import { colors } from "../../../infrastructures/theme/colors";

const SearchBarContainer = styled.View`
  padding-horizontal: ${(props) => props.theme.spaces[3]};
  padding-vertical: ${(props) => props.theme.spaces[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const SearchBar = styled(SearchBarMain).attrs({
  color: colors.text.lightgray,
  iconColor: colors.text.lightgray,
})`
  height: 32px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  color: ${(props) => props.theme.colors.text.white};
`;

export const SearchbarComponent = ({ searchKeyword }) => {
  const [search, setSearch] = useState("");
  const onSearch = () => {
    searchKeyword(search);
  };

  return (
    <SearchBarContainer>
      <SearchBar
        clearAccessibilityLabel="Cancel"
        placeholder="Search"
        onChangeText={(text) => setSearch(text)}
        onSubmitEditing={onSearch}
      />
    </SearchBarContainer>
  );
};
