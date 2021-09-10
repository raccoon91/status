import React, { FC } from "react";
import { StatusBar } from "react-native";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styledPosition, styledFlex, styledDimension, styledMargin, styledPadding, styledBackground } from "./styled";

interface IContainerStyleProps extends IPosition, IFlex, IDimension, IMargin, IPadding, IBackground {}
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
  ${styledPosition}
  ${styledFlex({ f: 1, justify: "flex-start" })}
  ${styledDimension({ w: "100%" })}
  ${styledMargin}
  ${styledPadding}
  ${styledBackground({ bgColor: "white" })}
`;
