import styled from "styled-components/native";
import { positionCSS, dimensionCSS, marginCSS, paddingCSS, borderCSS, backgroundCSS } from "./css";

interface IBlockProps extends IPositionCSS, IDimensionCSS, IMarginCSS, IPaddingCSS, IBorderCSS, IBackgroundCSS {}

export const Block = styled.View<IBlockProps>`
  ${positionCSS}
  ${dimensionCSS({ display: "block" })}
  ${marginCSS}
  ${paddingCSS}
  ${borderCSS()}
  ${backgroundCSS()}
`;
