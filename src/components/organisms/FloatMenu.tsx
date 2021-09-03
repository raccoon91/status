import React, { FC, useState } from "react";
import { Container } from "@src/components/atoms";
import { FloatMenuMainButton, FloatMenuSubButton } from "@src/components/molecules";
import { useNavigation } from "@react-navigation/native";

interface IFloatMenu {
  floatMenuOptions: {
    position: {
      right?: string;
      bottom?: string;
    };
    mainMenu: {
      size?: string;
      color?: string;
      iconName: string;
      iconSize?: number;
      iconColor?: string;
    };
    subMenu: {
      size?: string;
      color?: string;
      iconName: string;
      iconSize?: number;
      iconColor?: string;
      to: string;
    }[];
  };
}
export const FloatMenu: FC<IFloatMenu> = ({ floatMenuOptions: { position, mainMenu, subMenu } }) => {
  const navigation = useNavigation();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setIsOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setIsOpenMenu(false);
  };

  const handlePressSubMenu = (to: string) => () => {
    setIsOpenMenu(false);
    navigation.navigate(to);
  };

  return (
    <Container position="absolute" right={position.right || "0"} bottom={position.bottom || "0"} w="50px" h="50px">
      <FloatMenuMainButton
        size={mainMenu.size || "48px"}
        bgColor={mainMenu.color || "black"}
        featherIconName={mainMenu.iconName}
        iconColor={mainMenu.iconColor || "white"}
        iconSize={mainMenu.iconSize || 32}
        isOpenMenu={isOpenMenu}
        openMenu={handleOpenMenu}
        closeMenu={handleCloseMenu}
      />
      {subMenu &&
        subMenu.length !== 0 &&
        subMenu.map((sub, index) => (
          <FloatMenuSubButton
            key={`sub-menu=${index}`}
            index={index + 1}
            size={sub.size || "40px"}
            color={sub.color || "gray"}
            iconName={sub.iconName}
            iconSize={sub.iconSize || 20}
            iconColor={sub.iconColor || "white"}
            isOpenMenu={isOpenMenu}
            pressSubMenu={handlePressSubMenu(sub.to)}
          />
        ))}
    </Container>
  );
};
