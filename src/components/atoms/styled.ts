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

export const styledFlex = css<IFlex>`
  ${({ f }) => f && `flex: ${f};`}
  ${({ d }) => d && `flex-direction: ${d};`}
  ${({ wrap }) => wrap && `flex-wrap: ${wrap};`}
  justify-content: ${({ justify }) => justify || "center"};
  align-items: ${({ align }) => align || "center"};
`;

export const styledDimension = css<IDimension>`
  ${({ w }) => w && `width: ${w};`}
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth};`}
  ${({ minWidth }) => minWidth && `min-width: ${minWidth};`}
  ${({ h }) => h && `height: ${h};`}
  ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight};`}
  ${({ minHeight }) => minHeight && `min-height: ${minHeight};`}
`;

export const styledMargin = css<IMargin>`
  ${({ m }) => m && `margin: ${m};`}
  ${({ mt }) => mt && `margin-top: ${mt};`}
  ${({ mb }) => mb && `margin-bottom: ${mb};`}
  ${({ mx }) => mx && `margin: 0 ${mx};`}
  ${({ my }) => my && `margin: ${my} 0;`}
`;

export const styledPadding = css<IPadding>`
  ${({ p }) => p && `padding: ${p};`}
  ${({ pt }) => pt && `padding-top: ${pt};`}
  ${({ pb }) => pb && `padding-bottom: ${pb};`}
  ${({ px }) => px && `padding: 0 ${px};`}
  ${({ py }) => py && `padding: ${py} 0;`}
`;

export const styledBorder = css<IBorder>`
  ${({ border }) => border && `border: ${border};`}
  ${({ radius }) => radius && `border-radius: ${radius};`}
`;

export const styledBackground = css<IBackground>`
  ${({ bgColor }) => bgColor && `background-color: ${bgColor};`}
  ${({ opacity }) => opacity && `opacity: ${opacity};`}
`;
