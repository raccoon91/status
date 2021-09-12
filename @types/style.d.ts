interface IPosition {
  position?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: string;
}

interface IFlex {
  d?: string;
  f?: string | number;
  wrap?: string;
  align?: string;
  justify?: string;
}

interface IDimension {
  display?: string;
  w?: string;
  maxWidth?: string;
  minWidth?: string;
  h?: string;
  maxHeight?: string;
  minHeight?: string;
}

interface IPadding {
  p?: string;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  px?: string;
  py?: string;
}

interface IMargin {
  m?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  mx?: string;
  my?: string;
}

interface IBorder {
  border?: string;
  radius?: string;
}

interface IBackground {
  bgColor?: string;
  opacity?: string;
}

interface IText {
  color?: string;
  size?: string;
  weight?: string;
  tAlign?: string;
  line?: string;
}
