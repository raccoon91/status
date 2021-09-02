import React, { useRef, useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { getExercises } from "@src/store/thunk";
import { Container } from "@src/components/atoms";
import { StackBarChart, SetChartData } from "@src/charts/StackBarChart";

const appWidth = Dimensions.get("window").width;

export const StatisticsScreen = () => {
  const dispatch = useAppDispatch();
  const chartDataRef = useRef<SetChartData>(null);
  const [isChartMount, setIsChartMount] = useState(false);
  const { isFetch, isLoad, statistics } = useAppSelector((state) => state.exercise);

  useEffect(() => {
    if (!isFetch) {
      dispatch(getExercises());
    }
  }, [isFetch, dispatch]);

  useEffect(() => {
    if (isChartMount && !!statistics && !!chartDataRef?.current?.setChartData) {
      chartDataRef.current.setChartData(statistics.labels, statistics.datasets);

      return () => {
        setIsChartMount(false);
      };
    }
  }, [isChartMount, statistics, chartDataRef]);

  const chartLoadEnd = () => {
    setIsChartMount(true);
  };

  return (
    <Container isLoad={isLoad} f="1" justify="flex-start" w="100%" p="10px 20px" bgColor="white">
      <StackBarChart ref={chartDataRef} width={appWidth - 40} height={300} chartLoadEnd={chartLoadEnd} />
    </Container>
  );
};
