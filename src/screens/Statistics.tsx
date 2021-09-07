import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { getExercises } from "@src/store/thunk";
import { selectStatistics } from "@src/store/slices/exercise";
import { Container, ScrollBox, Box, Text } from "@src/components/atoms";
import { StackBarChart } from "@src/charts/StackBarChart";
import type { WebViewMessageEvent } from "react-native-webview";

const appWidth = Dimensions.get("window").width;

export const StatisticsScreen = () => {
  const dispatch = useAppDispatch();
  const { isFetch, isLoad, chartLabels, chartDatasets, selectedStatistics } = useAppSelector((state) => state.exercise);

  useFocusEffect(
    useCallback(() => {
      if (!isFetch) {
        dispatch(getExercises());
      }
    }, [isFetch, dispatch]),
  );

  const handleClickChart = (event: WebViewMessageEvent) => {
    dispatch(selectStatistics({ chartIndex: event.nativeEvent.data }));
  };

  return (
    <Container isLoad={isLoad} f="1" justify="flex-start" w="100%" bgColor="white">
      <ScrollBox f="1" w="100%" p="10px 20px">
        <StackBarChart
          chartLabels={chartLabels}
          chartDatasets={chartDatasets}
          width={appWidth - 40}
          height={280}
          handleClickChart={handleClickChart}
        />

        {selectedStatistics && (
          <>
            <Box d="row" align="flex-end" justify="flex-start" w="100%">
              <Text w="100px" size="16px" weight="bold">
                Date
              </Text>
              <Text>{selectedStatistics.updated}</Text>
            </Box>

            <Box d="row" align="flex-start" justify="flex-start" w="100%" mt="20px">
              <Text w="100px" size="16px" weight="bold">
                Exercises
              </Text>

              <Box align="flex-start">
                {selectedStatistics.exercises.map((exercises) => {
                  if (exercises.value) {
                    return (
                      <Box key={`s-e-${exercises.name}`} d="row" justify="flex-start" mb="8px">
                        <Text w="80px">{exercises.name}</Text>
                        <Text>{exercises.value}</Text>
                        <Text mx="8px">{exercises.unit}</Text>
                      </Box>
                    );
                  }
                  return null;
                })}
              </Box>
            </Box>

            <Box d="row" align="flex-start" justify="flex-start" w="100%" mt="12px">
              <Text w="100px" size="16px" weight="bold">
                Status
              </Text>

              <Box align="flex-start">
                {selectedStatistics.status.map((stat) => (
                  <Box key={`s-e-${stat.name}`} d="row" justify="flex-start" mb="8px">
                    <Text w="80px">{stat.name}</Text>
                    <Text>{stat.value / 1000}</Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </>
        )}
      </ScrollBox>
    </Container>
  );
};
