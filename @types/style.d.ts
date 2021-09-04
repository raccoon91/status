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
  f?: string;
  wrap?: string;
  align?: string;
  justify?: string;
}

interface IDimension {
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
  pb?: string;
  px?: string;
  py?: string;
}

interface IMargin {
  m?: string;
  mt?: string;
  mb?: string;
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
