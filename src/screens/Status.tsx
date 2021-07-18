import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { getStatus } from "@src/store/slices/status";
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

export const StatusScreen = () => {
  const dispatch = useAppDispatch();
  const { status, fetching, loading } = useAppSelector((state) => state.status);

  useEffect(() => {
    if (!fetching) {
      dispatch(getStatus());
    }
  }, [fetching, dispatch]);

  return (
    <Container position="relative" f="1" justify="flex-start" bgColor="white">
      {!loading ? (
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
