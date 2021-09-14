import React, { FC } from "react";
import { Flex, Bold, OpacityBox, Feather } from "@src/components/atoms";

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
      <OpacityBox justify="space-between" p="12px 16px" mb="8px" bgColor="gray50" onPress={handleChangeActvieKey}>
        {title && (
          <Bold size="md" color={arccordionKey === activeKey ? activeColor || "black" : initColor || "black"}>
            {title}
          </Bold>
        )}
        {right ? (
          right
        ) : (
          <Feather name={arccordionKey === activeKey ? "chevron-up" : "chevron-down"} color="black" size={28} />
        )}
      </OpacityBox>
      <Flex display={arccordionKey === activeKey ? "flex" : "none"} align="flex-start" mb="8px">
        {children}
      </Flex>
    </>
  );
};
