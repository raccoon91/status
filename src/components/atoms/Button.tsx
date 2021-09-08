import React, { FC } from "react";
import { OpacityBox } from "./OpacityBox";
import { Text } from "./typography";

const getVariant = (variant?: string) => {
  switch (variant) {
    case "black":
      return {
        bgColor: "black",
        color: "white",
      };
    case "gray":
      return {
        bgColor: "darkgray",
        color: "white",
      };
    case "disabled":
      return {
        bgColor: "#e8e8e8",
        color: "white",
      };
    case "outline-black":
      return {
        border: "1px solid black",
        bgColor: "white",
        color: "black",
      };
    case "outline-gray":
      return {
        border: "1px solid darkgray",
        bgColor: "white",
        color: "darkgray",
      };
    default:
      return {
        bgColor: "black",
        color: "white",
      };
  }
};

interface IButtonProps extends IFlex, IDimension, IMargin, IPadding, IBorder {
  variant?: string;
  size?: string;
  weight?: string;
  onPress?: () => void;
  children: React.ReactNode | React.ReactNode[];
}

export const Button: FC<IButtonProps> = ({ children, size, weight, variant, onPress, ...styles }) => {
  const { color, ...boxStyles } = getVariant(variant);

  return (
    <OpacityBox {...styles} {...boxStyles} onPress={onPress}>
      {typeof children === "string" ? (
        <Text size={size} weight={weight} color={color}>
          {children}
        </Text>
      ) : (
        React.Children.map(children, (child) => child)
      )}
    </OpacityBox>
  );
};
