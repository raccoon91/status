import React, { FC } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Box } from "@src/components/atoms";

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
      <TouchableOpacity onPress={handleChangeActvieKey}>{header}</TouchableOpacity>
      <Box
        align="flex-start"
        h={arccordionKey === activeKey ? "auto" : "0"}
        my={arccordionKey === activeKey ? "10px" : "5px"}
        p={arccordionKey === activeKey ? "10px 20px" : null}
      >
        {children}
      </Box>
    </>
  );
};
