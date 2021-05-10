import React, { FC } from "react";
import { Box, Text, DecimalNumber } from "@src/atoms";

interface IStatusProps {
  title: string;
  value: number;
}

export const Status: FC<IStatusProps> = ({ title, value }) => {
  return (
    <Box d="row" justify="space-between" w="60%" mb="30px">
      <Text size="24px" weight="bold">
        {title}
      </Text>

      <DecimalNumber statusValue={value} />
    </Box>
  );
};
