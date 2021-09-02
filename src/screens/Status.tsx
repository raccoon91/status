import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { useNavigation } from "@react-navigation/core";
import { getUser, getStatus } from "@src/store/thunk";
import { Container, Box, Text } from "@src/components/atoms";
import { Status } from "@src/components/molecules";
import { FloatMenu, BottomSheet } from "@src/components/organisms";
import { StatusInfo } from "@src/components/templates";

const floatMenuOptions = {
  position: { right: "20px", bottom: "80px" },
  mainMenu: { color: "black", iconName: "plus" },
  subMenu: [
    { color: "gray", iconName: "user-plus", to: "Exercise" },
    { color: "gray", iconName: "bell", to: "Alarm" },
  ],
};

export const StatusScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { isFetch: isFetchUser, isLoad: isLoadUser, name, level } = useAppSelector((state) => state.user);
  const { isFetch, isLoad, status, statusInfo } = useAppSelector((state) => state.status);

  useEffect(() => {
    if (!isFetch) {
      dispatch(getStatus());
    }
  }, [isFetch, dispatch]);

  useEffect(() => {
    if (!isFetchUser) {
      dispatch(getUser());
    }
  }, [isFetchUser, dispatch]);

  useEffect(() => {
    if (isFetchUser && !isLoadUser && !name) {
      navigation.reset({ routes: [{ name: "User" }] });
    }
  }, [isFetchUser, isLoadUser, name, navigation]);

  return (
    <Container isLoad={isLoadUser || isLoad} position="relative" f="1" justify="flex-start" bgColor="white" pt="40px">
      <Box w="70%">
        <Box d="row" justify="space-between" w="100%" mb="10px">
          {name.length > 0 && (
            <>
              <Box bgColor="black" p="4px 12px 6px" radius="5px">
                <Text color="white" size="20px" weight="bold">
                  {name}
                </Text>
              </Box>

              <Text size="20px" weight="bold">
                Lv. {level}
              </Text>
            </>
          )}
        </Box>

        {status.map((stat) => (
          <Status key={stat.name} name={stat.name} value={stat.value} />
        ))}
      </Box>

      <FloatMenu floatMenuOptions={floatMenuOptions} />

      <BottomSheet>
        <StatusInfo statusInfo={statusInfo} />
      </BottomSheet>
    </Container>
  );
};
