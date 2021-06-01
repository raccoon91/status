import React from "react";
import Icon from "react-native-vector-icons/Entypo";
import { useAppSelector } from "@src/hooks";
import { Box, Container, ScrollBox, Text } from "@src/components/atoms";
import { ArccodionGroup, Arccodion } from "@src/components/molecules";

export const StatusInfo = () => {
  const { statusInfoList } = useAppSelector((state) => state.status);

  return (
    <Container f="1">
      <Text size="26px" weight="bold" mb="30px">
        Status Info
      </Text>

      <ScrollBox w="100%" p="20px 40px">
        <ArccodionGroup>
          {statusInfoList.map((statusInfo, index) => (
            <Arccodion
              key={`ac-${index}`}
              arccordionKey={index + 1}
              title={statusInfo.title}
              initColor="gray"
              activeColor="black"
            >
              {statusInfo.contents.map((content) => (
                <Box key={`${statusInfo.title}-${content.name}`} d="row" p="8px 16px">
                  <Icon name="dot-single" color="black" size={28} />
                  <Text size="16px" px="4px">
                    {content.name}
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
