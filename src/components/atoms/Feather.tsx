import React from "react";
import Icon from "react-native-vector-icons/Feather";

export const Feather = ({ name, color, size }: { name: string; color?: string; size?: number }) => {
  return <Icon name={name} color={color} size={size} />;
};
