import React from "react";
import { Container, Flex, Bold, Link } from "@src/components/atoms";
const { version } = require("../../../package.json");

export const VersionScreen = () => {
  return (
    <Container p="40px 60px">
      <Flex d="row" justify="space-between" w="100%">
        <Bold>App Name</Bold>
        <Bold>Status</Bold>
      </Flex>
      <Flex d="row" justify="space-between" w="100%" mt="30px">
        <Bold>Version</Bold>
        <Bold>{version}</Bold>
      </Flex>
      <Flex d="row" justify="space-between" w="100%" mt="30px">
        <Bold>Developer</Bold>
        <Bold>raccoon</Bold>
      </Flex>
      <Flex d="row" justify="space-between" w="100%" mt="30px">
        <Bold>Contact</Bold>
        <Link href="mailto:dev.beomseok@gmail.com">dev.beomseok@gmail.com</Link>
      </Flex>
    </Container>
  );
};
