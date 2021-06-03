import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Container, ScrollBox, Box, Text, Button, Input } from "@src/components/atoms";
import { updateStatus, updateExercise } from "@src/store/statusSlice";
import { mapStatusWithExercise } from "@src/config";

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
    <Container f="1" bgColor="white">
      <ScrollBox w="100%" p="20px 40px">
        <Text mb="10px">Status</Text>
        <Box d="row" wrap="wrap" justify="flex-start" mb="30px">
          {statusList.map((status) => (
            <Button
              key={`b-${status.title}`}
              title={status.title}
              m="0 8px 8px"
              p="8px 10px"
              border="none"
              radius="10px"
              bgColor="#e8e8e8"
              activeBgColor="black"
              selected={status.title === selectedStatus}
              onPress={handleSelectStatus(status.title)}
            />
          ))}
        </Box>

        {selectedStatus ? (
          <>
            <Text mb="10px">Exercise</Text>
            <Box d="row" wrap="wrap" justify="flex-start" mb="30px">
              {mapStatusWithExercise[selectedStatus].map((exercise) => (
                <Button
                  key={`e-${selectedStatus}-${exercise}`}
                  title={exercise}
                  m="0 8px 8px"
                  p="8px 10px"
                  border="none"
                  radius="10px"
                  bgColor="#e8e8e8"
                  activeBgColor="black"
                  selected={exercise === updateList?.[selectedStatus]?.exercise}
                  onPress={handleSelectExercise(selectedStatus, exercise)}
                />
              ))}
            </Box>
          </>
        ) : null}

        {Object.values(updateList).map((update) => (
          <Box key={`u-${update.title}`} d="row" justify="flex-start" mb="10px">
            <Text w="100px">{update.title}</Text>
            <Text w="120px">{update.exercise}</Text>

            <Box f="1">
              <Input
                keyboardType="numeric"
                h="40px"
                value={update.value}
                onChange={handleChangeExerciseValue(update.title)}
              />
            </Box>

            <Text m="0 0 0 auto">{update.value}</Text>
          </Box>
        ))}
      </ScrollBox>
    </Container>
  );
};
