import styled from "styled-components/native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { styledFlex, styledDimension, styledBorder, styledBackground, styledText } from "./styled";

interface ICircleMunuProps extends IFlex, IDimension, IBorder, IBackground, IText {}

export const CircleMenu = styled(TouchableHighlight)<ICircleMunuProps>`
  ${styledFlex()}
  ${styledDimension()}
  ${styledBorder({ radius: "100px" })}
  ${styledBackground()}
  ${styledText()}
`;
