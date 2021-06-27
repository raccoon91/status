import styled from "styled-components/native";
import { styledPosition, styledFlex, styledDimension, styledMargin, styledPadding, styledBorder } from "./styled";

interface IBoxProps extends IPosition, IFlex, IDimension, IMargin, IPadding, IBorder {
  display?: string;
  bgColor?: string;
}

export const Box = styled.View<IBoxProps>`
  display: ${({ display }) => display || "flex"};
  ${styledPosition}
  ${styledFlex}
  ${styledDimension}
  ${styledMargin}
  ${styledPadding}
  ${styledBorder}
  ${({ bgColor }) => bgColor && `background-color: ${bgColor};`}
`;
