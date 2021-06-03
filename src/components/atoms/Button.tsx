import React, { FC } from "react";
import { OpacityBox } from "./OpacityBox";
import { Text } from "./Text";

interface IButtonProps {
  title: string;
  direction?: string;
  align?: string;
  justify?: string;
  w?: string;
  h?: string;
  m?: string | null;
  mt?: string | null;
  mb?: string | null;
  mx?: string | null;
  my?: string | null;
  p?: string | null;
  pt?: string | null;
  pb?: string | null;
  px?: string | null;
  py?: string | null;
  border?: string;
  radius?: string;
  bgColor?: string;
  color?: string;
  selected?: boolean | null;
  activeBgColor?: string;
  onPress?: () => void;
}

export const Button: FC<IButtonProps> = ({ title, selected, border, bgColor, activeBgColor, onPress, ...styles }) => {
  return (
    <OpacityBox
      {...styles}
      border={border || "1px solid black"}
      bgColor={selected ? activeBgColor || "black" : bgColor || "white"}
      onPress={onPress}
    >
      <Text color={selected ? "white" : "black"}>{title}</Text>
    </OpacityBox>
  );
};
