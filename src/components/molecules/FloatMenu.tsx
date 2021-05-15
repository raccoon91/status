import React, { FC } from "react";
import Icon from "react-native-vector-icons/Feather";
import { CircleMenu, Container } from "@src/components/atoms";
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
      <CircleMenu w="50px" h="50px" bgColor="black" onPress={pressAddStatus}>
        <Icon name="plus" color="white" size={30} />
      </CircleMenu>
    </Container>
  );
};
