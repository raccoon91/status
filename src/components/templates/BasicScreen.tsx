import React, { FC } from "react";
import { StatusBar } from "react-native";
import { Container, Loading, Box } from "@src/components/atoms";

interface IBasicScreenTemplate {
  barTheme?: string;
  w?: string;
  p?: string;
  bgColor?: IColor;
  isLoad?: boolean;
  children: Element | Element[] | React.ReactChildren | React.ReactElement | React.ReactElement[] | null;
  bottomButton?: React.ReactElement;
}
export const BasicScreenTemplate: FC<IBasicScreenTemplate> = ({
  barTheme,
  w,
  p,
  bgColor,
  isLoad,
  children,
  bottomButton,
}) => {
  return (
    <>
      <StatusBar
        backgroundColor={barTheme === "white" ? "white" : "black"}
        barStyle={barTheme === "white" ? "dark-content" : "light-content"}
      />

      <Container position="relative" pb={bottomButton ? "60px" : "0"} bgColor={bgColor}>
        {isLoad ? (
          <Loading w="100%" h="100%" />
        ) : (
          <Box w={w || "90%"} minWidth="320px" h="100%" p={p || "0 10px"} mx="auto">
            {children}
          </Box>
        )}

        {bottomButton && (
          <Box position="absolute" left="0" bottom="0" w="100%" h="60px" p="8px">
            {bottomButton}
          </Box>
        )}
      </Container>
    </>
  );
};
