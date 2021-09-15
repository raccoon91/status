import React, { FC } from "react";
import { Box, Bold, DecimalNumber } from "@src/components/atoms";

interface IStatusProps extends IMarginCSS {
  name: string;
  value: number;
}

export const Status: FC<IStatusProps> = ({ name, value, mb }) => {
  return (
    <Box d="row" justify="space-between" w="100%" mb={mb || "28px"}>
      <Bold size="lg">{name}</Bold>

      <DecimalNumber number={value / 1000} />
    </Box>
  );
};
