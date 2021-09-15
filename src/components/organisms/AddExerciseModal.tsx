import React, { FC } from "react";
import Modal from "react-native-modal";
import { Box, Bold, Text, Button, ScrollBox, Feather } from "@src/components/atoms";
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
    <Modal isVisible={show} backdropTransitionOutTiming={0} onBackdropPress={close} onBackButtonPress={close}>
      <Box w="100%" h="100%">
        <Box
          justify="flex-start"
          align="flex-start"
          w="80%"
          minWidth="300px"
          minHeight="150px"
          p="20px 30px"
          bgColor="white"
          border="1px solid #e8e8e8"
          radius="5px"
        >
          <Bold size="xl">Add Exercise</Bold>

          <Box d="row" wrap="wrap" justify="flex-start" w="100%" mt="20px">
            {exerciseNames.map((exerciseName) => (
              <Button
                key={`s-${exerciseName}`}
                variant="black"
                h="24px"
                px="6px"
                m="0 2px 4px"
                onPress={removeExercise(exerciseName)}
              >
                <Text color="white" mr="4px">
                  {exerciseName}
                </Text>
                <Feather name="x" color="white" size={12} />
              </Button>
            ))}
          </Box>

          <ScrollBox h="40%" mt="20px">
            {EXERCISE_NAMES.map((exerciseName) => {
              if (exerciseNames.includes(exerciseName)) {
                return (
                  <Button
                    key={`l-${exerciseName}`}
                    variant="black"
                    w="100%"
                    h="40px"
                    my="3px"
                    size="md"
                    weight="bold"
                    onPress={removeExercise(exerciseName)}
                  >
                    {exerciseName}
                  </Button>
                );
              } else {
                return (
                  <Button
                    key={`l-${exerciseName}`}
                    variant="outline-black"
                    w="100%"
                    h="40px"
                    my="3px"
                    size="md"
                    weight="bold"
                    onPress={addExercise(exerciseName)}
                  >
                    {exerciseName}
                  </Button>
                );
              }
            })}
          </ScrollBox>

          <Button variant="black" w="100%" h="36px" px="12px" mt="30px" weight="bold" onPress={close}>
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
