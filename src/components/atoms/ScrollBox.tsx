import styled from "styled-components/native";
import { styledDimension, styledMargin, styledPadding, styledBackground } from "./styled";

interface IScrollBoxProps extends IFlex, IDimension, IMargin, IPadding, IBackground {}

export const ScrollBox = styled.ScrollView<IScrollBoxProps>`
  ${styledDimension({ w: "100%", h: "100%" })}
  ${styledMargin}
  ${styledPadding}
  ${styledBackground()}
`;
