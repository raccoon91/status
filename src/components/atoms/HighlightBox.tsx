import styled from "styled-components/native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { positionCSS, flexCSS, dimensionCSS, marginCSS, paddingCSS, borderCSS, backgroundCSS } from "./css";

interface IHighlightBoxProps
  extends IPositionCSS,
    IFlexCSS,
    IDimensionCSS,
    IMarginCSS,
    IPaddingCSS,
    IBorderCSS,
    IBackgroundCSS {}

export const HighlightBox = styled(TouchableHighlight)<IHighlightBoxProps>`
  ${positionCSS}
  ${flexCSS()}
  ${dimensionCSS()}
  ${marginCSS}
  ${paddingCSS}
  ${borderCSS()}
  ${backgroundCSS()}
`;
