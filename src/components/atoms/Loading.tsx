import React, { FC } from "react";
import { ActivityIndicator } from "react-native";
import { Flex } from "./Flex";

interface ILoadingProps extends IDimension, IPadding, IMargin {
  isLoad: boolean;
  children: React.ReactElement;
}

export const Loading: FC<ILoadingProps> = ({ isLoad, children, ...styles }) => {
  return isLoad ? (
    <Flex {...styles}>
      <ActivityIndicator size="large" color="black" />
    </Flex>
  ) : (
    children
  );
};
