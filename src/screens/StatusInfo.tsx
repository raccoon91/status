import React from "react";
import Icon from "react-native-vector-icons/Entypo";
import { useAppSelector } from "@src/hooks";
import { Flex, Container, ScrollBox, Text } from "@src/components/atoms";
import { ArccodionGroup, Arccodion } from "@src/components/molecules";

export const StatusInfoScreen = () => {
  const { statusInfo } = useAppSelector((state) => state.status);

  return (
    <Container py="20px">
      <ScrollBox px="40px">
        <ArccodionGroup>
          {statusInfo.map((statInfo, index) => (
            <Arccodion
              key={`si-${statInfo.name}`}
              arccordionKey={index + 1}
              title={statInfo.name}
              initColor="gray"
              activeColor="black"
            >
              {statInfo.exercises.map((exercise) => (
                <Flex key={`ei-${statInfo.name}-${exercise}`} d="row" p="8px 16px">
                  <Icon name="dot-single" color="black" size={28} />
                  <Text size="16px" pl="4px">
                    {exercise}
                  </Text>
                </Flex>
              ))}
            </Arccodion>
          ))}
        </ArccodionGroup>
      </ScrollBox>
    </Container>
  );
};
