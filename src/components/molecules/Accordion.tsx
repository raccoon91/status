import React, { FC } from "react";
import Icon from "react-native-vector-icons/Feather";
import { Box, Text, OpacityBox } from "@src/components/atoms";

interface IAccordion {
  arccordionKey: number;
  activeKey?: number | null;
  title?: string;
  right?: string | React.ReactElement;
  initColor?: string;
  activeColor?: string;
  header?: React.ReactElement;
  children: React.ReactElement | React.ReactElement[] | Element | null;
  changeActvieKey?: (selectedActiveKey: number) => void;
}

export const Arccodion: FC<IAccordion> = ({
  arccordionKey,
  activeKey,
  title,
  right,
  initColor,
  activeColor,
  children,
  changeActvieKey,
}) => {
  const handleChangeActvieKey = () => {
    if (changeActvieKey) {
      changeActvieKey(arccordionKey);
    }
  };

  return (
    <>
      <OpacityBox justify="space-between" mb="8px" bgColor="#f8f8f8" onPress={handleChangeActvieKey}>
        {title && (
          <Text
            size="18px"
            weight="bold"
            color={arccordionKey === activeKey ? activeColor || "black" : initColor || "black"}
          >
            {title}
          </Text>
        )}
        {right ? (
          right
        ) : (
          <Icon name={arccordionKey === activeKey ? "chevron-up" : "chevron-down"} color="black" size={28} />
        )}
      </OpacityBox>
      <Box display={arccordionKey === activeKey ? "flex" : "none"} align="flex-start" mb="8px">
        {children}
      </Box>
    </>
  );
};
