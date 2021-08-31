import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/core";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { Container, ScrollBox, Box, TouchableBox, Text, DecimalNumber, Button, Input } from "@src/components/atoms";
import { getExercises, postExercies } from "@src/store/thunk";
import {
  selectExercise,
  removeExercise,
  changeExercise,
  calculateUpdateStatus,
  clearExerciseState,
} from "@src/store/slices/exercise";
import type { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

const appWidth = Dimensions.get("window").width;

export const ExerciseScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { isFetch, isLoad, isUpdate, exercises, exerciseNames, displayUpdateStatus, updateStatus, enableUpdate } =
    useAppSelector((state) => state.exercise);
  const [toggleExercises, setToggleExercises] = useState(false);

  useEffect(() => {
    if (isUpdate) {
      navigation.navigate("Main");

      return () => {
        dispatch(clearExerciseState());
      };
    }
  }, [isUpdate, navigation, dispatch]);

  useEffect(() => {
    if (!isFetch) {
      dispatch(getExercises());
    }
  }, [isFetch, dispatch]);

  const handleRemoveExercise = (exercise: string) => () => {
    dispatch(removeExercise({ name: exercise }));
    dispatch(calculateUpdateStatus());
  };

  const handleChangeExerciseValue = (name: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text;

    dispatch(changeExercise({ name, value }));
    dispatch(calculateUpdateStatus());
  };

  const handleOpenExercises = () => {
    setToggleExercises(true);
  };

  const handleCloseExercises = () => {
    setToggleExercises(false);
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
    <Container isLoad={isLoad} position="relative" f="1" w="100%" bgColor="white" barTheme="white">
      <ScrollBox f="1" w="100%" p="20px 40px 60px">
        {Object.keys(exercises).map((exerciseName) => (
          <Box key={`e-${exerciseName}`} d="row" justify="flex-start" m="16px 0 0">
            <TouchableBox
              w="30px"
              h="30px"
              m="0 16px 0 0"
              border="1px solid black"
              radius="5px"
              onPress={handleRemoveExercise(exerciseName)}
            >
              <Icon name="minus" color="black" size={24} />
            </TouchableBox>
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

        {exerciseNames.length > 0 && Object.keys(exercises).length < 5 ? (
          toggleExercises ? (
            <Button
              w="100%"
              h="40px"
              m="30px 0 0"
              bgColor="#e8e8e8"
              title={<Icon name="x" color="black" size={28} />}
              onPress={handleCloseExercises}
            />
          ) : (
            <Button
              w="100%"
              h="40px"
              m="30px 0 0"
              bgColor="black"
              title={<Icon name="plus" color="white" size={28} />}
              onPress={handleOpenExercises}
            />
          )
        ) : null}

        {toggleExercises ? (
          <Box d="row" wrap="wrap" justify="flex-start" m="20px 0 0">
            {exerciseNames.map((exercise) => (
              <Button
                key={`b-${exercise}`}
                title={exercise}
                align="flex-end"
                m="0 16px 16px 0"
                p="8px"
                radius="5px"
                onPress={handleSelectExercise(exercise)}
              />
            ))}
          </Box>
        ) : null}

        {displayUpdateStatus ? (
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
  );
};
