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
    <Container isLoad={isLoad} f="1" justify="flex-start" w="100%" p="10px 20px" bgColor="white">
      <ScrollBox w="100%">
        <StackBarChart
          chartLabels={chartLabels}
          chartDatasets={chartDatasets}
          width={appWidth - 40}
          height={300}
          handleClickChart={handleClickChart}
        />

        {selectedStatistics && (
          <>
            <Box d="row" align="flex-end" justify="flex-start" w="100%" mt="20px">
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
                {selectedStatistics.exercises.map((exercises) => (
                  <Box key={`s-e-${exercises.name}`} d="row" justify="flex-start" mb="6px">
                    <Text w="80px">{exercises.name}</Text>
                    <Text w="42px" align="right">
                      {exercises.value}
                    </Text>
                    <Text mx="8px">{exercises.unit}</Text>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box d="row" align="flex-start" justify="flex-start" w="100%" mt="10px">
              <Text w="100px" size="16px" weight="bold">
                Status
              </Text>

              <Box align="flex-start">
                {selectedStatistics.status.map((stat) => (
                  <Box key={`s-e-${stat.name}`} d="row" justify="flex-start" mb="6px">
                    <Text w="80px">{stat.name}</Text>
                    <Text w="42px" align="right">
                      {stat.value / 1000}
                    </Text>
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
