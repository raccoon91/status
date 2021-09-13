import React, { FC } from "react";
import { Flex, Bold, DecimalNumber } from "@src/components/atoms";

interface IStatusProps {
  name: string;
  value: number;
}

export const Status: FC<IStatusProps> = ({ name, value }) => {
  return (
    <Flex d="row" justify="space-between" w="100%" mb="36px">
      <Bold size="xx">{name}</Bold>

      <DecimalNumber number={value / 1000} />
    </Flex>
  );
};
