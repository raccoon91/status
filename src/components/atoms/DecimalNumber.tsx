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
  const integer = Math.floor(number);
  const decimal = (number % 1).toFixed(3).split(".")[1];

  return (
    <Box d="row" align="flex-end">
      <Text size={fontSize} weight={fontWeight}>
        {integer}
      </Text>
      <Text size={decimalSize} mx="2px">
        .
      </Text>
      <Text size={decimalSize}>{decimal}</Text>
    </Box>
  );
};
