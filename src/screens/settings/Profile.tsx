import React from "react";
import { useAppSelector } from "@src/hooks";
import { Container, Box, Text } from "@src/components/atoms";

export const ProfileScreen = () => {
  const { name, level, experience, requiredExperience, totalExperience } = useAppSelector((state) => state.user);

  return (
    <Container f="1" justify="flex-start" bgColor="white" p="40px 60px">
      <Box d="row" justify="space-between" w="100%">
        <Text size="16px" weight="bold">
          User Name
        </Text>
        <Text size="16px" weight="bold">
          {name}
        </Text>
      </Box>
      <Box d="row" justify="space-between" w="100%" mt="30px">
        <Text size="16px" weight="bold">
          Level
        </Text>
        <Text size="16px" weight="bold">
          {level}
        </Text>
      </Box>
      <Box d="row" justify="space-between" w="100%" mt="30px">
        <Text size="16px" weight="bold">
          Current Experience
        </Text>
        <Text size="16px" weight="bold">
          {experience}
        </Text>
      </Box>
      <Box d="row" justify="space-between" w="100%" mt="30px">
        <Text size="16px" weight="bold">
          Required Experience
        </Text>
        <Text size="16px" weight="bold">
          {requiredExperience}
        </Text>
      </Box>
      <Box d="row" justify="space-between" w="100%" mt="30px">
        <Text size="16px" weight="bold">
          Total Experience
        </Text>
        <Text size="16px" weight="bold">
          {totalExperience}
        </Text>
      </Box>
    </Container>
  );
};
