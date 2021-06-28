import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/core";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { Dimensions, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Container, ScrollBox, Box, TouchableBox, Text, Button, Input } from "@src/components/atoms";
import { selectExercise, removeExercise, updateExercise, getUpdateList, postUpdateList } from "@src/store/statusSlice";
import { exercises } from "@src/config";

const appWidth = Dimensions.get("window").width;

export const UpdateStatusScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { updateList, exerciseList, saveStatus } = useAppSelector((state) => state.status);
  const [toggleExercises, setToggleExercises] = useState(false);

  useEffect(() => {
    dispatch(getUpdateList());
  }, [dispatch]);

  const handleRemoveExercise = (exercise: string) => () => {
    dispatch(removeExercise({ name: exercise }));
  };

  const handleChangeExerciseValue = (name: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text;

    if (name) {
      dispatch(updateExercise({ name, value }));
    }
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
    dispatch(postUpdateList());
    navigation.navigate("Main");
  };

  return (
    <Container position="relative" f="1" w="100%" bgColor="white">
      <ScrollBox f="1" w="100%" p="20px 40px" mb="70px">
        <Text size="20px" weight="bold" w="90px">
          Exercise
        </Text>

        {Object.keys(updateList).map((exercise) => (
          <Box key={`s-${updateList[exercise].name}`} d="row" justify="flex-start" m="20px 0 0">
            <TouchableBox
              w="30px"
              h="30px"
              m="0 16px 0 0"
              border="1px solid black"
              radius="5px"
              onPress={handleRemoveExercise(exercise)}
            >
              <Icon name="minus" color="black" size={24} />
            </TouchableBox>
            <Text size="16px" weight="bold">
              {updateList[exercise].name}
            </Text>
            <Input
              keyboardType="numeric"
              w="120px"
              h="40px"
              px="8px"
              m="0 0 0 auto"
              onChange={handleChangeExerciseValue(updateList[exercise].name)}
            />
            {exercises?.[exercise]?.unit ? (
              <Text w="36px" m="10px 0 0 4px">
                {exercises[exercise].unit}
              </Text>
            ) : null}
          </Box>
        ))}

        {exerciseList.length > 0 && Object.keys(updateList).length < 5 ? (
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
            {exerciseList.map((exercise) => (
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

        {saveStatus ? (
          <Box align="flex-start" m="30px 0 0">
            <Text size="20px" weight="bold">
              Status
            </Text>

            {Object.values(updateList).map((update) => {
              if (update.value) {
                return (
                  <Box key={`s-${update.name}`} d="row" justify="space-between">
                    <Text>{exercises[update.name].status}</Text>
                    <Text>{Number(update.value) * exercises[update.name].rate}</Text>
                  </Box>
                );
              }

              return null;
            })}
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
          active={saveStatus}
          onPress={handleSaveUpdate}
        />
      </Box>
    </Container>
  );
};
