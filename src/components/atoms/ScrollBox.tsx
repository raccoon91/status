import styled from "styled-components/native";
import { dimensionCSS, marginCSS, paddingCSS, backgroundCSS } from "./css";

interface IScrollBoxProps extends IFlexCSS, IDimensionCSS, IMarginCSS, IPaddingCSS, IBackgroundCSS {}

export const ScrollBox = styled.ScrollView<IScrollBoxProps>`
  ${dimensionCSS({ w: "100%", h: "100%" })}
  ${marginCSS}
  ${paddingCSS}
  ${backgroundCSS()}
`;
