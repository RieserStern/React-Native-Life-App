import React, { useEffect, useState } from "react";
import { SafeArea } from "../../components/utils/safe-area.component";
import { GroupMemberHeaderComponent } from "./components/header.component";
import { FlatList } from "react-native";
import { DB_INTERNAL } from "../../libs/database";
import { MemberCellComponent } from "./components/member-cell.compent";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

export const GroupMemberScreen = ({ closeSheet, selectMember, members }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    getFriends();
  }, []);

  const onClickClose = () => {
    closeSheet();
  };

  const onClickDone = () => {
    selectMember();
  };

  const getFriends = async () => {
    const frds = await DB_INTERNAL.getFriends();
    console.log(frds);
    setFriends(frds);
  };

  return (
    <>
      <GroupMemberHeaderComponent
        onClickClose={onClickClose}
        onClickDone={onClickDone}
      />
      <BottomSheetFlatList
        data={friends}
        renderItem={({ item }) => {
          return (
            <MemberCellComponent
              friend={item}
              selectMember={selectMember}
              selected={members.some(
                (member) => member.friend_id == item.friendId
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          );
        }}
      />
    </>
  );
};
