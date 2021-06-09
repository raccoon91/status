import React, { FC } from "react";
import { TouchableBox } from "./TouchableBox";
import { Text } from "./Text";

interface IButtonProps extends IFlex, IDimension, IMargin, IPadding, IBorder {
  title: string;
  size?: string;
  weight?: string;
  bgColor?: string;
  color?: string;
  active?: boolean;
  activeBgColor?: string;
  activeColor?: string;
  onPress?: () => void;
}

export const Button: FC<IButtonProps> = ({
  title,
  size,
  weight,
  active,
  bgColor = "#e8e8e8",
  color = "black",
  activeBgColor = "black",
  activeColor = "white",
  onPress,
  ...styles
}) => {
  return (
    <TouchableBox {...styles} bgColor={active ? activeBgColor : bgColor} onPress={onPress}>
      <Text size={size} weight={weight} color={active ? activeColor : color}>
        {title}
      </Text>
    </TouchableBox>
  );
};
