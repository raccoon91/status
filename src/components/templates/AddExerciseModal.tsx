import React, { FC } from "react";
import { Modal } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Box, Text, OpacityBox, ScrollBox } from "@src/components/atoms";
import { EXERCISE_NAMES } from "@src/configs";

interface IAddExerciseModalProps {
  show: boolean;
  exerciseNames: string[];
  close: () => void;
  addExercise: (exerciseName: string) => () => void;
  removeExercise: (exerciseName: string) => () => void;
}
export const AddExerciseModal: FC<IAddExerciseModalProps> = ({
  show,
  exerciseNames,
  close,
  addExercise,
  removeExercise,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={show} onRequestClose={close}>
      <Box w="100%" h="100%">
        <Box
          align="flex-start"
          justify="flex-start"
          w="50%"
          minWidth="300px"
          minHeight="150px"
          p="20px 30px"
          bgColor="white"
          border="1px solid #e8e8e8"
          radius="5px"
        >
          <Text size="20px" weight="bold">
            Add Exercise
          </Text>

          <Box d="row" wrap="wrap" justify="flex-start" w="100%" mt="20px">
            {exerciseNames.map((exerciseName) => (
              <OpacityBox
                key={`s-${exerciseName}`}
                p="2px 4px 2px 6px"
                m="0 2px 4px"
                bgColor="black"
                radius="3px"
                onPress={removeExercise(exerciseName)}
              >
                <Text color="white" m="0 4px 0 0">
                  {exerciseName}
                </Text>
                <Icon name="x" color="white" size={12} />
              </OpacityBox>
            ))}
          </Box>

          <ScrollBox w="100%" maxHeight="240px" mt="20px">
            {EXERCISE_NAMES.map((exerciseName) => {
              if (exerciseNames.includes(exerciseName)) {
                return (
                  <OpacityBox
                    key={`l-${exerciseName}`}
                    w="100%"
                    h="40px"
                    p="0"
                    my="3px"
                    bgColor="black"
                    onPress={removeExercise(exerciseName)}
                  >
                    <Text color="white" weight="bold">
                      {exerciseName}
                    </Text>
                  </OpacityBox>
                );
              } else {
                return (
                  <OpacityBox
                    key={`l-${exerciseName}`}
                    w="100%"
                    h="40px"
                    p="0"
                    my="3px"
                    onPress={addExercise(exerciseName)}
                  >
                    <Text color="black" weight="bold">
                      {exerciseName}
                    </Text>
                  </OpacityBox>
                );
              }
            })}
          </ScrollBox>

          <Box d="row" justify="flex-end" w="100%" mt="30px">
            <Text color="blue" weight="bold" onPress={close}>
              OK
            </Text>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
