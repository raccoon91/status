import styled from "styled-components/native";
import { styledDimension, styledMargin, styledPadding } from "./styled";

interface IScrollBoxProps extends IFlex, IDimension, IMargin, IPadding {
  bgColor?: string;
}

export const ScrollBox = styled.ScrollView<IScrollBoxProps>`
  ${({ f }) => f && `flex: ${f};`}
  ${styledDimension}
  ${styledMargin}
  ${styledPadding}
  ${({ bgColor }) => bgColor && `background-color: ${bgColor};`}
`;
