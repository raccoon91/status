import styled from "styled-components/native";

interface IContainerProps extends IPosition, IFlex, IDimension, IMargin, IPadding {
  position?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  f?: string;
  d?: string;
  justify?: string;
  align?: string;
  w?: string;
  h?: string;
  m?: string;
  mb?: string;
  mx?: string;
  my?: string;
  p?: string;
  pt?: string;
  px?: string;
  py?: string;
  bgColor?: string;
}

export const Container = styled.SafeAreaView<IContainerProps>`
  ${({ position }) => position && `position: ${position};`}
  ${({ top }) => top && `top: ${top};`}
  ${({ right }) => right && `right: ${right};`}
  ${({ bottom }) => bottom && `bottom: ${bottom};`}
  ${({ left }) => left && `left: ${left};`}
  ${({ f }) => f && `flex: ${f};`}
  ${({ d }) => d && `flex-direction: ${d};`}
  justify-content: ${({ justify }) => justify || "center"};
  align-items: ${({ align }) => align || "center"};
  ${({ w }) => w && `width: ${w};`}
  ${({ h }) => h && `height: ${h};`}
  ${({ m }) => m && `margin: ${m};`}
  ${({ mb }) => mb && `margin-bottom: ${mb};`}
  ${({ mx }) => mx && `margin: 0 ${mx};`}
  ${({ my }) => my && `margin: ${my} 0;`}
  ${({ p }) => p && `padding: ${p};`}
  ${({ pt }) => pt && `padding-top: ${pt};`}
  ${({ px }) => px && `padding: 0 ${px};`}
  ${({ py }) => py && `padding: ${py} 0;`}
  ${({ bgColor }) => bgColor && `background-color: ${bgColor};`}
`;
