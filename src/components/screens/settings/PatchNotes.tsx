import React from "react";
import { Box, Text } from "@src/components/atoms";
import { ArccodionGroup, Arccodion } from "@src/components/molecules";
import { ScrollScreenTemplate } from "@src/components/templates";
import { patchNotes } from "@src/configs";

export const PatchNotesScreen = () => {
  return (
    <ScrollScreenTemplate w="90%" p="20px 10px">
      <ArccodionGroup>
        {patchNotes.map((patchNote, index) => (
          <Arccodion
            key={`pn-${patchNote.title}`}
            arccordionKey={index + 1}
            title={patchNote.title}
            initColor="gray400"
            activeColor="black"
          >
            <Box align="flex-start" w="100%" p="8px 4px">
              {patchNote?.description?.split("\n").map((text: any, textIndex) => (
                <Text key={`pnt-${textIndex}`} size="sm" line="24px">
                  {text}
                </Text>
              ))}
              <Box align="flex-end" w="100%" mt="8px">
                <Text size="xs" color="gray400">
                  {patchNote?.date}
                </Text>
              </Box>
            </Box>
          </Arccodion>
        ))}
      </ArccodionGroup>
    </ScrollScreenTemplate>
  );
};
