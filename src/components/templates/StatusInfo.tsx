import React from "react";
import Icon from "react-native-vector-icons/Entypo";
import { useAppSelector } from "@src/hooks";
import { Box, Container, ScrollBox, Text } from "@src/components/atoms";
import { ArccodionGroup, Arccodion } from "@src/components/molecules";

export const StatusInfo = () => {
  const { statusInfo } = useAppSelector((state) => state.main);

  return (
    <Container f="1">
      <Text size="26px" weight="bold" mb="30px">
        Status Info
      </Text>

      <ScrollBox w="100%" p="20px 40px">
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
                <Box key={`ei-${statInfo.name}-${exercise}`} d="row" p="8px 16px">
                  <Icon name="dot-single" color="black" size={28} />
                  <Text size="16px" px="4px">
                    {exercise}
                  </Text>
                </Box>
              ))}
            </Arccodion>
          ))}
        </ArccodionGroup>
      </ScrollBox>
    </Container>
  );
};
