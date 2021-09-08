import React from "react";
import { useAppSelector } from "@src/hooks";
import { Container, Flex, Bold } from "@src/components/atoms";

export const ProfileScreen = () => {
  const { name, level, experience, requiredExperience, totalExperience } = useAppSelector((state) => state.user);

  return (
    <Container p="40px 60px">
      <Flex d="row" justify="space-between" w="100%">
        <Bold>User Name</Bold>
        <Bold>{name}</Bold>
      </Flex>
      <Flex d="row" justify="space-between" w="100%" mt="30px">
        <Bold>Level</Bold>
        <Bold>{level}</Bold>
      </Flex>
      <Flex d="row" justify="space-between" w="100%" mt="30px">
        <Bold>Current Experience</Bold>
        <Bold>{experience}</Bold>
      </Flex>
      <Flex d="row" justify="space-between" w="100%" mt="30px">
        <Bold>Required Experience</Bold>
        <Bold>{requiredExperience}</Bold>
      </Flex>
      <Flex d="row" justify="space-between" w="100%" mt="30px">
        <Bold>Total Experience</Bold>
        <Bold>{totalExperience}</Bold>
      </Flex>
    </Container>
  );
};
