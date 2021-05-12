import React from "react";
import { Container, ScrollBox, Text } from "@src/atoms";
import { ArccodionToggle, AccordionHeader, ArccodionCollapse } from "@src/molecules";

export const StatusInfoPage = () => {
  return (
    <Container f="1">
      <Text size="26px" weight="bold" mb="30px">
        Status Info
      </Text>

      <ScrollBox w="100%" p="20px 40px">
        <ArccodionToggle>
          <ArccodionCollapse arccordionKey={1} header={<AccordionHeader text="Hit Point" />}>
            <Text size="16px" mb="5px">
              push up
            </Text>
            <Text size="16px">bench press</Text>
          </ArccodionCollapse>

          <ArccodionCollapse arccordionKey={2} header={<AccordionHeader text="Strength" />}>
            <Text size="16px" mb="5px">
              push up
            </Text>
            <Text size="16px">bench press</Text>
          </ArccodionCollapse>

          <ArccodionCollapse arccordionKey={3} header={<AccordionHeader text="Agility" />}>
            <Text size="16px" mb="5px">
              push up
            </Text>
            <Text size="16px">bench press</Text>
          </ArccodionCollapse>

          <ArccodionCollapse arccordionKey={4} header={<AccordionHeader text="Stamina" />}>
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
