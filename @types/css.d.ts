interface IPositionCSS {
  position?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: string;
}

interface IFlexCSS {
  d?: string;
  f?: string | number;
  wrap?: string;
  align?: string;
  justify?: string;
}

interface IDimensionCSS {
  display?: string;
  w?: string;
  maxWidth?: string;
  minWidth?: string;
  h?: string;
  maxHeight?: string;
  minHeight?: string;
}

interface IPaddingCSS {
  p?: string;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  px?: string;
  py?: string;
}

interface IMarginCSS {
  m?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  mx?: string;
  my?: string;
}

interface IBorderCSS {
  border?: string;
  radius?: string;
}

type IColor =
  | "white"
  | "black"
  | "blue"
  | "gray"
  | "gray50"
  | "gray100"
  | "gray200"
  | "gray300"
  | "gray400"
  | "gray500";

interface IBackgroundCSS {
  bgColor?: IColor;
  opacity?: string;
}

type IFontSize = "xs" | "sm" | "md" | "lg" | "xl" | "xx" | "ti";

interface ITextCSS {
  size?: IFontSize;
  color?: IColor;
  weight?: string;
  tAlign?: string;
  line?: string;
}
