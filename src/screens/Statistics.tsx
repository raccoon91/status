import React, { useRef, useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { getStatistics } from "@src/store/slices/statistics";
import { Container } from "@src/components/atoms";
import { StackBarChart, SetChartData } from "@src/charts/StackBarChart";

const appWidth = Dimensions.get("window").width;

export const StatisticsScreen = () => {
  const dispatch = useAppDispatch();
  const [isLoad, setIsLoad] = useState(false);
  const chartDataRef = useRef<SetChartData>(null);
  const { isFetch, statisticsData } = useAppSelector((state) => state.statistics);

  useEffect(() => {
    if (!isFetch) {
      dispatch(getStatistics());
    }
  }, [isFetch, dispatch]);

  useEffect(() => {
    if (isLoad && statisticsData && chartDataRef.current) {
      chartDataRef.current.setData(statisticsData.labels, statisticsData.datasets);
    }
  }, [isLoad, statisticsData, chartDataRef]);

  const chartLoadEnd = () => {
    setIsLoad(true);
  };

  return (
    <Container f="1" justify="flex-start" w="100%" p="30px 20px" bgColor="white">
      <StackBarChart ref={chartDataRef} width={appWidth - 40} height={300} chartLoadEnd={chartLoadEnd} />
    </Container>
  );
};
