import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { Dimensions, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Container, ScrollBox, Box, Text, Button, Input } from "@src/components/atoms";
import { updateStatus, updateExercise } from "@src/store/statusSlice";
import { mapStatusWithExercise } from "@src/config";

const appWidth = Dimensions.get("window").width;

export const UpdateStatusScreen = () => {
  const dispatch = useAppDispatch();
  const { statusList, updateList } = useAppSelector((state) => state.status);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const handleSelectStatus = (title: string) => () => {
    if (title === selectedStatus) {
      setSelectedStatus(null);
    } else {
      setSelectedStatus(title);
    }
  };

  const handleSelectExercise = (title: string, exercise: string) => () => {
    if (title && exercise) {
      dispatch(updateStatus({ title, exercise }));
    }
  };

  const handleChangeExerciseValue = (title: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text;

    if (title && value) {
      dispatch(updateExercise({ title, value }));
    }
  };

  return (
    <Container position="relative" f="1" w="100%" bgColor="white">
      <ScrollBox f="1" w="100%" p="20px 40px" mb="70px">
        <Box d="row" justify="flex-start" m="20px 0 30px">
          <Text size="20px" weight="bold" w="100px">
            Status
          </Text>
          <Text size="20px" weight="bold" w="90px">
            Exercise
          </Text>
          <Text size="20px" weight="bold" m="0 0 0 20px">
            Amount
          </Text>
        </Box>

        {statusList.map((status) => (
          <Box key={`u-${status.title}`} d="row" justify="flex-start" mb="20px">
            <Text w="100px" size="16px" weight="bold">
              {status.title}
            </Text>

            {updateList?.[status.title]?.exercise ? (
              <Button
                w="90px"
                h="40px"
                size="16px"
                active={true}
                title={updateList?.[status.title]?.exercise}
                onPress={handleSelectStatus(status.title)}
              />
            ) : (
              <Button w="90px" h="40px" title="select" onPress={handleSelectStatus(status.title)} />
            )}

            <Box f="1" m="0 0 0 20px">
              <Input keyboardType="numeric" h="40px" onChange={handleChangeExerciseValue(status.title)} />
            </Box>
          </Box>
        ))}

        {selectedStatus ? (
          <>
            <Text size="20px" weight="bold" my="20px">
              {selectedStatus} Exercise
            </Text>
            <Box d="row" wrap="wrap" justify="flex-start">
              {mapStatusWithExercise[selectedStatus].map((exercise) => (
                <Button
                  key={`e-${selectedStatus}-${exercise}`}
                  title={exercise}
                  m="0 8px 12px"
                  p="8px"
                  radius="5px"
                  active={exercise === updateList?.[selectedStatus]?.exercise}
                  onPress={handleSelectExercise(selectedStatus, exercise)}
                />
              ))}
            </Box>
          </>
        ) : null}
      </ScrollBox>

      <Box position="absolute" left="0" bottom="0" w="100%" h="60px" p="8px">
        <Button w={`${appWidth - 16}px`} h="100%" size="18px" weight="bold" title="SAVE" />
      </Box>
    </Container>
  );
};
