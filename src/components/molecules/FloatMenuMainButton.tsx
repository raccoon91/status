import React, { FC, useRef, useState } from "react";
import { Animated } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { CircleMenu } from "@src/components/atoms";

interface IFloatMenuMainButtonProps {
  bgColor: string;
  featherIconName: string;
  iconColor: string;
}
export const FloatMenuMainButton: FC<IFloatMenuMainButtonProps> = ({ bgColor, featherIconName, iconColor }) => {
  const rotateDeg = useRef(new Animated.Value(0)).current;
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const pressOpenMenu = () => {
    if (isOpenMenu) {
      setIsOpenMenu(false);
      Animated.timing(rotateDeg, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      setIsOpenMenu(true);
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
    <Animated.View style={{ transform: transformAnimation }}>
      <CircleMenu w="48px" h="48px" bgColor={bgColor} onPress={pressOpenMenu}>
        <Icon name={featherIconName} color={iconColor} size={32} />
      </CircleMenu>
    </Animated.View>
  );
};
