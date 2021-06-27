import styled from "styled-components/native";
import { styledDimension, styledMargin, styledPadding } from "./styled";

interface ITextProps extends IDimension, IMargin, IPadding, IBorder {
  color?: string;
  size?: string;
  weight?: string;
  align?: string;
}

export const Text = styled.Text<ITextProps>`
  ${styledDimension}
  ${styledMargin}
  ${styledPadding}
  ${({ border }) => border && `border: ${border};`}
  ${({ color }) => color && `color: ${color};`}
  ${({ size }) => size && `font-size: ${size};`}
  ${({ weight }) => weight && `font-weight: ${weight};`}
  ${({ align }) => align && `text-align: ${align};`}
`;
