import React, { FC } from "react";
import { OpacityBox } from "./OpacityBox";
import { Text } from "./typography";
import { getButtonVariant } from "@src/configs";

interface IButtonProps extends IFlexCSS, IDimensionCSS, IMarginCSS, IPaddingCSS, IBorderCSS {
  variant?: string;
  size?: IFontSize;
  weight?: string;
  onPress?: () => void;
  children: React.ReactNode | React.ReactNode[];
}

export const Button: FC<IButtonProps> = ({ children, size, weight, variant, onPress, ...styles }) => {
  const { color, ...boxStyles } = getButtonVariant(variant);

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
