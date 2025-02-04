import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "@src/hooks";
import { Box, Bold, Text, Button, Feather, ProgressBar } from "@src/components/atoms";
import { Status } from "@src/components/molecules";
import { FloatMenu } from "@src/components/organisms";
import { ScrollScreenTemplate } from "@src/components/templates";
import type { IFloatMenuOption } from "@src/components/organisms";

const floatMenuOptions: IFloatMenuOption = {
  position: { right: "20px", bottom: "30px" },
  mainMenu: { color: "black", iconName: "plus" },
  subMenu: [
    { name: "Update", color: "gray100", iconName: "user-plus", iconColor: "black", to: "Exercise" },
    { name: "Alarm", color: "gray100", iconName: "bell", iconColor: "black", to: "Alarm" },
  ],
};

export const StatusScreen = () => {
  const navigation = useNavigation();
  const { name, level, experience } = useAppSelector((state) => state.user);
  const { isLoad, status } = useAppSelector((state) => state.status);

  const navigateToStatusInfo = () => {
    navigation.navigate("StatusInfo");
  };

  return (
    <ScrollScreenTemplate
      isLoad={isLoad}
      w="80%"
      p="20px 10px 80px"
      floatMenu={<FloatMenu floatMenuOptions={floatMenuOptions} />}
    >
      <Box d="row" justify="space-between" mb="20px">
        <Bold size="lg">{name}</Bold>
        <Bold size="lg">Lv. {level}</Bold>
      </Box>

      <Box align="stretch">
        <Box d="row" justify="space-between">
          <Bold size="sm" mb="12px">
            Exp.
          </Bold>
          <Bold size="sm" mb="12px">
            {Math.floor((experience / 1000) * 100)} %
          </Bold>
        </Box>

        <ProgressBar progress={Math.floor((experience / 1000) * 100)} />
      </Box>

      <Box d="row" justify="flex-end" m="48px 0 24px">
        <Button variant="black" h="32px" px="8px" onPress={navigateToStatusInfo}>
          <Feather name="info" color="white" size={18} />
          <Text size="sm" color="white" ml="6px">
            Status Info
          </Text>
        </Button>
      </Box>

      {status.map((stat) => (
        <Status key={stat.name} name={stat.name} value={stat.value} />
      ))}
    </ScrollScreenTemplate>
  );
};
