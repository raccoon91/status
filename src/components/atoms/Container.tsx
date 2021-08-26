import React, { FC } from "react";
import { StatusBar } from "react-native";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styledPosition, styledFlex, styledDimension, styledMargin, styledPadding } from "./styled";

interface IContainerStyleProps extends IPosition, IFlex, IDimension, IMargin, IPadding {
  bgColor?: string;
}
interface IContainerProps extends IContainerStyleProps {
  children: React.ReactNode;
}

export const Container: FC<IContainerProps> = ({ children, ...styles }) => {
  return (
    <ContainerBox {...styles}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {children}
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
