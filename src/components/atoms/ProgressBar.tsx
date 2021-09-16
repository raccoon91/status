import React, { FC } from "react";
import { Box } from "./Box";

interface IProgressBarProps extends IMarginCSS {
  w?: string;
  progress: number;
}

export const ProgressBar: FC<IProgressBarProps> = ({ w, progress, ...styles }) => {
  return (
    <Box position="relative" w={w || "100%"} h="4px" bgColor="gray300" {...styles}>
      <Box position="absolute" top="0" left="0" w={`${progress}%`} h="4px" bgColor="black" />
    </Box>
  );
};
