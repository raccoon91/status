import React, { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { getExercises, postExercies } from "@src/store/thunk";
import {
  selectExercise,
  removeExercise,
  changeExercise,
  calculateUpdateStatus,
  clearExerciseState,
} from "@src/store/slices/exercise";
import { Container, ScrollBox, Flex, Block, Bold, Text, DecimalNumber, Button, Input } from "@src/components/atoms";
import { AddExerciseModal } from "@src/components/templates";
import { EXERCISES } from "@src/configs/exercises";
import type { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

const appWidth = Dimensions.get("window").width;

export const ExerciseScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { isFetch, isLoad, isUpdate, exercises, exerciseNames, updateStatus, enableUpdate } = useAppSelector(
    (state) => state.exercise,
  );
  const [toggleAddExerciseModal, setToggleAddExerciseModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (isUpdate) {
        navigation.navigate("Statistics");

        return () => {
          dispatch(clearExerciseState());
        };
      }
    }, [isUpdate, navigation, dispatch]),
  );

  useFocusEffect(
    useCallback(() => {
      if (!isFetch) {
        dispatch(getExercises());
      }
    }, [isFetch, dispatch]),
  );

  const openAddExerciseModal = () => {
    setToggleAddExerciseModal(true);
  };

  const closeAddExerciseModal = () => {
    setToggleAddExerciseModal(false);
  };

  const handleRemoveExercise = (exercise: string) => () => {
    dispatch(removeExercise({ name: exercise }));
    dispatch(calculateUpdateStatus());
  };

  const handleChangeExerciseValue = (name: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text;

    dispatch(changeExercise({ name, value }));
    dispatch(calculateUpdateStatus());
  };

  const handleSelectExercise = (exercise: string) => () => {
    dispatch(selectExercise({ name: exercise }));
  };

  const handleSaveUpdate = () => {
    if (enableUpdate) {
      dispatch(postExercies());
    }
  };

  return (
    <>
      <AddExerciseModal
        show={toggleAddExerciseModal}
        exerciseNames={exerciseNames}
        close={closeAddExerciseModal}
        addExercise={handleSelectExercise}
        removeExercise={handleRemoveExercise}
      />

      <Container isLoad={isLoad} position="relative" barTheme="white">
        <ScrollBox p="20px 40px 60px">
          {Object.keys(exercises).map((exerciseName) => (
            <Flex key={`e-${exerciseName}`} d="row" justify="flex-start" mt="16px">
              <Bold>{exerciseName}</Bold>
              <Input
                keyboardType="numeric"
                w="120px"
                h="40px"
                px="8px"
                ml="auto"
                value={exercises[exerciseName].value}
                onChange={handleChangeExerciseValue(exerciseName)}
              />
              <Text w="36px" m="10px 0 0 4px">
                {EXERCISES?.[exerciseName]?.unit || ""}
              </Text>
            </Flex>
          ))}

          <Button variant="black" w="100%" h="40px" size="16px" weight="bold" mt="30px" onPress={openAddExerciseModal}>
            Edit Exercise
          </Button>

          {enableUpdate ? (
            <Flex align="flex-start" mt="30px">
              <Bold size="20px" mb="10px">
                Status
              </Bold>

              {updateStatus.map((stat) => (
                <Flex key={`s-${stat.name}`} d="row" justify="space-between" mt="6px">
                  <Text size="16px" w="80px">
                    {stat.name}
                  </Text>
                  <DecimalNumber number={stat.value / 1000} fontSize="16px" fontWeight="normal" />
                </Flex>
              ))}
            </Flex>
          ) : null}
        </ScrollBox>

        <Block position="absolute" left="0" bottom="0" w="100%" h="60px" p="8px">
          <Button
            variant={enableUpdate ? "black" : "disabled"}
            size="18px"
            weight="bold"
            w={`${appWidth - 16}px`}
            h="100%"
            onPress={handleSaveUpdate}
          >
            SAVE
          </Button>
        </Block>
      </Container>
    </>
  );
};
