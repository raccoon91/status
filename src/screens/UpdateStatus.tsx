import React, { useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Container, ScrollBox, Box, Text, Button, Input } from "@src/components/atoms";
import { ArccodionGroup, Arccodion } from "@src/components/molecules";
import { updateStatus } from "@src/store/statusSlice";

export const UpdateStatusScreen = () => {
  const dispatch = useAppDispatch();
  const { statusInfoList } = useAppSelector((state) => state.status);
  const [contentValue, setContentValue] = useState("");
  const [selectedContent, setSelectedContent] = useState<{ index: number; name: string } | null>(null);

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
        <ArccodionGroup>
          {statusInfoList.map((statusInfo, infoIndex) => (
            <Arccodion
              key={`info-${infoIndex}`}
              arccordionKey={infoIndex + 1}
              title={statusInfo.title}
              right={<Icon name="user-plus" color="black" size={24} />}
              initColor="gray"
              activeColor="black"
            >
              {selectedContent && selectedContent.index === infoIndex ? (
                <Box d="row">
                  <Input
                    autoFocus
                    keyboardType="numeric"
                    p="8px 16px"
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
            </Arccodion>
          ))}
        </ArccodionGroup>
      </ScrollBox>
    </Container>
  );
};
