import React, { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useAppSelector } from "@src/hooks";
import { Box, Bold, Text, Button, Feather } from "@src/components/atoms";
import { Status } from "@src/components/molecules";
import { FloatMenu, ExitAppModal } from "@src/components/organisms";
import { ScrollScreenTemplate } from "@src/components/templates";

const floatMenuOptions = {
  position: { right: "20px", bottom: "30px" },
  mainMenu: { color: "black", iconName: "plus" },
  subMenu: [
    { name: "Update", color: "gray100", iconName: "user-plus", iconColor: "black", to: "Exercise" },
    { name: "Alarm", color: "gray100", iconName: "bell", iconColor: "black", to: "Alarm" },
  ],
};

export const StatusScreen = () => {
  const navigation = useNavigation();
  const [exitApp, setExitApp] = useState(0);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenExitAppModal, setIsOpenExitAppModal] = useState(false);
  const { name, level, experience, requiredExperience } = useAppSelector((state) => state.user);
  const { isLoad, status } = useAppSelector((state) => state.status);

  const handleBackButton = useCallback(() => {
    if (isOpenMenu) {
      return false;
    }

    setTimeout(() => {
      setExitApp(0);
    }, 1000);

    if (exitApp === 0) {
      setExitApp(exitApp + 1);
    } else if (exitApp === 1) {
      handleOpenExitAppModal();
    }

    return true;
  }, [exitApp, isOpenMenu, setExitApp]);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
      };
    }, [handleBackButton]),
  );

  const goToStatusInfo = () => {
    navigation.navigate("StatusInfo");
  };

  const handleOpenMenu = () => {
    setIsOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setIsOpenMenu(false);
  };

  const handleOpenExitAppModal = () => {
    setIsOpenExitAppModal(true);
  };

  const handleCloseExitAppModal = () => {
    setIsOpenExitAppModal(false);
  };

  const handleExitApp = () => {
    BackHandler.exitApp();
  };

  return (
    <ScrollScreenTemplate
      isLoad={!name || isLoad}
      w="80%"
      p="20px 10px 80px"
      modal={<ExitAppModal show={isOpenExitAppModal} close={handleCloseExitAppModal} exit={handleExitApp} />}
      floatMenu={
        <FloatMenu
          show={isOpenMenu}
          open={handleOpenMenu}
          close={handleCloseMenu}
          floatMenuOptions={floatMenuOptions}
        />
      }
    >
      <Box d="row" justify="space-between" w="100%" mb="20px">
        <Bold size="lg">{name}</Bold>
        <Bold size="lg">Lv. {level}</Bold>
      </Box>

      <Box align="stretch" w="100%">
        <Box d="row" justify="space-between">
          <Bold size="sm" mb="12px">
            Exp.
          </Bold>
          <Bold size="sm" mb="12px">
            {Math.floor((experience / requiredExperience) * 100)} %
          </Bold>
        </Box>

        <ProgressBar progress={experience / requiredExperience} color="#000000" />
      </Box>

      <Box d="row" justify="flex-end" w="100%" m="36px 0 24px">
        <Button variant="black" h="28px" px="8px" onPress={goToStatusInfo}>
          <Feather name="info" color="white" size={16} />
          <Text size="xs" color="white" ml="6px">
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
