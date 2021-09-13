import React, { FC, useRef, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";
import { CircleMenu, Feather } from "@src/components/atoms";

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

  useEffect(() => {
    if (rotateDeg) {
      if (isOpenMenu) {
        Animated.timing(rotateDeg, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(rotateDeg, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [isOpenMenu, rotateDeg]);

  const handlePressMainMenu = () => {
    if (isOpenMenu) {
      closeMenu();
    } else {
      openMenu();
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
        <Feather name={featherIconName} color={iconColor} size={iconSize} />
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
