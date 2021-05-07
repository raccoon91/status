import styled from "styled-components/native";

interface IBoxProps {
  justify?: string;
  direction?: string;
  align?: string;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  bgColor?: string;
}

export const Box = styled.View<IBoxProps>`
  ${({ direction }) => direction && `flex-direction: ${direction};`}
  justify-content: ${({ justify }) => justify || "center"};
  align-items: ${({ align }) => align || "center"};
  ${({ width }) => width && `width: ${width};`}
  ${({ height }) => height && `height: ${height};`}
  ${({ margin }) => margin && `margin: ${margin};`}
  ${({ padding }) => padding && `padding: ${padding};`}
  ${({ bgColor }) => bgColor && `background-color: ${bgColor};`}
`;
