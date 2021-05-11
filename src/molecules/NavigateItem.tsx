import React, { FC } from "react";
import Icon from "react-native-vector-icons/Feather";
import { Box, Text } from "@src/atoms";

interface INavigateItemProps {
  text: string;
}

export const NavigateItem: FC<INavigateItemProps> = ({ text }) => {
  return (
    <Box d="row" justify="space-between" h="50px" mb="20px" px="10px" border="1px solid #e2e2e2" radius="5px">
      <Text size="20px" weight="bold">
        {text}
      </Text>
      <Icon name="chevron-right" color="black" size={28} />
    </Box>
  );
};
