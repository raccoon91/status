import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { getUser } from "@src/store/slices/main";
import { Container, Box, Text } from "@src/components/atoms";
import { Status } from "@src/components/molecules";
import { FloatMenu, BottomSheet } from "@src/components/organisms";
import { StatusInfo } from "@src/components/templates";
import { useNavigation } from "@react-navigation/core";

const floatMenuOptions = {
  position: { right: "20px", bottom: "80px" },
  mainMenu: { color: "black", iconName: "plus" },
  subMenu: [
    { color: "gray", iconName: "user-plus", to: "Exercise" },
    { color: "gray", iconName: "settings", to: "Exercise" },
  ],
};

export const MainScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { name, level, status, isFetch, isLoad } = useAppSelector((state) => state.main);

  useEffect(() => {
    if (!isFetch) {
      dispatch(getUser());
    }
  }, [isFetch, dispatch]);

  useEffect(() => {
    if (isFetch && !isLoad && !name) {
      navigation.reset({ routes: [{ name: "User" }] });
    }
  }, [isFetch, isLoad, name, navigation]);

  return (
    <Container isLoad={isLoad} position="relative" f="1" justify="flex-start" bgColor="white" pt="40px">
      <Box w="70%">
        <Box d="row" justify="space-between" w="100%" mb="10px">
          <Box bgColor="black" p="4px 12px 6px" radius="5px">
            <Text color="white" size="20px" weight="bold">
              {name}
            </Text>
          </Box>

          <Text size="20px" weight="bold">
            Lv. {level}
          </Text>
        </Box>

        {status.map((stat) => (
          <Status key={stat.name} name={stat.name} value={stat.value} />
        ))}
      </Box>

      <FloatMenu floatMenuOptions={floatMenuOptions} />

      <BottomSheet>
        <StatusInfo />
      </BottomSheet>
    </Container>
  );
};
