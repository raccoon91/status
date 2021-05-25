import React from "react";
import { Container, ScrollBox, Text } from "@src/components/atoms";
import { ArccodionToggle, AccordionHeader, ArccodionCollapse } from "@src/components/molecules";

export const StatusInfo = () => {
  return (
    <Container f="1">
      <Text size="26px" weight="bold" mb="30px">
        Status Info
      </Text>

      <ScrollBox w="100%" p="20px 40px">
        <ArccodionToggle>
          <ArccodionCollapse arccordionKey={1} header={<AccordionHeader title="Hit Point" />}>
            <Text size="16px" mb="5px">
              push up
            </Text>
            <Text size="16px">bench press</Text>
          </ArccodionCollapse>

          <ArccodionCollapse arccordionKey={2} header={<AccordionHeader title="Strength" />}>
            <Text size="16px" mb="5px">
              push up
            </Text>
            <Text size="16px">bench press</Text>
          </ArccodionCollapse>

          <ArccodionCollapse arccordionKey={3} header={<AccordionHeader title="Agility" />}>
            <Text size="16px" mb="5px">
              push up
            </Text>
            <Text size="16px">bench press</Text>
          </ArccodionCollapse>

          <ArccodionCollapse arccordionKey={4} header={<AccordionHeader title="Stamina" />}>
            <Text size="16px" mb="5px">
              push up
            </Text>
            <Text size="16px">bench press</Text>
          </ArccodionCollapse>
        </ArccodionToggle>
      </ScrollBox>
    </Container>
  );
};
