import React, { FC } from "react";
import { StatusBar } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styledPosition, styledFlex, styledDimension, styledMargin, styledPadding, styledBackground } from "./styled";
import { Flex } from "./Flex";

interface IContainerStyleProps extends IPosition, IFlex, IDimension, IMargin, IPadding, IBackground {}
interface IContainerProps extends IContainerStyleProps {
  isLoad?: boolean;
  barTheme?: string;
  children: React.ReactNode;
}

export const Container: FC<IContainerProps> = ({ isLoad, barTheme, children, ...styles }) => {
  return (
    <ContainerBox {...styles}>
      <StatusBar
        backgroundColor={barTheme === "white" ? "white" : "black"}
        barStyle={barTheme === "white" ? "dark-content" : "light-content"}
      />
      {isLoad ? (
        <Flex mt="140px">
          <ActivityIndicator size="large" color="black" />
        </Flex>
      ) : (
        children
      )}
    </ContainerBox>
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
