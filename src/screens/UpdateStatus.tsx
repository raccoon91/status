import React, { useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Container, ScrollBox, Box, Text, Button, Input } from "@src/components/atoms";
import { ArccodionToggle, AccordionHeader, ArccodionCollapse } from "@src/components/molecules";
import { updateStatus } from "@src/store/statusSlice";

export const UpdateStatusScreen = () => {
  const dispatch = useAppDispatch();
  const [contentValue, setContentValue] = useState("");
  const [selectedContent, setSelectedContent] = useState<{ index: number; name: string } | null>(null);
  const { statusInfoList } = useAppSelector((state) => state.status);

  const handlePressContent = (index: number, name: string) => () => {
    setSelectedContent({ index, name });
  };

  const handleChangeContentValue = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text;

    if (value) {
      setContentValue(value);
    }
  };

  const clearSelectedContent = () => {
    setSelectedContent(null);
    setContentValue("");
  };

  const handleSubmitSelectedContent = () => {
    const name = selectedContent?.name;
    const value = Number(contentValue);

    if (name) {
      dispatch(updateStatus({ name, value }));
    }

    clearSelectedContent();
  };

  return (
    <Container f="1" py="30px" bgColor="white">
      <ScrollBox w="100%" p="20px 40px">
        <ArccodionToggle>
          {statusInfoList.map((statusInfo, infoIndex) => (
            <ArccodionCollapse
              key={`info-${infoIndex}`}
              arccordionKey={infoIndex + 1}
              header={
                <AccordionHeader
                  title={statusInfo.title}
                  headerRight={<Icon name="user-plus" color="black" size={24} />}
                />
              }
            >
              {selectedContent && selectedContent.index === infoIndex ? (
                <Box d="row">
                  <Input
                    keyboardType="numeric"
                    w="100%"
                    p="8px 16px"
                    r="5px"
                    value={contentValue}
                    onChange={handleChangeContentValue}
                    onBlur={clearSelectedContent}
                    onSubmitEditing={handleSubmitSelectedContent}
                  />
                </Box>
              ) : (
                <Box d="row">
                  {statusInfo.contents.length !== 0 ? (
                    statusInfo.contents.map((content, contentIndex) => (
                      <Button
                        key={`${statusInfo.title}-${contentIndex}`}
                        mx="10px"
                        p="8px 16px"
                        b="2px solid black"
                        r="5px"
                        onPress={handlePressContent(infoIndex, content.name)}
                      >
                        <Text weight="bold">{content.name}</Text>
                      </Button>
                    ))
                  ) : (
                    <Text>Coming Soon</Text>
                  )}
                </Box>
              )}
            </ArccodionCollapse>
          ))}
        </ArccodionToggle>
      </ScrollBox>
    </Container>
  );
};
