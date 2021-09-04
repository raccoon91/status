import React, { useState, useCallback } from "react";
import { useNavigation, useNavigationState, useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { getUser, getStatus } from "@src/store/thunk";
import { Container, Box, Text } from "@src/components/atoms";
import { Status } from "@src/components/molecules";
import { FloatMenu, BottomSheet } from "@src/components/organisms";
import { StatusInfo, CloseAppModal } from "@src/components/templates";

const floatMenuOptions = {
  position: { right: "20px", bottom: "80px" },
  mainMenu: { color: "black", iconName: "plus" },
  subMenu: [
    { color: "gray", iconName: "user-plus", to: "Exercise" },
    { color: "gray", iconName: "bell", to: "Alarm" },
  ],
};

export const StatusScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const screenName = useNavigationState((state) => state.routes[state.index].name);
  const [toggleCloseAppModal, setToggleCloseAppModal] = useState(false);
  const {
    isFetch: isFetchUser,
    isLoad: isLoadUser,
    name,
    level,
    experience,
    requiredExperience,
  } = useAppSelector((state) => state.user);
  const { isFetch, isLoad, status, statusInfo } = useAppSelector((state) => state.status);

  const openCloseAppModal = useCallback(() => {
    if (screenName === "Status") {
      setToggleCloseAppModal(true);

      return true;
    }

    return false;
  }, [screenName]);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", openCloseAppModal);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", openCloseAppModal);
      };
    }, [openCloseAppModal]),
  );

  useFocusEffect(
    useCallback(() => {
      if (!isFetch) {
        dispatch(getStatus());
      }
    }, [isFetch, dispatch]),
  );

  useFocusEffect(
    useCallback(() => {
      if (!isFetchUser) {
        dispatch(getUser());
      }
    }, [isFetchUser, dispatch]),
  );

  useFocusEffect(
    useCallback(() => {
      if (isFetchUser && !isLoadUser && !name) {
        navigation.reset({ routes: [{ name: "User" }] });
      }
    }, [isFetchUser, isLoadUser, name, navigation]),
  );

  const handleExitApp = () => {
    BackHandler.exitApp();
  };

  const closeCloseAppModal = () => {
    setToggleCloseAppModal(false);
  };

  return (
    <>
      <CloseAppModal show={toggleCloseAppModal} close={closeCloseAppModal} exit={handleExitApp} />

      <Container isLoad={isLoadUser || isLoad} position="relative" f="1" justify="flex-start" bgColor="white" pt="40px">
        <Box w="70%">
          <Box d="row" justify="space-between" w="100%" mb="20px">
            {name.length > 0 && (
              <>
                <Box bgColor="black" p="4px 12px 6px" radius="5px">
                  <Text color="white" size="20px" weight="bold">
                    {name}
                  </Text>
                </Box>

                <Text size="20px" weight="bold">
                  Lv. {level}
                </Text>
              </>
            )}
          </Box>

          <Box align="stretch" w="100%">
            {name.length > 0 && (
              <>
                <Box d="row" justify="space-between">
                  <Text size="18px" weight="bold" mb="12px">
                    Exp.
                  </Text>

                  <Text size="18px" weight="bold" mb="12px">
                    {Math.floor((experience / requiredExperience) * 100)} %
                  </Text>
                </Box>

                <ProgressBar progress={experience / requiredExperience} color="#000000" />
              </>
            )}
          </Box>

          {status.map((stat) => (
            <Status key={stat.name} name={stat.name} value={stat.value} />
          ))}
        </Box>

        <FloatMenu floatMenuOptions={floatMenuOptions} />

        <BottomSheet>
          <StatusInfo statusInfo={statusInfo} />
        </BottomSheet>
      </Container>
    </>
  );
};
