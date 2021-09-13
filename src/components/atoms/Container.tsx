import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { positionCSS, flexCSS, dimensionCSS, marginCSS, paddingCSS, backgroundCSS } from "./css";

interface IContainerStyleProps extends IPositionCSS, IFlexCSS, IDimensionCSS, IMarginCSS, IPaddingCSS, IBackgroundCSS {}

export const Container = styled(SafeAreaView)<IContainerStyleProps>`
  ${positionCSS}
  ${flexCSS({ f: 1, justify: "flex-start" })}
  ${dimensionCSS({ w: "100%" })}
  ${marginCSS}
  ${paddingCSS}
  ${backgroundCSS({ bgColor: "white" })}
`;
