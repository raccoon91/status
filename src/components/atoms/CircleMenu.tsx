import styled from "styled-components/native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { flexCSS, dimensionCSS, borderCSS, backgroundCSS, textCSS } from "./css";

interface ICircleMunuProps extends IFlexCSS, IDimensionCSS, IBorderCSS, IBackgroundCSS, ITextCSS {}

export const CircleMenu = styled(TouchableHighlight)<ICircleMunuProps>`
  ${flexCSS()}
  ${dimensionCSS()}
  ${borderCSS({ radius: "100px" })}
  ${backgroundCSS()}
  ${textCSS()}
`;
