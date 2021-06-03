import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { fetchStatus } from "@src/store/statusSlice";
import { Box, Container } from "@src/components/atoms";
import { Status } from "@src/components/molecules";
import { FloatMenu, BottomSheet } from "@src/components/organisms";
import { StatusInfo } from "@src/components/templates";

const floatMenuOptions = {
  position: { right: "20px", bottom: "80px" },
  mainMenu: { color: "black", iconName: "plus" },
  subMenu: [
    { color: "gray", iconName: "settings", to: "Update" },
    { color: "gray", iconName: "edit", to: "Update" },
  ],
};

export const StatusScreen = () => {
  const dispatch = useAppDispatch();
  const { statusList, fetching, loading } = useAppSelector((state) => state.status);

  useEffect(() => {
    if (!fetching) {
      dispatch(fetchStatus());
    }
  }, [fetching, dispatch]);

  return (
    <Container position="relative" f="1" justify="flex-start" bgColor="white">
      {!loading ? (
        statusList.map((status) => <Status key={status.title} title={status.title} value={status.value} />)
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
