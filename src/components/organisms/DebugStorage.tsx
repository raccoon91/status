import React, { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { Box, Bold, Text } from "@src/components/atoms";
import { getAllStorage } from "@src/utils";

export const DebugStorage = () => {
  const [storageUser, setStorageUser] = useState<any | null>(null);
  const [storageStatus, setStorageStatus] = useState<any | null>(null);
  const [storageSchedule, setStorageSchedule] = useState<any | null>(null);
  const [storageStatistics, setStorageStatistics] = useState<{ [key: string]: any }>({});

  const getAllStorageData = async () => {
    try {
      const storage = await getAllStorage();

      const { user, status, schedule, ...statistics } = storage;

      setStorageUser(user || null);
      setStorageStatus(status || null);
      setStorageSchedule(schedule || null);
      setStorageStatistics(statistics || null);
    } catch (err) {
      Toast.show({ type: "erorr", text1: "Storage", text2: "fail to load all storage data" });
    }
  };

  useEffect(() => {
    getAllStorageData();
  }, []);

  return (
    <>
      {storageUser ? (
        <Box d="column" align="flex-start" w="100%" mt="20px">
          <Bold size="sm">User</Bold>
          {Object.keys(storageUser)?.map((dataKey) => (
            <Text key={`user-${dataKey}`} size="xs" mt="3px">
              {`${dataKey}: ${storageUser?.[dataKey]}`}
            </Text>
          ))}
        </Box>
      ) : null}

      {storageStatus ? (
        <Box d="column" align="flex-start" w="100%" mt="20px">
          <Bold size="sm">Status</Bold>
          {storageStatus.map((status: any) => (
            <Text key={`status-${status.name}`} size="xs" mt="3px">
              {`${status.name}: ${status.value}`}
            </Text>
          ))}
        </Box>
      ) : null}

      {storageSchedule ? (
        <Box d="column" align="flex-start" w="100%" mt="20px">
          <Bold size="sm">Schedule</Bold>
          {Object.keys(storageSchedule).map((dataKey) => (
            <Text key={`schedule-${dataKey}`} size="xs" mt="3px">
              {`${dataKey}: ${storageSchedule?.[dataKey]}`}
            </Text>
          ))}
        </Box>
      ) : null}

      {storageStatistics
        ? Object.keys(storageStatistics)?.map((statisticsKey) => (
            <Box key={`${statisticsKey}`} d="column" align="flex-start" w="100%" mt="20px">
              <Bold size="sm">{statisticsKey}</Bold>
              {storageStatistics?.[statisticsKey]?.map((statistics: any, dataIndex: number) => (
                <>
                  <Text key={`${statisticsKey}-${dataIndex}`} size="xs" mt="6px">
                    {`updated: ${statistics?.updated}`}
                  </Text>
                  {Object.keys(statistics.exercises)?.map((exercise: string) => (
                    <Text key={`${statisticsKey}-${dataIndex}-${exercise}`} size="xs">
                      {`${exercise}: ${statistics?.exercises?.[exercise]?.value}`}
                    </Text>
                  )) || <Text size="xs">Empty</Text>}
                </>
              ))}
            </Box>
          ))
        : null}
    </>
  );
};
