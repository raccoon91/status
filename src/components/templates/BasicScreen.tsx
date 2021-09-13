import React, { FC } from "react";
import { StatusBar } from "react-native";
import { Container, Loading, Flex, Block } from "@src/components/atoms";

interface IBasicScreenTemplate {
  barTheme?: string;
  bgColor?: IColor;
  banner?: React.ReactElement;
  isLoad?: boolean;
  children: Element | Element[] | React.ReactChildren | React.ReactElement | React.ReactElement[];
  bottomButton?: React.ReactElement;
}
export const BasicScreenTemplate: FC<IBasicScreenTemplate> = ({
  barTheme,
  bgColor,
  banner,
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

      <Container position="relative" p={bottomButton ? "20px 0 60px" : "20px"} bgColor={bgColor}>
        {banner && (
          <Flex w="100%" h="50px" bgColor="gray100" mb="16px" radius="3px">
            {banner}
          </Flex>
        )}

        {isLoad ? (
          <Loading w="100%" h="100%" minHeight="300px" />
        ) : (
          <Flex f="1" w="90%" minWidth="320px" px="10px" mx="auto">
            {children}
          </Flex>
        )}

        {bottomButton && (
          <Block position="absolute" left="0" bottom="0" w="100%" h="60px" p="8px">
            {bottomButton}
          </Block>
        )}
      </Container>
    </>
  );
};
