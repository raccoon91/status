import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { selectStatistics } from "@src/store/slices/exercise";
import { StackBarChart } from "@src/charts";
import { Box, Bold, Text, DecimalNumber } from "@src/components/atoms";
import { Banner } from "@src/components/organisms";
import { ScrollScreenTemplate } from "@src/components/templates";
import { calculateStatistics } from "@src/utils";
import type { WebViewMessageEvent } from "react-native-webview";

const appWidth = Dimensions.get("window").width;
const appHeight = Dimensions.get("window").height;

export const StatisticsScreen = () => {
  const dispatch = useAppDispatch();
  const [labels, setLabels] = useState<string[] | null>(null);
  const [datasets, setDatasets] = useState<IChartData[] | null>(null);
  const { isLoad, weekStatistics, selectedStatistics } = useAppSelector((state) => state.exercise);

  useEffect(() => {
    if (weekStatistics?.length > 0) {
      const { chartLabels, chartDatasets } = calculateStatistics(weekStatistics);

      dispatch(selectStatistics({ chartIndex: null }));
      setLabels(chartLabels);
      setDatasets(chartDatasets);
    }
  }, [weekStatistics, dispatch]);

  const handleClickChart = (event: WebViewMessageEvent) => {
    const chartIndex = event.nativeEvent.data;

    if (chartIndex) {
      dispatch(selectStatistics({ chartIndex: chartIndex === "null" ? null : chartIndex }));
    }
  };

  return (
    <ScrollScreenTemplate
      isLoad={isLoad}
      banner={<Banner />}
      chart={
        <StackBarChart
          chartLabels={labels}
          chartDatasets={datasets}
          width={appWidth - 20}
          height={Math.ceil(appHeight / 3)}
          handleClickChart={handleClickChart}
        />
      }
    >
      {selectedStatistics ? (
        <>
          <Box d="row" align="flex-end" justify="flex-start" mt="16px">
            <Bold w="100px">Date</Bold>
            <Text>{selectedStatistics.updated}</Text>
          </Box>

          <Box d="row" align="flex-start" justify="flex-start" mt="20px">
            <Bold w="100px">Exercises</Bold>

            <Box align="flex-start">
              {selectedStatistics.exercises.map((exercises) => {
                if (exercises.value) {
                  return (
                    <Box key={`s-e-${exercises.name}`} d="row" justify="flex-start" mb="8px">
                      <Text w="80px">{exercises.name}</Text>
                      <Text>{exercises.value}</Text>
                      <Text ml="8px">{exercises.unit}</Text>
                    </Box>
                  );
                }
                return null;
              })}
            </Box>
          </Box>

          <Box d="row" align="flex-start" justify="flex-start" mt="12px">
            <Bold w="100px">Status</Bold>

            <Box align="flex-start">
              {selectedStatistics.status.map((stat) => {
                if (stat.value) {
                  return (
                    <Box key={`s-e-${stat.name}`} d="row" justify="flex-start" mb="8px">
                      <Text w="80px">{stat.name}</Text>
                      <DecimalNumber fontSize="sm" fontWeight="normal" decimalSize="sm" number={stat.value / 1000} />
                    </Box>
                  );
                } else {
                  return null;
                }
              })}
            </Box>
          </Box>
        </>
      ) : null}
    </ScrollScreenTemplate>
  );
};
