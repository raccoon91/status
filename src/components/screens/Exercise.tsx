import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { getExercises, postExercies } from "@src/store/thunk";
import { selectExercise, removeExercise, changeExercise, calculateUpdateStatus } from "@src/store/slices/exercise";
import { Box, Bold, Text, DecimalNumber, Button, Input } from "@src/components/atoms";
import { AddExerciseModal, Banner } from "@src/components/organisms";
import { ScrollScreenTemplate } from "@src/components/templates";
import { EXERCISES, LIMIT_FREQUENT_UPDATE } from "@src/configs";
import { fixedNumber } from "@src/utils";
import type { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

export const ExerciseScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { isFetch, isLoad, isUpdate, exercises, exerciseNames, updateStatus, enableUpdate, nextUpdate } =
    useAppSelector((state) => state.exercise);
  const [toggleAddExerciseModal, setToggleAddExerciseModal] = useState(false);

  useEffect(() => {
    if (!isFetch) {
      dispatch(getExercises());
    }
  }, [isFetch, dispatch]);

  useEffect(() => {
    if (isUpdate) {
      navigation.navigate("Statistics");
    }
  }, [isUpdate, navigation]);

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
      Toast.show({ type: "info", text1: "Info", text2: "you can select max 6 exercises" });
    }
  };

  const handleSaveUpdate = () => {
    if (enableUpdate) {
      dispatch(postExercies());
    }
  };

  return (
    <ScrollScreenTemplate
      p="0 10px 10px"
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
      banner={<Banner />}
      bottomButton={
        LIMIT_FREQUENT_UPDATE && nextUpdate ? (
          <Button variant="disabled" w="100%" h="100%" size="sm" weight="bold" onPress={handleSaveUpdate}>
            {nextUpdate}
          </Button>
        ) : (
          <Button
            variant={enableUpdate ? "black" : "disabled"}
            w="100%"
            h="100%"
            size="lg"
            weight="bold"
            onPress={handleSaveUpdate}
          >
            SAVE
          </Button>
        )
      }
    >
      {Object.keys(exercises).map((exerciseName) => (
        <Box key={`e-${exerciseName}`} d="row" justify="flex-start" mt="16px">
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
        </Box>
      ))}

      <Button variant="black" h="40px" size="sm" weight="bold" mt="30px" onPress={openAddExerciseModal}>
        Edit Exercise
      </Button>

      {enableUpdate ? (
        <Box align="flex-start" mt="30px">
          <Bold size="md" mb="10px">
            Status
          </Bold>

          {updateStatus.map((stat) => {
            if (stat.value) {
              return (
                <Box key={`s-${stat.name}`} d="row" justify="space-between" mt="6px">
                  <Text size="sm" w="80px">
                    {stat.name}
                  </Text>
                  <DecimalNumber number={fixedNumber(stat.value / 1000, 3)} fontSize="md" fontWeight="normal" />
                </Box>
              );
            } else {
              return null;
            }
          })}
        </Box>
      ) : null}
    </ScrollScreenTemplate>
  );
};
