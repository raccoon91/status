import styled from "styled-components/native";
import { styledDimension, styledMargin, styledPadding, styledBorder, styledText } from "./styled";

interface ITextProps extends IDimension, IMargin, IPadding, IBorder, IText {}

export const Bold = styled.Text<ITextProps>`
  ${styledDimension()}
  ${styledMargin}
  ${styledPadding}
  ${styledBorder()}
  ${styledText({ size: "16px", weight: "bold" })}
`;

export const Text = styled.Text<ITextProps>`
  ${styledDimension()}
  ${styledMargin}
  ${styledPadding}
  ${styledBorder()}
  ${styledText()}
`;
