import React from "react";
import { Flex, Bold, Link } from "@src/components/atoms";
import { ScrollScreenTemplate } from "@src/components/templates";
const { version } = require("../../../../package.json");

export const VersionScreen = () => {
  return (
    <ScrollScreenTemplate w="70%" p="30px 0">
      <Flex d="row" justify="space-between" w="100%">
        <Bold size="sm">App Name</Bold>
        <Bold size="sm">Status</Bold>
      </Flex>
      <Flex d="row" justify="space-between" w="100%" mt="30px">
        <Bold size="sm">Version</Bold>
        <Bold size="sm">{version}</Bold>
      </Flex>
      <Flex d="row" justify="space-between" w="100%" mt="30px">
        <Bold size="sm">Developer</Bold>
        <Bold size="sm">raccoon</Bold>
      </Flex>
      <Flex d="row" justify="space-between" w="100%" mt="30px">
        <Bold size="sm">Contact</Bold>
        <Link href="mailto:dev.beomseok@gmail.com">dev.beomseok@gmail.com</Link>
      </Flex>
    </ScrollScreenTemplate>
  );
};
