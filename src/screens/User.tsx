import React, { useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { postUser } from "@src/store/thunk";
import { changeUserName } from "@src/store/slices/user";
import { Container, Box, Text, Input, Button } from "@src/components/atoms";
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
    <Container position="relative" f="1" justify="flex-start" bgColor="white" pt="120px">
      <Text size="20px" weight="bold" mb="30px">
        User Name
      </Text>

      <Input value={newName} w="70%" h="50px" p="0 0 0 16px" onChange={handleChangeUser} />

      <Box position="absolute" left="0" bottom="0" w="100%" h="60px" p="8px">
        <Button
          title="SAVE"
          size="18px"
          weight="bold"
          w={`${appWidth - 16}px`}
          h="100%"
          active={newName?.length > 0}
          onPress={handleSaveUser}
        />
      </Box>
    </Container>
  );
};
