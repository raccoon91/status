import React from "react";
import { Container, ScrollBox, Text } from "@src/atoms";
import { NavigateItem } from "@src/molecules";

export const StatusInfo = () => {
  return (
    <Container f="1">
      <Text size="26px" weight="bold" m="20px 0 40px">
        Status Info
      </Text>

      <ScrollBox w="100%" p="20px 40px">
        <NavigateItem text="Hit Point" />
        <NavigateItem text="Strength" />
        <NavigateItem text="Agility" />
        <NavigateItem text="Stamina" />
      </ScrollBox>
    </Container>
  );
};
