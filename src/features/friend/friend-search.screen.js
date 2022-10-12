import React, { useState } from "react";
import { SafeArea } from "../../components/utils/safe-area.component";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../infrastructures/theme/colors";
import { Text } from "../../components/typography/text.component";
import { FriendSearchHeaderComponent } from "./components/header.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { SearchbarComponent } from "./components/search-bar.component";
import { images } from "../../images";
import { firebaseSDK } from "../../libs/firebase";
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FriendCellComponent } from "./components/friend-cell.component";
import { getmd5 } from "../../utils/cryptor";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin-top: ${(props) => props.theme.spaces[2]};
`;

const TopContainer = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: ${(props) => props.theme.spaces[3]};
`;

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-color: ${(props) => props.theme.colors.bg.gray};
  border-width: ${(props) => (!props.isSelected ? "1px;" : "0px;")};
  border-radius: 12px;
  background-color: ${(props) =>
    props.isSelected
      ? props.theme.colors.ui.primary
      : props.theme.colors.bg.primary};
`;

const IconCheck = styled(Ionicons).attrs({
  color: colors.ui.white,
  size: 16,
  name: "md-checkmark",
})``;

const SearchOptions = {
  username: "Username",
  phone: "Phone Number",
};

const BottomContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const EmptyImage = styled.Image`
  width: 100px;
  height: 60px;
`;

const EmptyText = styled.Text`
  color: ${(props) => props.theme.colors.text.gray};
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.regular};
`;

export const FriendSearchScreen = ({ navigation }) => {
  const [searchOption, setSearchOption] = useState(SearchOptions.username);
  const { user } = useSelector((state) => state.login_state);

  const [friends, setFriends] = useState([]);

  const onClickClose = () => {
    navigation.goBack();
  };

  const searchKeyword = async (keyword) => {
    if (searchOption == SearchOptions.username) {
      const friend = await firebaseSDK.getUserWithName(user.id, keyword);
      console.log("Search by user name", friend);
      if (friend) {
        setFriends([friend]);
      }
    } else {
      const friend = await firebaseSDK.getUserWithPhonenumber(user.id, keyword);
      if (friend) {
        setFriends([friend]);
      }
    }
  };

  const addFriend = async (friend_id) => {
    console.log(friend_id);
    const doc_id = getmd5(`${user.id}-${friend_id}`);
    const result = await firebaseSDK.creatFriend(user.id, friend_id, doc_id);
    console.log(result);
  };

  return (
    <Container>
      <SafeArea>
        <FriendSearchHeaderComponent onClickClose={onClickClose} />
        <MainContainer>
          <TopContainer>
            <Button
              isSelected={searchOption == SearchOptions.username}
              onPress={() => setSearchOption(SearchOptions.username)}
            >
              {searchOption == SearchOptions.username && <IconCheck />}
            </Button>
            <Spacer size="medium" position="right" />
            <Text variant="hint" color={colors.text.lightgray}>
              {SearchOptions.username}
            </Text>
            <Spacer size="large" position="right" />
            <Button
              isSelected={searchOption == SearchOptions.phone}
              onPress={() => setSearchOption(SearchOptions.phone)}
            >
              {searchOption == SearchOptions.phone && <IconCheck />}
            </Button>
            <Spacer size="medium" position="right" />
            <Text variant="hint" color={colors.text.lightgray}>
              {SearchOptions.phone}
            </Text>
          </TopContainer>
          <SearchbarComponent searchKeyword={searchKeyword} />

          <BottomContainer>
            <KeyboardAwareScrollView
              contentContainerStyle={{
                flex: 1,
                justifyContent: friends.length == 0 ? "center" : "flex-start",
                alignItems: "center",
                backgroundColor: colors.bg.primary,
                width: "100%",
              }}
            >
              {friends.length > 0 ? (
                <>
                  {friends.map((data, index) => {
                    return (
                      <FriendCellComponent
                        friend={data}
                        key={`data-${index}`}
                        onAdd={addFriend}
                      />
                    );
                  })}
                </>
              ) : (
                <>
                  <EmptyText>
                    Search friends using their{"\n"} username or phone number
                  </EmptyText>
                  <Spacer size="large" />
                  <EmptyImage
                    source={images.img_search_bg}
                    resizeMode="contain"
                  />
                </>
              )}
            </KeyboardAwareScrollView>
          </BottomContainer>
        </MainContainer>
      </SafeArea>
    </Container>
  );
};
