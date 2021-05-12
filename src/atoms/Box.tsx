import styled from "styled-components/native";

interface IBoxProps {
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
  m?: string | null;
  mt?: string | null;
  mb?: string | null;
  mx?: string | null;
  my?: string | null;
  p?: string | null;
  pt?: string | null;
  pb?: string | null;
  px?: string | null;
  py?: string | null;
  border?: string;
  radius?: string;
  bgColor?: string;
}

export const Box = styled.View<IBoxProps>`
  ${({ position }) => position && `position: ${position};`};
  ${({ top }) => top && `top: ${top};`};
  ${({ right }) => right && `right: ${right};`};
  ${({ left }) => left && `left: ${left};`};
  ${({ bottom }) => bottom && `bottom: ${bottom};`};
  ${({ f }) => f && `flex: ${f};`}
  ${({ d }) => d && `flex-direction: ${d};`}
  justify-content: ${({ justify }) => justify || "center"};
  align-items: ${({ align }) => align || "center"};
  ${({ w }) => w && `width: ${w};`}
  ${({ h }) => h && `height: ${h};`}
  ${({ m }) => m && `margin: ${m};`}
  ${({ mt }) => mt && `margin-top: ${mt};`}
  ${({ mb }) => mb && `margin-bottom: ${mb};`}
  ${({ mx }) => mx && `margin: 0 ${mx};`}
  ${({ my }) => my && `margin: ${my} 0;`}
  ${({ p }) => p && `padding: ${p};`}
  ${({ pt }) => pt && `padding-top: ${pt};`}
  ${({ pb }) => pb && `padding-bottom: ${pb};`}
  ${({ px }) => px && `padding: 0 ${px};`}
  ${({ py }) => py && `padding: ${py} 0;`}
  ${({ border }) => border && `border: ${border};`};
  ${({ radius }) => radius && `border-radius: ${radius};`};
  ${({ bgColor }) => bgColor && `background-color: ${bgColor};`}
`;
