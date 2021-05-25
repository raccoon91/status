import React, { useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { Container, ScrollBox, Box, Text, Button, Input } from "@src/components/atoms";
import { ArccodionToggle, AccordionHeader, ArccodionCollapse } from "@src/components/molecules";

const initialUpdate = [
  {
    name: "Hit Point",
    exersise: [
      { name: "Cycle", point: 1 },
      { name: "Treadmill", point: 1 },
    ],
  },
  {
    name: "Strength",
    exersise: [
      { name: "PushUp", point: 1 },
      { name: "SitUp", point: 1 },
      { name: "PullUp", point: 2 },
    ],
  },
  {
    name: "Agility",
    exersise: [
      { name: "Cycle", point: 1 },
      { name: "Treadmill", point: 1 },
    ],
  },
  {
    name: "Stamina",
    exersise: [
      { name: "Cycle", point: 1 },
      { name: "Treadmill", point: 1 },
    ],
  },
];

export const UpdateStatusScreen = () => {
  const [selectedExercise, setSelectedExercise] = useState<{ index: number; name: string } | null>(null);

  const pressEercise = (index: number, name: string) => () => {
    setSelectedExercise({ index, name });
  };

  const clearSelectedExercise = () => {
    setSelectedExercise(null);
  };

  return (
    <Container f="1" py="30px" bgColor="white">
      <ScrollBox w="100%" p="20px 40px">
        <ArccodionToggle>
          {initialUpdate.map((update, updateIndex) => (
            <ArccodionCollapse
              key={`update-${updateIndex}`}
              arccordionKey={updateIndex + 1}
              header={
                <AccordionHeader title={update.name} headerRight={<Icon name="user-plus" color="black" size={24} />} />
              }
            >
              {selectedExercise && selectedExercise.index === updateIndex ? (
                <Box d="row">
                  <Input
                    w="100%"
                    p="8px 16px"
                    r="5px"
                    onBlur={clearSelectedExercise}
                    onSubmitEditing={() => console.log("submit")}
                  />
                </Box>
              ) : (
                <Box d="row">
                  {update.exersise.length !== 0 ? (
                    update.exersise.map((exercise, exerciseIndex) => (
                      <Button
                        key={`${exercise.name}-${exerciseIndex}`}
                        mx="10px"
                        p="8px 16px"
                        b="2px solid black"
                        r="5px"
                        onPress={pressEercise(updateIndex, exercise.name)}
                      >
                        <Text weight="bold">{exercise.name}</Text>
                      </Button>
                    ))
                  ) : (
                    <Text>Coming Soon</Text>
                  )}
                </Box>
              )}
            </ArccodionCollapse>
          ))}
        </ArccodionToggle>
      </ScrollBox>
    </Container>
  );
};
