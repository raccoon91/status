import React, { FC } from "react";
import { Box, Text } from "@src/components/atoms";

interface IDecimalNumberProps {
  number: number;
  fontSize?: IFontSize;
  fontWeight?: string;
  decimalSize?: IFontSize;
}

export const DecimalNumber: FC<IDecimalNumberProps> = ({
  number,
  fontSize = "xl",
  fontWeight = "bold",
  decimalSize = "md",
}) => {
  const [integer, decimal] = String(number).split(".");

  return (
    <Box d="row" align="flex-end">
      <Text size={fontSize} weight={fontWeight}>
        {integer}
      </Text>
      <Text size={decimalSize} mx="2px">
        .
      </Text>
      <Text size={decimalSize}>{decimal || "000"}</Text>
    </Box>
  );
};
