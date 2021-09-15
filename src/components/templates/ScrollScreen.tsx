import React, { FC } from "react";
import { StatusBar } from "react-native";
import { Container, ScrollBox, Loading, Box } from "@src/components/atoms";

interface IScrollScreenTemplate {
  barTheme?: string;
  w?: string;
  p?: string;
  bgColor?: IColor;
  modal?: React.ReactElement;
  banner?: React.ReactElement;
  isLoad?: boolean;
  children: Element | Element[] | React.ReactChildren | React.ReactElement | React.ReactElement[];
  floatMenu?: React.ReactElement;
  bottomButton?: React.ReactElement;
}
export const ScrollScreenTemplate: FC<IScrollScreenTemplate> = ({
  barTheme,
  w,
  p,
  bgColor,
  modal,
  banner,
  isLoad,
  children,
  floatMenu,
  bottomButton,
}) => {
  return (
    <>
      <StatusBar
        backgroundColor={barTheme === "white" ? "white" : "black"}
        barStyle={barTheme === "white" ? "dark-content" : "light-content"}
      />

      {modal && modal}

      <Container position="relative" p={p ? p : bottomButton ? "10px 0 60px" : "10px 0"} bgColor={bgColor}>
        <ScrollBox>
          {banner && (
            <Box w="100%" h="50px" bgColor="gray100" mb="16px" radius="3px">
              {banner}
            </Box>
          )}

          {isLoad ? (
            <Loading w="100%" h="100%" minHeight="300px" />
          ) : (
            <Box align="stretch" justify="flex-start" w={w || "90%"} minWidth="320px" px="10px" mx="auto">
              {children}
            </Box>
          )}
        </ScrollBox>

        {floatMenu && floatMenu}

        {bottomButton && (
          <Box position="absolute" left="0" bottom="0" w="100%" h="60px" p="8px">
            {bottomButton}
          </Box>
        )}
      </Container>
    </>
  );
};
