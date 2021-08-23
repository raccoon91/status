import React, { useRef, useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { getStats } from "@src/store/slices/stats";
import { Container } from "@src/components/atoms";
import { StackBarChart, SetChartData } from "@src/charts/StackBarChart";

const appWidth = Dimensions.get("window").width;

export const StatsScreen = () => {
  const dispatch = useAppDispatch();
  const [isLoad, setIsLoad] = useState(false);
  const chartDataRef = useRef<SetChartData>(null);
  const { fetching, statsData } = useAppSelector((state) => state.stats);

  useEffect(() => {
    if (!fetching) {
      dispatch(getStats());
    }
  }, [fetching, dispatch]);

  useEffect(() => {
    if (isLoad && statsData && chartDataRef.current) {
      chartDataRef.current.setData(statsData.labels, statsData.datasets);
    }
  }, [isLoad, statsData, chartDataRef]);

  const chartLoadEnd = () => {
    setIsLoad(true);
  };

  return (
    <Container f="1" justify="flex-start" w="100%" p="30px 20px" bgColor="white">
      <StackBarChart ref={chartDataRef} width={appWidth - 40} height={300} chartLoadEnd={chartLoadEnd} />
    </Container>
  );
};
