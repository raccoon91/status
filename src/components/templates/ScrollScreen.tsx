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
  chart?: React.ReactElement;
  children: Element | Element[] | React.ReactChildren | React.ReactElement | React.ReactElement[] | null;
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
  chart,
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

      <Container position="relative" pb={bottomButton ? "60px" : "0"} bgColor={bgColor}>
        {isLoad ? (
          <Loading w="100%" h="100%" />
        ) : (
          <ScrollBox>
            {banner && (
              <Box w="90%" minWidth="320px" h="60px" bgColor="gray50" m="10px auto" radius="3px">
                {banner}
              </Box>
            )}

            {chart && (
              <Box w="100%" bgColor="red">
                {chart}
              </Box>
            )}

            <Box align="stretch" justify="flex-start" w={w || "90%"} minWidth="320px" p={p || "0 10px"} mx="auto">
              {children}
            </Box>
          </ScrollBox>
        )}

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
