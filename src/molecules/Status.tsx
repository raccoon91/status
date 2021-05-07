import React, { FC } from "react";
import { Box, Text, DecimalNumber } from "@src/atoms";

interface IStatusProps {
  title: string;
  value: number;
}

export const Status: FC<IStatusProps> = ({ title, value }) => {
  return (
    <Box direction="row" justify="space-between" width="60%" height="80px">
      <Text size="24px" weight="bold">
        {title}
      </Text>

      <DecimalNumber statusValue={value} />
    </Box>
  );
};
