import React, { FC, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Box } from "@src/components/atoms";
import { FloatMenuMainButton, FloatMenuSubButton } from "@src/components/molecules";
import { useNavigation } from "@react-navigation/native";

const app = Dimensions.get("window");

export interface IFloatMenuOption {
  position: {
    right?: string;
    bottom?: string;
  };
  mainMenu: {
    size?: string;
    color?: IColor;
    iconName: string;
    iconSize?: number;
    iconColor?: string;
  };
  subMenu: {
    name?: string;
    size?: string;
    color?: IColor;
    iconName: string;
    iconSize?: number;
    iconColor?: string;
    to: string;
  }[];
}

interface IFloatMenu {
  floatMenuOptions: IFloatMenuOption;
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
    handleCloseMenu();
    navigation.navigate(to);
  };

  return (
    <>
      <Box position="absolute" right={position.right || "0"} bottom={position.bottom || "0"} w="50px" h="50px">
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
      </Box>

      <Modal
        isVisible={isOpenMenu}
        animationIn="fadeIn"
        animationOut="fadeOut"
        coverScreen={false}
        deviceWidth={app.width}
        deviceHeight={app.height}
        backdropTransitionOutTiming={0}
        onBackdropPress={handleCloseMenu}
        onBackButtonPress={handleCloseMenu}
        style={styles.modal}
      >
        <Box position="absolute" right={position.right || "0"} bottom={position.bottom || "0"} w="50px" h="50px">
          {subMenu &&
            subMenu.length !== 0 &&
            subMenu.map((sub, index) => (
              <FloatMenuSubButton
                key={`sub-menu=${index}`}
                index={index + 1}
                name={sub.name}
                size={sub.size || "40px"}
                color={sub.color || "gray"}
                iconName={sub.iconName}
                iconSize={sub.iconSize || 20}
                iconColor={sub.iconColor || "white"}
                isOpenMenu={isOpenMenu}
                pressSubMenu={handlePressSubMenu(sub.to)}
              />
            ))}
        </Box>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
});
