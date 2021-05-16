import React, { FC } from "react";
import { Container } from "@src/components/atoms";
import { FloatMenuMainButton } from "@src/components/molecules";
import { useNavigation } from "@react-navigation/core";

interface IFloatMenu {
  right?: string;
  bottom?: string;
}
export const FloatMenu: FC<IFloatMenu> = ({ right, bottom }) => {
  const navigation = useNavigation();

  const pressAddStatus = () => {
    navigation.navigate("Update");
  };

  return (
    <Container position="absolute" right={right || "0"} bottom={bottom || "0"}>
      <FloatMenuMainButton bgColor="black" featherIconName="plus" iconColor="white" />
    </Container>
  );
};
