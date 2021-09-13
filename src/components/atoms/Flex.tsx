import styled from "styled-components/native";
import { positionCSS, flexCSS, dimensionCSS, marginCSS, paddingCSS, borderCSS, backgroundCSS } from "./css";

interface IFlexProps
  extends IPositionCSS,
    IFlexCSS,
    IDimensionCSS,
    IMarginCSS,
    IPaddingCSS,
    IBorderCSS,
    IBackgroundCSS {}

export const Flex = styled.View<IFlexProps>`
  ${positionCSS}
  ${flexCSS()}
  ${dimensionCSS()}
  ${marginCSS}
  ${paddingCSS}
  ${borderCSS()}
  ${backgroundCSS()}
`;
