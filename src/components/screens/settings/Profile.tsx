import React from "react";
import { useAppSelector } from "@src/hooks";
import { Flex, Bold } from "@src/components/atoms";
import { ScrollScreenTemplate } from "@src/components/templates";

export const ProfileScreen = () => {
  const { name, level, experience, requiredExperience, totalExperience } = useAppSelector((state) => state.user);

  return (
    <ScrollScreenTemplate w="70%" p="30px 0">
      <Flex d="row" justify="space-between" w="100%">
        <Bold size="sm">User Name</Bold>
        <Bold size="sm">{name}</Bold>
      </Flex>
      <Flex d="row" justify="space-between" w="100%" mt="30px">
        <Bold size="sm">Level</Bold>
        <Bold size="sm">{level}</Bold>
      </Flex>
      <Flex d="row" justify="space-between" w="100%" mt="30px">
        <Bold size="sm">Current Experience</Bold>
        <Bold size="sm">{experience}</Bold>
      </Flex>
      <Flex d="row" justify="space-between" w="100%" mt="30px">
        <Bold size="sm">Required Experience</Bold>
        <Bold size="sm">{requiredExperience}</Bold>
      </Flex>
      <Flex d="row" justify="space-between" w="100%" mt="30px">
        <Bold size="sm">Total Experience</Bold>
        <Bold size="sm">{totalExperience}</Bold>
      </Flex>
    </ScrollScreenTemplate>
  );
};
