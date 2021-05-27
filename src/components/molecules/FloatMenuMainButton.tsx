import React, { FC, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { CircleMenu } from "@src/components/atoms";

interface IFloatMenuMainButtonProps {
  size: string;
  bgColor: string;
  featherIconName: string;
  iconColor: string;
  iconSize: number;
  isOpenMenu: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}
export const FloatMenuMainButton: FC<IFloatMenuMainButtonProps> = ({
  size,
  bgColor,
  featherIconName,
  iconColor,
  iconSize,
  isOpenMenu,
  openMenu,
  closeMenu,
}) => {
  const rotateDeg = useRef(new Animated.Value(0)).current;

  const handlePressMainMenu = () => {
    if (isOpenMenu) {
      closeMenu();
      Animated.timing(rotateDeg, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      openMenu();
      Animated.timing(rotateDeg, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const transformAnimation = [
    {
      rotate: rotateDeg.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "45deg"],
      }),
    },
  ];

  return (
    <Animated.View style={[styles.animatedView, { transform: transformAnimation }]}>
      <CircleMenu w={size} h={size} bgColor={bgColor} onPress={handlePressMainMenu}>
        <Icon name={featherIconName} color={iconColor} size={iconSize} />
      </CircleMenu>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    position: "absolute",
    zIndex: 10,
  },
});
