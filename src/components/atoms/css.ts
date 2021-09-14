import { css } from "styled-components/native";

export const positionCSS = css<IPositionCSS>`
  ${({ position }) => position && `position: ${position};`}
  ${({ top }) => top && `top: ${top};`}
  ${({ right }) => right && `right: ${right};`}
  ${({ left }) => left && `left: ${left};`}
  ${({ bottom }) => bottom && `bottom: ${bottom};`}
  ${({ zIndex }) => zIndex && `z-index: ${zIndex};`}
`;

export const flexCSS = (defaultStyle?: IFlexCSS) => css<IFlexCSS>`
  ${({ f }) => (f || defaultStyle?.f) && `flex: ${f || defaultStyle?.f};`}
  ${({ d }) => (d || defaultStyle?.d) && `flex-direction: ${d || defaultStyle?.d};`}
  ${({ wrap }) => wrap && `flex-wrap: ${wrap};`}
  justify-content: ${({ justify }) => justify || defaultStyle?.justify || "center"};
  align-items: ${({ align }) => align || defaultStyle?.align || "center"};
`;

export const dimensionCSS = (defaultStyle?: IDimensionCSS) => css<IDimensionCSS>`
  ${({ display }) => display && `display: ${display};`}
  ${({ w }) => (w || defaultStyle?.w) && `width: ${w || defaultStyle?.w};`}
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth};`}
  ${({ minWidth }) => minWidth && `min-width: ${minWidth};`}
  ${({ h }) => (h || defaultStyle?.h) && `height: ${h || defaultStyle?.h};`}
  ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight};`}
  ${({ minHeight }) => minHeight && `min-height: ${minHeight};`}
`;

export const marginCSS = css<IMarginCSS>`
  ${({ m }) => m && `margin: ${m};`}
  ${({ mt }) => mt && `margin-top: ${mt};`}
  ${({ mr }) => mr && `margin-right: ${mr};`}
  ${({ mb }) => mb && `margin-bottom: ${mb};`}
  ${({ ml }) => ml && `margin-left: ${ml};`}
  ${({ mx }) => mx && `margin: 0 ${mx};`}
  ${({ my }) => my && `margin: ${my} 0;`}
`;

export const paddingCSS = css<IPaddingCSS>`
  ${({ p }) => p && `padding: ${p};`}
  ${({ pt }) => pt && `padding-top: ${pt};`}
  ${({ pr }) => pr && `padding-right: ${pr};`}
  ${({ pb }) => pb && `padding-bottom: ${pb};`}
  ${({ pl }) => pl && `padding-left: ${pl};`}
  ${({ px }) => px && `padding: 0 ${px};`}
  ${({ py }) => py && `padding: ${py} 0;`}
`;

export const borderCSS = (defaultStyle?: IBorderCSS) => css<IBorderCSS>`
  ${({ border }) => (border || defaultStyle?.border) && `border: ${border || defaultStyle?.border};`}
  ${({ radius }) => (radius || defaultStyle?.radius) && `border-radius: ${radius || defaultStyle?.radius};`}
`;

export const backgroundCSS = (defaultStyle?: IBackgroundCSS) => css<IBackgroundCSS>`
  ${({ theme, bgColor }) =>
    (bgColor || defaultStyle?.bgColor) &&
    `background-color: ${
      bgColor ? theme.colors[bgColor] : defaultStyle?.bgColor ? theme.colors[defaultStyle.bgColor] : theme.colors.white
    };`}
  ${({ opacity }) => opacity && `opacity: ${opacity};`}
`;

export const textCSS = (defaultStyle?: ITextCSS) => css<ITextCSS>`
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : defaultStyle?.color ? theme.colors[defaultStyle.color] : theme.colors.black};
  font-size: ${({ theme, size }) =>
    size ? theme.fonts[size] : defaultStyle?.size ? theme.fonts[defaultStyle.size] : theme.fonts.sm};
  ${({ weight }) => (weight || defaultStyle?.weight) && `font-weight: ${weight || defaultStyle?.weight};`}
  ${({ tAlign }) => tAlign && `text-align: ${tAlign};`} ${({ line }) => line && `line-height: ${line};`};
`;
