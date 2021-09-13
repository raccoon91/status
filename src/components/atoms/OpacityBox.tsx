import styled from "styled-components/native";
import { positionCSS, flexCSS, dimensionCSS, paddingCSS, marginCSS, borderCSS, backgroundCSS } from "./css";

interface IOpacityBoxProps
  extends IPositionCSS,
    IFlexCSS,
    IDimensionCSS,
    IMarginCSS,
    IPaddingCSS,
    IBorderCSS,
    IBackgroundCSS,
    ITextCSS {}

export const OpacityBox = styled.TouchableOpacity<IOpacityBoxProps>`
  ${positionCSS}
  ${flexCSS({ d: "row" })}
  ${dimensionCSS({ display: "flex" })}
  ${marginCSS}
  ${paddingCSS}
  ${borderCSS({ radius: "3px" })}
  ${backgroundCSS({ bgColor: "gray100" })}
`;
