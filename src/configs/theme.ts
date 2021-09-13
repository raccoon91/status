import { Dimensions, Platform, PixelRatio } from "react-native";
import type { StackNavigationOptions } from "@react-navigation/stack/lib/typescript/src/types";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 320;

const fontSizeNormalize = (size: number) => {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export const headerStyle = (title: string, theme = "light"): StackNavigationOptions => ({
  title,
  headerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    backgroundColor: theme === "light" ? colors.white : colors.black,
  },
  headerTintColor: theme === "light" ? colors.black : colors.white,
  headerTitleStyle: {
    fontWeight: "bold",
  },
  headerTitleAlign: "left",
});

export const getButtonVariant = (variant?: string): { bgColor: IColor; color: IColor; border?: string } => {
  switch (variant) {
    case "black":
      return {
        bgColor: "black",
        color: "white",
      };
    case "gray":
      return {
        bgColor: "gray",
        color: "white",
      };
    case "disabled":
      return {
        bgColor: "gray200",
        color: "white",
      };
    case "outline-black":
      return {
        border: "1px solid black",
        bgColor: "white",
        color: "black",
      };
    case "outline-gray":
      return {
        border: "1px solid gray",
        bgColor: "white",
        color: "gray",
      };
    default:
      return {
        bgColor: "black",
        color: "white",
      };
  }
};

const fonts = {
  xs: `${fontSizeNormalize(12)}px`,
  sm: `${fontSizeNormalize(14)}px`,
  md: `${fontSizeNormalize(16)}px`,
  lg: `${fontSizeNormalize(18)}px`,
  xl: `${fontSizeNormalize(20)}px`,
  xx: `${fontSizeNormalize(22)}px`,
  ti: `${fontSizeNormalize(24)}px`,
};

const colors = {
  white: "#ffffff",
  black: "#000000",
  blue: "#00008b",
  gray: "#808080",
  gray50: "#f5f5f5",
  gray100: "#e9e9e9",
  gray200: "#d9d9d9",
  gray300: "#c4c4c4",
  gray400: "#9d9d9d",
  gray500: "#7b7b7b",
};

export const theme = {
  fonts,
  colors,
};
