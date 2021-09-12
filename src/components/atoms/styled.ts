import { css } from "styled-components/native";
import type { StackNavigationOptions } from "@react-navigation/stack/lib/typescript/src/types";

export const headerStyle = (title: string, theme = "light"): StackNavigationOptions => ({
  title,
  headerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#e2e2e2",
    backgroundColor: theme === "light" ? "white" : "black",
  },
  headerTintColor: theme === "light" ? "black" : "white",
  headerTitleStyle: {
    fontWeight: "bold",
  },
  headerTitleAlign: "left",
});

export const styledPosition = css<IPosition>`
  ${({ position }) => position && `position: ${position};`}
  ${({ top }) => top && `top: ${top};`}
  ${({ right }) => right && `right: ${right};`}
  ${({ left }) => left && `left: ${left};`}
  ${({ bottom }) => bottom && `bottom: ${bottom};`}
  ${({ zIndex }) => zIndex && `z-index: ${zIndex};`}
`;

export const styledFlex = (defaultStyle?: IFlex) => css<IFlex>`
  ${({ f }) => (f || defaultStyle?.f) && `flex: ${f || defaultStyle?.f};`}
  ${({ d }) => (d || defaultStyle?.d) && `flex-direction: ${d || defaultStyle?.d};`}
  ${({ wrap }) => wrap && `flex-wrap: ${wrap};`}
  justify-content: ${({ justify }) => justify || defaultStyle?.justify || "center"};
  align-items: ${({ align }) => align || defaultStyle?.align || "center"};
`;

export const styledDimension = (defaultStyle?: IDimension) => css<IDimension>`
  ${({ display }) => display && `display: ${display};`}
  ${({ w }) => (w || defaultStyle?.w) && `width: ${w || defaultStyle?.w};`}
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth};`}
  ${({ minWidth }) => minWidth && `min-width: ${minWidth};`}
  ${({ h }) => h && `height: ${h};`}
  ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight};`}
  ${({ minHeight }) => minHeight && `min-height: ${minHeight};`}
`;

export const styledMargin = css<IMargin>`
  ${({ m }) => m && `margin: ${m};`}
  ${({ mt }) => mt && `margin-top: ${mt};`}
  ${({ mr }) => mr && `margin-right: ${mr};`}
  ${({ mb }) => mb && `margin-bottom: ${mb};`}
  ${({ ml }) => ml && `margin-left: ${ml};`}
  ${({ mx }) => mx && `margin: 0 ${mx};`}
  ${({ my }) => my && `margin: ${my} 0;`}
`;

export const styledPadding = css<IPadding>`
  ${({ p }) => p && `padding: ${p};`}
  ${({ pt }) => pt && `padding-top: ${pt};`}
  ${({ pr }) => pr && `padding-right: ${pr};`}
  ${({ pb }) => pb && `padding-bottom: ${pb};`}
  ${({ pl }) => pl && `padding-left: ${pl};`}
  ${({ px }) => px && `padding: 0 ${px};`}
  ${({ py }) => py && `padding: ${py} 0;`}
`;

export const styledBorder = (defaultStyle?: IBorder) => css<IBorder>`
  ${({ border }) => (border || defaultStyle?.border) && `border: ${border || defaultStyle?.border};`}
  ${({ radius }) => (radius || defaultStyle?.radius) && `border-radius: ${radius || defaultStyle?.radius};`}
`;

export const styledBackground = (defaultStyle?: IBackground) => css<IBackground>`
  ${({ bgColor }) => (bgColor || defaultStyle?.bgColor) && `background-color: ${bgColor || defaultStyle?.bgColor};`}
  ${({ opacity }) => opacity && `opacity: ${opacity};`}
`;

export const styledText = (defaultStyle?: IText) => css<IText>`
  ${({ color }) => color && `color: ${color};`}
  ${({ size }) => (size || defaultStyle?.size) && `font-size: ${size || defaultStyle?.size};`}
  ${({ weight }) => (weight || defaultStyle?.weight) && `font-weight: ${weight || defaultStyle?.weight};`}
  ${({ tAlign }) => tAlign && `text-align: ${tAlign};`}
  ${({ line }) => line && `line-height: ${line};`}
`;
