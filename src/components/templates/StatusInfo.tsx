import React from "react";
import { useAppSelector } from "@src/hooks";
import { Container, ScrollBox, Text } from "@src/components/atoms";
import { ArccodionToggle, AccordionHeader, ArccodionCollapse } from "@src/components/molecules";

export const StatusInfo = () => {
  const { statusInfoList } = useAppSelector((state) => state.status);

  return (
    <Container f="1">
      <Text size="26px" weight="bold" mb="30px">
        Status Info
      </Text>

      <ScrollBox w="100%" p="20px 40px">
        <ArccodionToggle>
          {statusInfoList.map((statusInfo, index) => (
            <ArccodionCollapse
              key={`ac-${index}`}
              arccordionKey={index + 1}
              header={<AccordionHeader title={statusInfo.title} />}
            >
              <>
                {statusInfo.contents.map((content) => (
                  <Text key={`${statusInfo.title}-${content.name}`} size="16px" mb="5px">
                    {content.name}
                  </Text>
                ))}
              </>
            </ArccodionCollapse>
          ))}
        </ArccodionToggle>
      </ScrollBox>
    </Container>
  );
};
