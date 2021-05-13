import styled from "styled-components/native";

interface IScrollBoxProps {
  w?: string;
  h?: string;
  m?: string;
  mt?: string;
  mb?: string;
  mx?: string;
  my?: string;
  p?: string;
  pt?: string;
  pb?: string;
  px?: string;
  py?: string;
  bgColor?: string;
}

export const ScrollBox = styled.ScrollView<IScrollBoxProps>`
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
  ${({ py }) => py && `padding: ${py} 0;`}\
  ${({ bgColor }) => bgColor && `background-color: ${bgColor};`}
`;
