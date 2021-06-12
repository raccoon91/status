import styled from "styled-components/native";
import { TouchableHighlight } from "react-native-gesture-handler";

interface ICircleMunuProps extends IDimension, IBorder {
  w?: string;
  h?: string;
  border?: string;
  radius?: string;
  bgColor?: string;
  color?: string;
}

export const CircleMenu = styled(TouchableHighlight)<ICircleMunuProps>`
  align-items: center;
  justify-content: center;
  ${({ w }) => w && `width: ${w};`}
  ${({ h }) => h && `height: ${h};`}
  ${({ border }) => border && `border: ${border};`}
  border-radius: ${({ radius }) => radius || "100px"};
  ${({ bgColor }) => bgColor && `background-color: ${bgColor};`}
  ${({ color }) => color && `color: ${color};`}
`;
