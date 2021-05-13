import React, { FC } from "react";
import {
  Dimensions,
  Animated,
  PanResponder,
  StyleSheet,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";
import { Box } from "@src/components/atoms";

const DEVICE = Dimensions.get("window");

const ANIMATED = {
  HIDDEN: -(DEVICE.height - 100),
  FULL_OPEN: -50,
};

const STARTING_POSITION = ANIMATED.HIDDEN - ANIMATED.FULL_OPEN;

const animatedPosition = new Animated.Value(STARTING_POSITION);

const animateMove = (toValue: number) => {
  Animated.spring(animatedPosition, {
    toValue,
    tension: 60,
    useNativeDriver: false,
  }).start();
};

const onMoveShouldSetPanResponder = (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
  return gestureState.dy >= 20 || gestureState.dy <= -20;
};

const onPanResponderRelease = (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
  const toValue = gestureState.dy > 0 ? STARTING_POSITION : 0;

  animateMove(toValue);
};

const panGesture = PanResponder.create({
  onMoveShouldSetPanResponder,
  onPanResponderRelease,
});

interface IBottomSheetProps {
  children: React.ReactChild;
}

export const BottomSheet: FC<IBottomSheetProps> = ({ children }) => {
  return (
    <Animated.View style={[styles.animatedView, { bottom: animatedPosition }]} {...panGesture.panHandlers}>
      <Box justify="flex-start" w="100%" h="50px" pt="20px">
        <Box w="40px" h="5px" radius="20px" bgColor="#d2d2d2" />
      </Box>

      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    position: "absolute",
    left: 0,

    width: DEVICE.width,
    height: Math.abs(ANIMATED.HIDDEN),

    marginTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 10,

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: "#d2d2d2",

    backgroundColor: "white",

    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});
