import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/core";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { Dimensions, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Container, ScrollBox, Box, TouchableBox, Text, Button, Input } from "@src/components/atoms";
import {
  selectExercise,
  removeExercise,
  changeExercise,
  calculateUpdateStatus,
  clearExerciseState,
  getExercises,
  postExercies,
} from "@src/store/slices/exercise";

const appWidth = Dimensions.get("window").width;

export const ExerciseScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { isFetch, isUpdate, exercises, exerciseNames, updateStatus, enableUpdate } = useAppSelector(
    (state) => state.exercise,
  );
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
    handleCloseExercises();
  };

  const handleSaveUpdate = async () => {
    if (enableUpdate) {
      dispatch(postExercies());
    }
  };

  return (
    <Container position="relative" f="1" w="100%" bgColor="white">
      <ScrollBox f="1" w="100%" p="20px 40px" mb="60px">
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
              bgColor="black"
              title={<Icon name="x" color="white" size={28} />}
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
          <Box d="row" wrap="wrap" justify="flex-start" m="30px 0 0">
            {exerciseNames.map((exercise) => (
              <Button
                key={`b-${exercise}`}
                title={exercise}
                align="flex-end"
                m="0 8px 12px"
                p="8px"
                radius="5px"
                onPress={handleSelectExercise(exercise)}
              />
            ))}
          </Box>
        ) : null}

        {updateStatus?.length > 0 ? (
          <Box align="flex-start" m="30px 0 0">
            <Text size="20px" weight="bold" mb="10px">
              Status
            </Text>

            {updateStatus.map((stat) => (
              <Box key={`s-${stat.name}`} d="row" justify="space-between" mt="6px">
                <Text size="16px" w="80px">
                  {stat.name}
                </Text>
                <Text size="16px">{stat.value}</Text>
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
