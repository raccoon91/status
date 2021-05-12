import React from "react";
import { Container, Text } from "@src/atoms";
import { Status } from "@src/molecules";
import { BottomSheet } from "@src/organisms";
import { StatusInfoPage } from "@src/pages";

export const StatusPage = () => {
  return (
    <Container f="1" justify="flex-start" bgColor="white">
      <Text size="32px" weight="bold" m="40px 0 80px">
        Status
      </Text>

      <Status title="Hit Point" value={5.001} />
      <Status title="Strength" value={5.001} />
      <Status title="Agility" value={5.001} />
      <Status title="Stamina" value={5.001} />

      <BottomSheet>
        <StatusInfoPage />
      </BottomSheet>
    </Container>
  );
};
