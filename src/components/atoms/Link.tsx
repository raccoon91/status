import React, { FC } from "react";
import { Linking } from "react-native";
import { Text } from "./typography";

interface ILinkProps {
  href: string;
  children: React.ReactNode;
  color?: IColor;
  weight?: string;
  size?: string;
}
export const Link: FC<ILinkProps> = ({ href, children, color, weight, size }) => {
  const linkTo = (url: string) => () => {
    Linking.openURL(url);
  };

  return (
    <Text color={color || "blue"} weight={weight || "bold"} {...size} onPress={linkTo(href)}>
      {children}
    </Text>
  );
};
