import React from "react";
import { useAppSelector } from "@src/hooks";
import { Box, Text, Bold } from "@src/components/atoms";
import { ArccodionGroup, Arccodion } from "@src/components/molecules";
import { ScrollScreenTemplate } from "@src/components/templates";

export const StatusInfoScreen = () => {
  const { statusInfo } = useAppSelector((state) => state.status);

  return (
    <ScrollScreenTemplate>
      <ArccodionGroup>
        {statusInfo.map((statInfo, index) => (
          <Arccodion
            key={`si-${statInfo.name}`}
            arccordionKey={index + 1}
            title={statInfo.name}
            initColor="gray400"
            activeColor="black"
          >
            {statInfo.exercises.map((exercise) => (
              <Box key={`ei-${statInfo.name}-${exercise}`} d="row" p="8px 16px">
                <Bold mr="4px">·</Bold>
                <Text size="sm" pl="4px">
                  {exercise}
                </Text>
              </Box>
            ))}
          </Arccodion>
        ))}
      </ArccodionGroup>
    </ScrollScreenTemplate>
  );
};
