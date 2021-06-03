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
  const [selectedContent, setSelectedContent] = useState<{ title: string; name: string } | null>(null);

  const handlePressContent = (title: string, name: string) => () => {
    if (title === selectedContent?.title && name === selectedContent?.name) {
      setSelectedContent(null);
    } else {
      setSelectedContent({ title, name });
    }
  };

  const handleChangeContentValue = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setContentValue(e.nativeEvent.text);
  };

  const clearSelectedContent = () => {
    setSelectedContent(null);
    setContentValue("");
  };

  const handleSubmitSelectedContent = () => {
    const name = selectedContent?.name;
    const value = Number(contentValue);

    if (name && value) {
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
              <Box d="row">
                {statusInfo.contents.length !== 0 ? (
                  statusInfo.contents.map((contentName, contentIndex) => (
                    <Button
                      key={`${statusInfo.title}-${contentIndex}`}
                      mx="10px"
                      p="8px 16px"
                      selected={
                        selectedContent &&
                        selectedContent.title === statusInfo.title &&
                        selectedContent.name === contentName
                      }
                      title={contentName}
                      onPress={handlePressContent(statusInfo.title, contentName)}
                    />
                  ))
                ) : (
                  <Text>Coming Soon</Text>
                )}
              </Box>
              {selectedContent ? (
                <Box d="row" p="8px 8px 0">
                  <Input
                    autoFocus
                    keyboardType="numeric"
                    p="8px 16px"
                    value={contentValue}
                    onChange={handleChangeContentValue}
                    onSubmitEditing={handleSubmitSelectedContent}
                  />
                </Box>
              ) : null}
            </Arccodion>
          ))}
        </ArccodionGroup>
      </ScrollBox>
    </Container>
  );
};
