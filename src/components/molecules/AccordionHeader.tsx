import React, { FC } from "react";
import Icon from "react-native-vector-icons/Feather";
import { Box, Text } from "@src/components/atoms";

interface IAccordionHeader {
  title: string;
  headerRight?: string | React.ReactNode;
}

export const AccordionHeader: FC<IAccordionHeader> = ({ title, headerRight }) => (
  <Box d="row" justify="space-between" h="50px" px="10px" border="1px solid #e2e2e2" radius="5px">
    <Text size="20px" weight="bold">
      {title}
    </Text>
    {headerRight ? headerRight : <Icon name="chevron-down" color="black" size={28} />}
  </Box>
);
