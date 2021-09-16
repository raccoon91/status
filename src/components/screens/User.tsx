import React, { useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { postUser } from "@src/store/thunk";
import { changeUserName } from "@src/store/slices/user";
import { Bold, Input, Button } from "@src/components/atoms";
import { ScrollScreenTemplate } from "@src/components/templates";
import type { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

const appWidth = Dimensions.get("window").width;

export const UserScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { isLoad, name, newName } = useAppSelector((state) => state.user);

  useFocusEffect(
    useCallback(() => {
      if (name) {
        navigation.reset({ routes: [{ name: "Main" }] });
      }
    }, [name, navigation]),
  );

  const handleChangeUser = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text;

    dispatch(changeUserName({ value }));
  };

  const handleSaveUser = () => {
    dispatch(postUser());
  };

  return (
    <ScrollScreenTemplate
      p="20px 10px"
      isLoad={isLoad}
      bottomButton={
        <Button
          variant={newName?.length > 0 && newName?.length < 11 ? "black" : "disabled"}
          size="lg"
          weight="bold"
          w={`${appWidth - 16}px`}
          h="100%"
          onPress={handleSaveUser}
        >
          SAVE
        </Button>
      }
    >
      {name ? (
        <Bold size="xl">Welcome {name}</Bold>
      ) : (
        <>
          <Bold size="xl" mb="30px">
            User Name
          </Bold>

          <Input value={newName} h="50px" pl="16px" onChange={handleChangeUser} autoFocus />
        </>
      )}
    </ScrollScreenTemplate>
  );
};
