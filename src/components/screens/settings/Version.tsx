import React, { useState, useEffect } from "react";
import { useAppSelector } from "@src/hooks";
import { Box, Bold, Link } from "@src/components/atoms";
import { DebugStorage } from "@src/components/organisms";
import { ScrollScreenTemplate } from "@src/components/templates";

export const VersionScreen = () => {
  const { version } = useAppSelector((state) => state.user);
  const [countDebugMode, setCountDebugMode] = useState(0);

  useEffect(() => {
    return () => {
      setCountDebugMode(0);
    };
  }, []);

  const handleClickAppName = () => {
    setCountDebugMode((prev) => {
      if (prev < 10) {
        return prev + 1;
      }

      return prev;
    });
  };

  return (
    <ScrollScreenTemplate w="70%" p="30px 10px">
      <Box d="row" justify="space-between">
        <Bold size="sm">App Name</Bold>
        <Bold size="sm" onPress={handleClickAppName}>
          Status
        </Bold>
      </Box>
      <Box d="row" justify="space-between" mt="30px">
        <Bold size="sm">Version</Bold>
        <Bold size="sm">{version}</Bold>
      </Box>
      <Box d="row" justify="space-between" mt="30px">
        <Bold size="sm">Developer</Bold>
        <Bold size="sm">raccoon</Bold>
      </Box>
      <Box d="row" justify="space-between" mt="30px">
        <Bold size="sm">Contact</Bold>
        <Link href="mailto:dev.beomseok@gmail.com">dev.beomseok@gmail.com</Link>
      </Box>

      {countDebugMode >= 10 ? (
        <Box mt="30px">
          <DebugStorage />
        </Box>
      ) : null}
    </ScrollScreenTemplate>
  );
};
