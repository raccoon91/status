import styled from "styled-components/native";
import { positionCSS, flexCSS, dimensionCSS, marginCSS, paddingCSS, borderCSS, backgroundCSS } from "./css";

interface IBoxProps
  extends IPositionCSS,
    IFlexCSS,
    IDimensionCSS,
    IMarginCSS,
    IPaddingCSS,
    IBorderCSS,
    IBackgroundCSS {}

export const Box = styled.View<IBoxProps>`
  ${positionCSS}
  ${flexCSS()}
  ${dimensionCSS()}
  ${marginCSS}
  ${paddingCSS}
  ${borderCSS()}
  ${backgroundCSS()}
`;
