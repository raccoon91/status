import React from "react";
import { Container, Box, Text } from "src/components/atoms";
const { version } = require("../../../package.json");

export const VersionScreen = () => {
  return (
    <Container f="1" justify="flex-start" bgColor="white" p="40px 60px">
      <Box d="row" justify="space-between" w="100%">
        <Text size="16px" weight="bold">
          App Name
        </Text>
        <Text size="16px" weight="bold">
          Status
        </Text>
      </Box>
      <Box d="row" justify="space-between" w="100%" mt="30px">
        <Text size="16px" weight="bold">
          Version
        </Text>
        <Text size="16px" weight="bold">
          {version}
        </Text>
      </Box>
      <Box d="row" justify="space-between" w="100%" mt="30px">
        <Text size="16px" weight="bold">
          Developer
        </Text>
        <Text size="16px" weight="bold">
          raccoon
        </Text>
      </Box>
      <Box d="row" justify="space-between" w="100%" mt="30px">
        <Text size="16px" weight="bold">
          Contact
        </Text>
        <Text size="16px" weight="bold">
          dev.beomseok@gmail.com
        </Text>
      </Box>
    </Container>
  );
};
