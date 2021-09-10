import React, { FC } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Block } from "@src/components/atoms";
import { FloatMenuMainButton, FloatMenuSubButton } from "@src/components/molecules";
import { useNavigation } from "@react-navigation/native";

const app = Dimensions.get("window");

interface IFloatMenu {
  show: boolean;
  open: () => void;
  close: () => void;
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
      name?: string;
      size?: string;
      color?: string;
      iconName: string;
      iconSize?: number;
      iconColor?: string;
      to: string;
    }[];
  };
}
export const FloatMenu: FC<IFloatMenu> = ({ show, open, close, floatMenuOptions: { position, mainMenu, subMenu } }) => {
  const navigation = useNavigation();

  const handlePressSubMenu = (to: string) => () => {
    close();
    navigation.navigate(to);
  };

  return (
    <>
      <Block position="absolute" right={position.right || "0"} bottom={position.bottom || "0"} w="50px" h="50px">
        <FloatMenuMainButton
          size={mainMenu.size || "48px"}
          bgColor={mainMenu.color || "black"}
          featherIconName={mainMenu.iconName}
          iconColor={mainMenu.iconColor || "white"}
          iconSize={mainMenu.iconSize || 32}
          isOpenMenu={show}
          openMenu={open}
          closeMenu={close}
        />
      </Block>

      <Modal
        isVisible={show}
        coverScreen={false}
        deviceWidth={app.width}
        deviceHeight={app.height}
        backdropTransitionOutTiming={0}
        onBackdropPress={close}
        onBackButtonPress={close}
        style={styles.modal}
      >
        <Block position="absolute" right={position.right || "0"} bottom={position.bottom || "0"} w="50px" h="50px">
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
                isOpenMenu={show}
                pressSubMenu={handlePressSubMenu(sub.to)}
              />
            ))}
        </Block>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
});
