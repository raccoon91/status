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

interface IStatus {
  name: string;
  value: number;
}

export const HomeScreen = () => {
  const [statusList, setStatusList] = useState<IStatus[]>([]);

  const getStatusList = async () => {
    const statusValue = await AsyncStorage.getItem("@status");

    if (statusValue != null) {
      const parsedStatus = JSON.parse(statusValue);
      setStatusList(parsedStatus);
    } else {
      setStatusList(initialStatus);
    }
  };

  useEffect(() => {
    getStatusList();
  }, []);

  return (
    <Container position="relative" f="1" justify="flex-start" bgColor="white">
      <Text size="32px" weight="bold" m="40px 0 80px">
        Status
      </Text>

      {statusList.length ? (
        statusList.map((status) => <Status key={status.name} title={status.name} value={status.value} />)
      ) : (
        <Box mt="60px">
          <ActivityIndicator size="large" color="black" />
        </Box>
      )}

      <FloatMenu right="20px" bottom="80px" />

      <BottomSheet>
        <StatusInfo />
      </BottomSheet>
    </Container>
  );
};
