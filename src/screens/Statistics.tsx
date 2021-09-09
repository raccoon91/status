import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { getExercises } from "@src/store/thunk";
import { selectStatistics } from "@src/store/slices/exercise";
import { Container, ScrollBox, Flex, Bold, Text } from "@src/components/atoms";
import { StackBarChart } from "@src/charts/StackBarChart";
import { BannerAd, BannerAdSize, TestIds } from "@react-native-firebase/admob";
import type { WebViewMessageEvent } from "react-native-webview";
const firebase = require("../../firebase.json");

const appWidth = Dimensions.get("window").width;
const adUnitId = __DEV__ ? TestIds.BANNER : firebase.admob_android_app_id;

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
    <Container isLoad={isLoad} py="10px">
      <ScrollBox px="20px">
        <Flex w="100%" h="50px" bgColor="#f8f8f8" mb="16px" radius="3px">
          <BannerAd unitId={adUnitId} size={BannerAdSize.BANNER} />
        </Flex>

        <StackBarChart
          chartLabels={chartLabels}
          chartDatasets={chartDatasets}
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
      </ScrollBox>
    </Container>
  );
};
