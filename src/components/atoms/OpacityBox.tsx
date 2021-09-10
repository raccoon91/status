import styled from "styled-components/native";
import {
  styledPosition,
  styledFlex,
  styledDimension,
  styledPadding,
  styledMargin,
  styledBorder,
  styledBackground,
} from "./styled";

interface IOpacityBoxProps extends IPosition, IFlex, IDimension, IMargin, IPadding, IBorder, IBackground, IText {}

export const OpacityBox = styled.TouchableOpacity<IOpacityBoxProps>`
  ${styledPosition}
  ${styledFlex({ d: "row" })}
  ${styledDimension({ display: "flex" })}
  ${styledMargin}
  ${styledPadding}
  ${styledBorder({ radius: "3px" })}
  ${styledBackground({ bgColor: "#f8f8f8" })}
`;
