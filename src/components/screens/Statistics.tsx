import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { getExercises } from "@src/store/thunk";
import { selectStatistics } from "@src/store/slices/exercise";
import { StackBarChart } from "@src/charts";
import { Flex, Bold, Text } from "@src/components/atoms";
import { Banner } from "@src/components/organisms";
import { ScrollScreenTemplate } from "@src/components/templates";
import { calculateStatistics } from "@src/utils";
import type { WebViewMessageEvent } from "react-native-webview";

const appWidth = Dimensions.get("window").width;

export const StatisticsScreen = () => {
  const dispatch = useAppDispatch();
  const [labels, setLabels] = useState<string[] | null>(null);
  const [datasets, setDatasets] = useState<IChartData[] | null>(null);
  const { isFetch, isLoad, weekStatistics, selectedStatistics } = useAppSelector((state) => state.exercise);

  useFocusEffect(
    useCallback(() => {
      if (!isFetch) {
        dispatch(getExercises());
      }
    }, [isFetch, dispatch]),
  );

  useFocusEffect(
    useCallback(() => {
      if (weekStatistics?.length > 0) {
        const { chartLabels, chartDatasets } = calculateStatistics(weekStatistics);

        setLabels(chartLabels);
        setDatasets(chartDatasets);
      }
    }, [weekStatistics]),
  );

  const handleClickChart = (event: WebViewMessageEvent) => {
    dispatch(selectStatistics({ chartIndex: event.nativeEvent.data }));
  };

  return (
    <ScrollScreenTemplate isLoad={isLoad} banner={<Banner />}>
      <StackBarChart
        chartLabels={labels}
        chartDatasets={datasets}
        width={appWidth - 40}
        height={280}
        handleClickChart={handleClickChart}
      />

      {selectedStatistics && (
        <>
          <Flex d="row" align="flex-end" justify="flex-start" w="100%" mt="16px">
            <Bold w="100px">Date</Bold>
            <Text>{selectedStatistics.updated}</Text>
          </Flex>

          <Flex d="row" align="flex-start" justify="flex-start" w="100%" mt="20px">
            <Bold w="100px">Exercises</Bold>

            <Flex align="flex-start">
              {selectedStatistics.exercises.map((exercises) => {
                if (exercises.value) {
                  return (
                    <Flex key={`s-e-${exercises.name}`} d="row" justify="flex-start" mb="8px">
                      <Text w="80px">{exercises.name}</Text>
                      <Text>{exercises.value}</Text>
                      <Text ml="8px">{exercises.unit}</Text>
                    </Flex>
                  );
                }
                return null;
              })}
            </Flex>
          </Flex>

          <Flex d="row" align="flex-start" justify="flex-start" w="100%" mt="12px">
            <Bold w="100px">Status</Bold>

            <Flex align="flex-start">
              {selectedStatistics.status.map((stat) => {
                if (stat.value) {
                  return (
                    <Flex key={`s-e-${stat.name}`} d="row" justify="flex-start" mb="8px">
                      <Text w="80px">{stat.name}</Text>
                      <Text>{stat.value / 1000}</Text>
                    </Flex>
                  );
                } else {
                  return null;
                }
              })}
            </Flex>
          </Flex>
        </>
      )}
    </ScrollScreenTemplate>
  );
};
