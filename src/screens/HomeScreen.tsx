import React from "react";
import { Container, Text } from "@src/atoms";
import { Status } from "@src/molecules";
import { BottomSheet } from "@src/organisms";
import { StatusInfo } from "@src/pages";

export const HomeScreen = () => {
  return (
    <Container f="1" justify="flex-start" bgColor="white">
      <Text size="36px" weight="bold" m="60px 0 80px">
        Status
      </Text>

      <Status title="Hit Point" value={5.001} />
      <Status title="Strength" value={5.001} />
      <Status title="Agility" value={5.001} />
      <Status title="Stamina" value={5.001} />

      <BottomSheet>
        <StatusInfo />
      </BottomSheet>
    </Container>
  );
};
