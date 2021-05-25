import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import { Box, Container, Text } from "@src/components/atoms";
import { Status } from "@src/components/molecules";
import { FloatMenu, BottomSheet } from "@src/components/organisms";
import { StatusInfo } from "@src/components/templates";

const initialStatus = [
  { name: "Hit Point", value: 5.01 },
  { name: "Strength", value: 7.005 },
  { name: "Agility", value: 6.24 },
  { name: "Stamina", value: 5 },
];

const floatMenuOptions = {
  position: {
    right: "20px",
    bottom: "80px",
  },
  mainMenu: {
    color: "black",
    iconName: "plus",
  },
  subMenu: [
    {
      color: "gray",
      iconName: "settings",
      to: "Update",
    },
    {
      color: "gray",
      iconName: "edit",
      to: "Update",
    },
  ],
};

interface IStatus {
  name: string;
  value: number;
}

export const StatusScreen = () => {
  const [statusList, setStatusList] = useState<IStatus[]>([]);

  const getStatusList = async () => {
    const statusValue = await AsyncStorage.getItem("@status");

    if (statusValue != null) {
      const parsedStatus = JSON.parse(statusValue);
      setStatusList(parsedStatus);
    } else {
      setStatusList(initialStatus);
      AsyncStorage.setItem("@status", JSON.stringify(initialStatus));
    }
  };

  useEffect(() => {
    getStatusList();
  }, []);

  return (
    <Container position="relative" f="1" justify="flex-start" bgColor="white" pt="40px">
      <Text size="28px" weight="bold">
        STATUS
      </Text>

      {statusList.length ? (
        statusList.map((status) => <Status key={status.name} title={status.name} value={status.value} />)
      ) : (
        <Box mt="60px">
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
