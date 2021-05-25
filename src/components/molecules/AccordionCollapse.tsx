import React, { FC } from "react";
import { Box, OpacityBox } from "@src/components/atoms";

interface IAccordionCollapse {
  arccordionKey: number;
  activeKey?: number | null;
  header: React.ReactElement;
  children: React.ReactElement | React.ReactElement[];
  changeActvieKey?: (selectedActiveKey: number) => void;
}

export const ArccodionCollapse: FC<IAccordionCollapse> = ({
  arccordionKey,
  activeKey,
  header,
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
      <OpacityBox mb="10px" onPress={handleChangeActvieKey}>
        {header}
      </OpacityBox>
      <Box
        align="flex-start"
        display={arccordionKey === activeKey ? "flex" : "none"}
        h={arccordionKey === activeKey ? "auto" : "0"}
        mb={arccordionKey === activeKey ? "10px" : "0"}
        p={arccordionKey === activeKey ? "10px" : null}
      >
        {children}
      </Box>
    </>
  );
};
