import styled from "styled-components/native";

interface ITextProps {
  w?: string;
  h?: string;
  m?: string;
  mb?: string;
  mx?: string;
  my?: string;
  p?: string;
  px?: string;
  py?: string;
  color?: string;
  size?: string;
  weight?: string;
  align?: string;
  border?: string;
}

export const Text = styled.Text<ITextProps>`
  ${({ w }) => w && `width: ${w};`}
  ${({ h }) => h && `height: ${h};`}
  ${({ m }) => m && `margin: ${m};`}
  ${({ mb }) => mb && `margin-bottom: ${mb};`}
  ${({ mx }) => mx && `margin: 0 ${mx};`}
  ${({ my }) => my && `margin: ${my} 0;`}
  ${({ p }) => p && `padding: ${p};`}
  ${({ px }) => px && `padding: 0 ${px};`}
  ${({ py }) => py && `padding: ${py} 0;`}
  ${({ border }) => border && `border: ${border};`}
  ${({ color }) => color && `color: ${color};`}
  ${({ size }) => size && `font-size: ${size};`}
  ${({ weight }) => weight && `font-weight: ${weight};`}
  ${({ align }) => align && `text-align: ${align};`}
`;
