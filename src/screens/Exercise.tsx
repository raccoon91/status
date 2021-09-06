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
import { Container, ScrollBox, Box, Text, DecimalNumber, Button, Input, OpacityBox } from "@src/components/atoms";
import { AddExerciseModal } from "@src/components/templates";
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

  const handleSaveUpdate = async () => {
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

      <Container isLoad={isLoad} position="relative" f="1" w="100%" bgColor="white" barTheme="white">
        <ScrollBox f="1" w="100%" p="20px 40px 60px">
          {Object.keys(exercises).map((exerciseName) => (
            <Box key={`e-${exerciseName}`} d="row" justify="flex-start" m="16px 0 0">
              <Text size="16px" weight="bold">
                {exerciseName}
              </Text>
              <Input
                keyboardType="numeric"
                w="120px"
                h="40px"
                px="8px"
                m="0 0 0 auto"
                value={exercises[exerciseName].value}
                onChange={handleChangeExerciseValue(exerciseName)}
              />
              <Text w="36px" m="10px 0 0 4px">
                {exercises?.[exerciseName]?.unit || ""}
              </Text>
            </Box>
          ))}

          <OpacityBox w="100%" h="40px" m="30px 0 0" p="0" bgColor="black" onPress={openAddExerciseModal}>
            <Text size="16px" color="white" weight="bold">
              Edit Exercise
            </Text>
          </OpacityBox>

          {enableUpdate ? (
            <Box align="flex-start" m="30px 0 0">
              <Text size="20px" weight="bold" mb="10px">
                Status
              </Text>

              {updateStatus.map((stat) => (
                <Box key={`s-${stat.name}`} d="row" justify="space-between" mt="6px">
                  <Text size="16px" w="80px">
                    {stat.name}
                  </Text>
                  <DecimalNumber number={stat.value / 1000} fontSize="16px" fontWeight="normal" />
                </Box>
              ))}
            </Box>
          ) : null}
        </ScrollBox>

        <Box position="absolute" left="0" bottom="0" w="100%" h="60px" p="8px">
          <Button
            title="SAVE"
            size="18px"
            weight="bold"
            w={`${appWidth - 16}px`}
            h="100%"
            active={enableUpdate}
            onPress={handleSaveUpdate}
          />
        </Box>
      </Container>
    </>
  );
};
