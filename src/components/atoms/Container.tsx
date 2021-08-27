import React, { FC } from "react";
import { StatusBar } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from "./Box";
import { styledPosition, styledFlex, styledDimension, styledMargin, styledPadding } from "./styled";

interface IContainerStyleProps extends IPosition, IFlex, IDimension, IMargin, IPadding {
  bgColor?: string;
}
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
      {!isLoad ? (
        children
      ) : (
        <Box mt="120px">
          <ActivityIndicator size="large" color="black" />
        </Box>
      )}
    </ContainerBox>
  );
};

const ContainerBox = styled(SafeAreaView)<IContainerStyleProps>`
  ${styledPosition}
  ${styledFlex}
  ${styledDimension}
  ${styledMargin}
  ${styledPadding}
  ${({ bgColor }) => bgColor && `background-color: ${bgColor};`}
`;
