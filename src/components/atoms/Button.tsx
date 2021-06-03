import React, { FC } from "react";
import { OpacityBox } from "./OpacityBox";
import { Text } from "./Text";

interface IButtonProps {
  title: string;
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
  b?: string;
  r?: string;
  bgColor?: string;
  color?: string;
  selected?: boolean | null;
  onPress?: () => void;
}

export const Button: FC<IButtonProps> = ({ title, selected, onPress, ...styles }) => {
  return (
    <OpacityBox {...styles} border="1px solid black" bgColor={selected ? "black" : "white"} onPress={onPress}>
      <Text color={selected ? "white" : "black"}>{title}</Text>
    </OpacityBox>
  );
};
