import styled from "styled-components/native";

interface ITextProps {
  margin?: string;
  padding?: string;
  color?: string;
  size?: string;
  weight?: string;
  align?: string;
}

export const Text = styled.Text<ITextProps>`
  ${({ margin }) => margin && `margin: ${margin};`}
  ${({ padding }) => padding && `padding: ${padding};`}
  ${({ color }) => color && `color: ${color};`}
  ${({ size }) => size && `font-size: ${size};`}
  ${({ weight }) => weight && `font-weight: ${weight};`}
  ${({ align }) => align && `text-align: ${align};`}
`;
