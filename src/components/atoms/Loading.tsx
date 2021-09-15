import React, { FC } from "react";
import { ActivityIndicator } from "react-native";
import { Box } from "./Box";

interface ILoadingProps extends IDimensionCSS, IPaddingCSS, IMarginCSS {}

export const Loading: FC<ILoadingProps> = ({ ...styles }) => {
  return (
    <Box {...styles}>
      <ActivityIndicator size="large" color="black" />
    </Box>
  );
};
