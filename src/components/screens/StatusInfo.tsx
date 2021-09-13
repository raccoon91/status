import React from "react";
import { useAppSelector } from "@src/hooks";
import { Flex, Text, Feather } from "@src/components/atoms";
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
            initColor="gray"
            activeColor="black"
          >
            {statInfo.exercises.map((exercise) => (
              <Flex key={`ei-${statInfo.name}-${exercise}`} d="row" p="8px 16px">
                <Feather name="chevron-right" color="black" size={28} />
                <Text size="md" pl="4px">
                  {exercise}
                </Text>
              </Flex>
            ))}
          </Arccodion>
        ))}
      </ArccodionGroup>
    </ScrollScreenTemplate>
  );
};
