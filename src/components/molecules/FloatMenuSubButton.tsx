import React, { FC, useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { CircleMenu, Text } from "@src/components/atoms";

interface IFloatMenuSubButtonProps {
  index: number;
  name?: string;
  size?: string;
  color?: string;
  iconName: string;
  iconSize?: number;
  iconColor?: string;
  isOpenMenu: boolean;
  pressSubMenu: () => void;
}
export const FloatMenuSubButton: FC<IFloatMenuSubButtonProps> = ({
  index,
  name,
  size,
  color,
  iconName,
  iconSize,
  iconColor,
  isOpenMenu,
  pressSubMenu,
}) => {
  const position = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpenMenu) {
      Animated.timing(position, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(position, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpenMenu, position]);

  const transformAnimation = [
    {
      translateY: position.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -(60 * index)],
      }),
    },
  ];

  const opacityAnimation = position.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View style={[styles.animatedView, { opacity: opacityAnimation }, { transform: transformAnimation }]}>
      <Text color="white" mr="10px">
        {name}
      </Text>
      <CircleMenu w={size} h={size} bgColor={color} onPress={pressSubMenu}>
        <Icon name={iconName} color={iconColor} size={iconSize} />
      </CircleMenu>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    position: "absolute",
    right: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    minWidth: 100,
    zIndex: 5,
  },
});
