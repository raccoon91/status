import React from "react";
import { Box, Text } from "@src/atoms";
import { Status } from "@src/molecules";

export const HomeScreen = () => {
  return (
    <Box justify="flex-start">
      <Text size="36px" weight="bold" margin="30px 0">
        Status
      </Text>

      <Status title="Strength" value={5.001} />

      <Status title="Speed" value={5.001} />

      <Status title="Stamina" value={5.001} />
    </Box>
  );
};
