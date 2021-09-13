import React, { FC } from "react";
import { StatusBar } from "react-native";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { positionCSS, flexCSS, dimensionCSS, marginCSS, paddingCSS, backgroundCSS } from "./css";

interface IContainerStyleProps extends IPositionCSS, IFlexCSS, IDimensionCSS, IMarginCSS, IPaddingCSS, IBackgroundCSS {}
interface IContainerProps extends IContainerStyleProps {
  barTheme?: string;
  children: React.ReactNode;
}

export const Container: FC<IContainerProps> = ({ barTheme, children, ...styles }) => {
  return (
    <>
      <StatusBar
        backgroundColor={barTheme === "white" ? "white" : "black"}
        barStyle={barTheme === "white" ? "dark-content" : "light-content"}
      />
      <ContainerBox {...styles}>{children}</ContainerBox>
    </>
  );
};

const ContainerBox = styled(SafeAreaView)<IContainerStyleProps>`
  ${positionCSS}
  ${flexCSS({ f: 1, justify: "flex-start" })}
  ${dimensionCSS({ w: "100%" })}
  ${marginCSS}
  ${paddingCSS}
  ${backgroundCSS({ bgColor: "white" })}
`;
