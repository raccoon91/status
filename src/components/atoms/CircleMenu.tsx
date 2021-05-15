import styled from "styled-components/native";

interface ICircleMunuProps {
  w?: string;
  h?: string;
  b?: string;
  r?: string;
  bgColor?: string;
  color?: string;
}

export const CircleMenu = styled.TouchableHighlight<ICircleMunuProps>`
  align-items: center;
  justify-content: center;
  ${({ w }) => w && `width: ${w};`}
  ${({ h }) => h && `height: ${h};`}
  ${({ b }) => b && `border: ${b};`}
  ${({ r }) => r && `border-radius: ${r};`}
  ${({ bgColor }) => bgColor && `background-color: ${bgColor};`}
  ${({ color }) => color && `color: ${color};`}
  border-radius: 100px;
`;
