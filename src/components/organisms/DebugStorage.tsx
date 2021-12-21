import React, { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { Box, Bold, Text } from "@src/components/atoms";
import { getAllStorage } from "@src/utils";

export const DebugStorage = () => {
  const [storageList, setStorageList] = useState<{ key: string; data: any }[]>([]);

  const getAllStorageData = async () => {
    try {
      const allStorageList = await getAllStorage();

      setStorageList(allStorageList);
    } catch (err) {
      Toast.show({ type: "erorr", text1: "Storage", text2: "fail to load all storage data" });
    }
  };

  useEffect(() => {
    getAllStorageData();
  }, []);

  return (
    <>
      {storageList.map((storage) => (
        <Box key={`d-${storage.key}`} d="column" align="flex-start" w="100%" mt="30px">
          <Bold size="sm">{storage.key}</Bold>
          <Text size="xs">{JSON.stringify(storage.data)}</Text>

          {/* {storage.key === "@user"
            ? Object.keys(storage.data).map((dataKey) => (
                <Text key={`d-${storage.key}${dataKey}`} pl="10px">{`${dataKey}: ${storage.data?.[dataKey]}`}</Text>
              ))
            : storage.key === "@status"
            ? storage.data?.map((status: any, index: number) => (
                <Text key={`d-${storage.key}${index}`} pl="10px">
                  {`${status.name}: ${status.value}`}
                </Text>
              ))
            : storage.data?.map((statistics: any, index: number) => (
                <React.Fragment key={`d-${storage.key}${index}`}>
                  <Text pl="10px" mt="6px">{`updated: ${statistics?.updated}`}</Text>
                  {statistics.exercises &&
                    Object.keys(statistics.exercises)?.map((exercise: string) => (
                      <Text pl="10px">{`${exercise}: ${statistics?.exercises?.[exercise]?.value}`}</Text>
                    ))}
                </React.Fragment>
              ))} */}
        </Box>
      ))}
    </>
  );
};
