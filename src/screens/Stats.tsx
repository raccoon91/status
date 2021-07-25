import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { getStats } from "@src/store/slices/stats";
import { Container, Box, Text } from "@src/components/atoms";

export const StatsScreen = () => {
  const dispatch = useAppDispatch();

  const { fetching, stats } = useAppSelector((state) => state.stats);

  useEffect(() => {
    if (!fetching) {
      dispatch(getStats());
    }
  }, [fetching, dispatch]);

  return (
    <Container f="1" justify="flex-start" w="100%" p="30px 20px" bgColor="white">
      {stats?.length > 0
        ? stats.map((stat, statIndex) => (
            <Box key={`s-${statIndex}`}>
              <Text>{stat.updated}</Text>
              {stat?.status?.length > 0
                ? stat.status.map((item, statusIndex) => (
                    <Box key={`s-${statIndex}-${statusIndex}`} d="row">
                      <Text>{item.name}</Text>
                      <Text>{item.value}</Text>
                    </Box>
                  ))
                : null}
            </Box>
          ))
        : null}
    </Container>
  );
};
