import React, { FC } from "react";
import { ActivityIndicator } from "react-native";
import { Flex } from "./Flex";

interface ILoadingProps extends IDimensionCSS, IPaddingCSS, IMarginCSS {}

export const Loading: FC<ILoadingProps> = ({ ...styles }) => {
  return (
    <Flex {...styles}>
      <ActivityIndicator size="large" color="black" />
    </Flex>
  );
};
