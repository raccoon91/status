import styled from "styled-components/native";
import { styledPosition, styledFlex, styledDimension, styledMargin, styledPadding } from "./styled";

interface IContainerProps extends IPosition, IFlex, IDimension, IMargin, IPadding {
  bgColor?: string;
}

export const Container = styled.SafeAreaView<IContainerProps>`
  ${styledPosition}
  ${styledFlex}
  ${styledDimension}
  ${styledMargin}
  ${styledPadding}
  ${({ bgColor }) => bgColor && `background-color: ${bgColor};`}
`;
