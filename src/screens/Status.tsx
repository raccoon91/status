import React, { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { ProgressBar } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import { useAppSelector } from "@src/hooks";
import { Container, Loading, Block, Flex, Bold, Text, Button } from "@src/components/atoms";
import { Status } from "@src/components/molecules";
import { FloatMenu } from "@src/components/organisms";
import { CloseAppModal } from "@src/components/templates";

const floatMenuOptions = {
  position: { right: "30px", bottom: "30px" },
  mainMenu: { color: "black", iconName: "plus" },
  subMenu: [
    { name: "Update", color: "gray", iconName: "user-plus", to: "Exercise" },
    { name: "Alarm", color: "gray", iconName: "bell", to: "Alarm" },
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
    <>
      <CloseAppModal show={isOpenExitAppModal} close={handleCloseExitAppModal} exit={handleExitApp} />

      <Container position="relative" pt="40px">
        <Loading isLoad={isLoad} w="100%" h="100%">
          <Block w="70%">
            {name?.length > 0 && (
              <>
                <Flex d="row" justify="space-between" w="100%" mb="20px">
                  <Bold size="20px">{name}</Bold>
                  <Bold size="20px">Lv. {level}</Bold>
                </Flex>

                <Flex align="stretch" w="100%">
                  <Flex d="row" justify="space-between">
                    <Bold mb="12px">Exp.</Bold>
                    <Bold mb="12px">{Math.floor((experience / requiredExperience) * 100)} %</Bold>
                  </Flex>

                  <ProgressBar progress={experience / requiredExperience} color="#000000" />
                </Flex>
              </>
            )}

            <Flex d="row" justify="flex-end" w="100%" m="24px 0 20px">
              <Button variant="black" h="28px" px="8px" onPress={goToStatusInfo}>
                <Icon name="info" color="white" size={16} />
                <Text color="white" ml="6px">
                  Status Info
                </Text>
              </Button>
            </Flex>

            {status.map((stat) => (
              <Status key={stat.name} name={stat.name} value={stat.value} />
            ))}
          </Block>
        </Loading>

        <FloatMenu
          show={isOpenMenu}
          open={handleOpenMenu}
          close={handleCloseMenu}
          floatMenuOptions={floatMenuOptions}
        />
      </Container>
    </>
  );
};
