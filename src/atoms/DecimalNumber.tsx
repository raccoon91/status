import React, { FC } from "react";
import { Box, Text } from "@src/atoms";

interface IDecimalNumberProps {
  statusValue: number;
}

export const DecimalNumber: FC<IDecimalNumberProps> = ({ statusValue }) => {
  const integer = Math.floor(statusValue);
  const decimal = (statusValue % 1).toFixed(3).split(".")[1];

  return (
    <Box d="row" align="flex-end">
      <Text size="24px" weight="bold">
        {integer}
      </Text>
      <Text size="16px" mx="2px">
        .
      </Text>
      <Text size="16px">{decimal}</Text>
    </Box>
  );
};
