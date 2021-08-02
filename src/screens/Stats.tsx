import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { getStats } from "@src/store/slices/stats";
import { Container } from "@src/components/atoms";
import { StackedBarChart } from "react-native-chart-kit";

const appWidth = Dimensions.get("window").width;

export const StatsScreen = () => {
  const dispatch = useAppDispatch();
  const { fetching, statsData } = useAppSelector((state) => state.stats);

  useEffect(() => {
    if (!fetching) {
      dispatch(getStats());
    }
  }, [fetching, dispatch]);

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: () => "#000",
    barPercentage: 0.5,
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: "gray",
    },
  };

  return (
    <Container f="1" justify="flex-start" w="100%" p="30px 20px" bgColor="white">
      <StackedBarChart data={statsData} width={appWidth} height={220} hideLegend={false} chartConfig={chartConfig} />
    </Container>
  );
};
