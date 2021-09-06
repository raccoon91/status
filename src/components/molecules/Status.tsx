import React, { FC } from "react";
import { Box, Text, DecimalNumber } from "@src/components/atoms";

interface IStatusProps {
  name: string;
  value: number;
}

export const Status: FC<IStatusProps> = ({ name, value }) => {
  return (
    <Box d="row" justify="space-between" w="100%" mb="36px">
      <Text size="24px" weight="bold">
        {name}
      </Text>

      <DecimalNumber number={value / 1000} />
    </Box>
  );
};
