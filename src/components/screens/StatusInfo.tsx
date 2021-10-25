import React from "react";
import { useAppSelector } from "@src/hooks";
import { Box, Text, Bold } from "@src/components/atoms";
import { ArccodionGroup, Arccodion } from "@src/components/molecules";
import { Banner } from "@src/components/organisms";
import { ScrollScreenTemplate } from "@src/components/templates";
import { fixedNumber } from "@src/utils";

export const StatusInfoScreen = () => {
  const { statusInfo } = useAppSelector((state) => state.status);

  return (
    <ScrollScreenTemplate p="10px 10px 20px" banner={<Banner />}>
      <ArccodionGroup>
        {statusInfo.map((statInfo, statusIndex) => (
          <Arccodion
            key={`si-${statInfo.name}`}
            arccordionKey={statusIndex + 1}
            title={statInfo.name}
            initColor="gray400"
            activeColor="black"
          >
            {statInfo.exercises.map((exercise: any, exerciseIndex) => (
              <Box
                key={`ei-${statInfo.name}-${exerciseIndex}`}
                d="row"
                justify="space-between"
                w="100%"
                p="6px 24px 6px 16px"
              >
                <Box d="row">
                  <Bold mr="4px">·</Bold>
                  <Text size="sm" pl="4px">
                    {exercise.name}
                  </Text>
                </Box>
                <Box d="row">
                  <Text size="sm" pl="4px">
                    {fixedNumber(exercise.rate / 1000)}
                  </Text>
                  <Text size="sm" pl="4px">
                    {"/"}
                  </Text>
                  <Text size="sm" pl="4px">
                    {exercise.unit}
                  </Text>
                </Box>
              </Box>
            ))}
          </Arccodion>
        ))}
      </ArccodionGroup>
    </ScrollScreenTemplate>
  );
};
