import React, { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { getExercises, postExercies } from "@src/store/thunk";
import {
  selectExercise,
  removeExercise,
  changeExercise,
  calculateUpdateStatus,
  clearExerciseState,
} from "@src/store/slices/exercise";
import { Flex, Bold, Text, DecimalNumber, Button, Input } from "@src/components/atoms";
import { AddExerciseModal } from "@src/components/organisms";
import { ScrollScreenTemplate } from "@src/components/templates";
import { EXERCISES } from "@src/configs/exercises";
import type { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

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
    if (exerciseNames.length < 6) {
      dispatch(selectExercise({ name: exercise }));
    } else {
      Toast.show({ type: "info", text1: "Error", text2: "you can select max 6 exercises" });
    }
  };

  const handleSaveUpdate = () => {
    if (enableUpdate) {
      dispatch(postExercies());
    }
  };

  return (
    <ScrollScreenTemplate
      isLoad={isLoad}
      barTheme="white"
      modal={
        <AddExerciseModal
          show={toggleAddExerciseModal}
          exerciseNames={exerciseNames}
          close={closeAddExerciseModal}
          addExercise={handleSelectExercise}
          removeExercise={handleRemoveExercise}
        />
      }
      bottomButton={
        <Button
          variant={enableUpdate ? "black" : "disabled"}
          size="lg"
          weight="bold"
          w="100%"
          h="100%"
          onPress={handleSaveUpdate}
        >
          SAVE
        </Button>
      }
    >
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
          <Text w="48px" m="10px 0 0 8px">
            {EXERCISES?.[exerciseName]?.unit || ""}
          </Text>
        </Flex>
      ))}

      <Button variant="black" w="100%" h="40px" size="sm" weight="bold" mt="30px" onPress={openAddExerciseModal}>
        Edit Exercise
      </Button>

      {enableUpdate ? (
        <Flex align="flex-start" mt="30px">
          <Bold size="md" mb="10px">
            Status
          </Bold>

          {updateStatus.map((stat) => {
            if (stat.value) {
              return (
                <Flex key={`s-${stat.name}`} d="row" justify="space-between" mt="6px">
                  <Text size="sm" w="80px">
                    {stat.name}
                  </Text>
                  <DecimalNumber number={stat.value / 1000} fontSize="md" fontWeight="normal" />
                </Flex>
              );
            } else {
              return null;
            }
          })}
        </Flex>
      ) : null}
    </ScrollScreenTemplate>
  );
};
