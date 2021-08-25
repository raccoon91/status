import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { getUser } from "@src/store/slices/main";
import { Box, Container } from "@src/components/atoms";
import { Status } from "@src/components/molecules";
import { FloatMenu, BottomSheet } from "@src/components/organisms";
import { StatusInfo } from "@src/components/templates";

const floatMenuOptions = {
  position: { right: "20px", bottom: "80px" },
  mainMenu: { color: "black", iconName: "plus" },
  subMenu: [
    { color: "gray", iconName: "user-plus", to: "Exercise" },
    { color: "gray", iconName: "settings", to: "Exercise" },
  ],
};

export const MainScreen = () => {
  const dispatch = useAppDispatch();
  const { status, isFetch, isLoad } = useAppSelector((state) => state.main);

  useEffect(() => {
    if (!isFetch) {
      dispatch(getUser());
    }
  }, [isFetch, dispatch]);

  return (
    <Container position="relative" f="1" justify="flex-start" bgColor="white">
      {!isLoad ? (
        status.map((stat) => <Status key={stat.name} name={stat.name} value={stat.value} />)
      ) : (
        <Box mt="120px">
          <ActivityIndicator size="large" color="black" />
        </Box>
      )}

      <FloatMenu floatMenuOptions={floatMenuOptions} />

      <BottomSheet>
        <StatusInfo />
      </BottomSheet>
    </Container>
  );
};
