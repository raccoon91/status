import React, { useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { postUser } from "@src/store/thunk";
import { changeUserName } from "@src/store/slices/user";
import { Container, Block, Bold, Input, Button } from "@src/components/atoms";
import type { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

const appWidth = Dimensions.get("window").width;

export const UserScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { name, newName } = useAppSelector((state) => state.user);

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
    <Container position="relative" pt="100px">
      <Bold size="20px" mb="30px">
        User Name
      </Bold>

      <Input value={newName} w="70%" h="50px" pl="16px" onChange={handleChangeUser} />

      <Block position="absolute" left="0" bottom="0" w="100%" h="60px" p="8px">
        <Button
          variant={newName?.length > 0 && newName?.length < 11 ? "black" : "disabled"}
          size="18px"
          weight="bold"
          w={`${appWidth - 16}px`}
          h="100%"
          onPress={handleSaveUser}
        >
          SAVE
        </Button>
      </Block>
    </Container>
  );
};
