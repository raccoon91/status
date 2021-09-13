import styled from "styled-components/native";
import { dimensionCSS, marginCSS, paddingCSS, borderCSS, textCSS } from "./css";

interface ITextProps extends IDimensionCSS, IMarginCSS, IPaddingCSS, IBorderCSS, ITextCSS {}

export const Bold = styled.Text<ITextProps>`
  ${dimensionCSS()}
  ${marginCSS}
  ${paddingCSS}
  ${borderCSS()}
  ${textCSS({ size: "md", weight: "bold" })}
`;

export const Text = styled.Text<ITextProps>`
  ${dimensionCSS()}
  ${marginCSS}
  ${paddingCSS}
  ${borderCSS()}
  ${textCSS()}
`;
