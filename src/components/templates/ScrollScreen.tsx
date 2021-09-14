import React, { FC } from "react";
import { StatusBar } from "react-native";
import { Container, ScrollBox, Loading, Flex, Block } from "@src/components/atoms";

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
            <Flex w="100%" h="50px" bgColor="gray100" mb="16px" radius="3px">
              {banner}
            </Flex>
          )}

          {isLoad ? (
            <Loading w="100%" h="100%" minHeight="300px" />
          ) : (
            <Flex align="stretch" justify="flex-start" w={w || "90%"} minWidth="320px" px="10px" mx="auto">
              {children}
            </Flex>
          )}
        </ScrollBox>

        {floatMenu && floatMenu}

        {bottomButton && (
          <Block position="absolute" left="0" bottom="0" w="100%" h="60px" p="8px">
            {bottomButton}
          </Block>
        )}
      </Container>
    </>
  );
};
