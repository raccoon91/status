import styled from "styled-components/native";
import { styledPosition, styledDimension, styledMargin, styledPadding, styledBorder, styledBackground } from "./styled";

interface IBlockProps extends IPosition, IDimension, IMargin, IPadding, IBorder, IBackground {}

export const Block = styled.View<IBlockProps>`
  ${styledPosition}
  ${styledDimension({ display: "block" })}
  ${styledMargin}
  ${styledPadding}
  ${styledBorder()}
  ${styledBackground()}
`;
