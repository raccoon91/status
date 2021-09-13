import { Dimensions, Platform, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 320;

const normalize = (size: number) => {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const fonts = {
  xs: `${normalize(12)}px`,
  sm: `${normalize(14)}px`,
  md: `${normalize(16)}px`,
  lg: `${normalize(18)}px`,
  xl: `${normalize(20)}px`,
  xx: `${normalize(22)}px`,
  ti: `${normalize(24)}px`,
};

export const theme = {
  fonts,
};
