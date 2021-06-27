import styled from "styled-components/native";
import { styledDimension } from "./styled";
import { TouchableHighlight } from "react-native-gesture-handler";

interface ICircleMunuProps extends IDimension, IBorder {
  bgColor?: string;
  color?: string;
}

export const CircleMenu = styled(TouchableHighlight)<ICircleMunuProps>`
  align-items: center;
  justify-content: center;
  ${styledDimension}
  ${({ border }) => border && `border: ${border};`}
  border-radius: ${({ radius }) => radius || "100px"};
  ${({ bgColor }) => bgColor && `background-color: ${bgColor};`}
  ${({ color }) => color && `color: ${color};`}
`;
