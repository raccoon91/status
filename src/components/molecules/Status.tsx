import React, { FC } from "react";
import { Box, Text, DecimalNumber } from "@src/components/atoms";

interface IStatusProps {
  title: string;
  value: number;
}

export const Status: FC<IStatusProps> = ({ title, value }) => {
  return (
    <Box d="row" justify="space-between" w="60%" mb="40px">
      <Text size="24px" weight="bold">
        {title}
      </Text>

      <DecimalNumber statusValue={value} />
    </Box>
  );
};
