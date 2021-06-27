import React, { useState } from "react";
// import { useNavigation } from "@react-navigation/core";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { Dimensions, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Container, ScrollBox, Box, Text, Button, Input } from "@src/components/atoms";
import { selectExercise, updateExercise } from "@src/store/statusSlice";

const appWidth = Dimensions.get("window").width;

export const UpdateStatusScreen = () => {
  // const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { updateList, exerciseList, saveStatus } = useAppSelector((state) => state.status);
  const [toggleExercises, setToggleExercises] = useState(false);

  const handleChangeExerciseValue = (title: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text;

    if (title) {
      dispatch(updateExercise({ title, value }));
    }
  };

  const handleOpenExercises = () => {
    setToggleExercises(true);
  };

  const handleSelectExercise = (exercise: string) => () => {
    dispatch(selectExercise({ name: exercise }));
    setToggleExercises(false);
  };

  const handleSaveUpdate = async () => {
    // dispatch(fetchUpdate());
    // navigation.navigate("Main");
  };

  return (
    <Container position="relative" f="1" w="100%" bgColor="white">
      <ScrollBox f="1" w="100%" p="20px 40px" mb="70px">
        <Text size="20px" weight="bold" w="90px">
          Exercise
        </Text>

        {Object.keys(updateList).map((exercise) => (
          <Box key={`s-${updateList[exercise].name}`} d="row" justify="space-between" m="20px 0 0">
            <Text size="16px" weight="bold">
              {updateList[exercise].name}
            </Text>
            <Input
              keyboardType="numeric"
              w="120px"
              h="40px"
              px="8px"
              onChange={handleChangeExerciseValue(updateList[exercise].name)}
            />
          </Box>
        ))}

        {exerciseList.length > 0 && Object.keys(updateList).length < 5 ? (
          <Button title="+" w="100%" h="40px" m="30px 0 0" onPress={handleOpenExercises} />
        ) : null}

        {toggleExercises ? (
          <Box d="row" wrap="wrap" justify="flex-start" m="30px 0 0">
            {exerciseList.map((exercise) => (
              <Button
                key={`b-${exercise}`}
                title={exercise}
                m="0 8px 12px"
                p="8px"
                radius="5px"
                align="right"
                onPress={handleSelectExercise(exercise)}
              />
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
          active={saveStatus}
          onPress={handleSaveUpdate}
        />
      </Box>
    </Container>
  );
};
