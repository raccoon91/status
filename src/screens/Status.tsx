import React, { useState, useCallback } from "react";
import { useNavigation, useNavigationState, useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { ProgressBar } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { getUser, getStatus } from "@src/store/thunk";
import { Container, Block, Flex, Bold, Text, Button } from "@src/components/atoms";
import { Status } from "@src/components/molecules";
import { FloatMenu } from "@src/components/organisms";
import { CloseAppModal } from "@src/components/templates";

const floatMenuOptions = {
  position: { right: "30px", bottom: "30px" },
  mainMenu: { color: "black", iconName: "plus" },
  subMenu: [
    { name: "", color: "gray", iconName: "user-plus", to: "Exercise" },
    { name: "", color: "gray", iconName: "bell", to: "Alarm" },
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
  const { isFetch, isLoad, status } = useAppSelector((state) => state.status);

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

  const goToStatusInfo = () => {
    navigation.navigate("StatusInfo");
  };

  const handleExitApp = () => {
    BackHandler.exitApp();
  };

  const closeCloseAppModal = () => {
    setToggleCloseAppModal(false);
  };

  return (
    <>
      <CloseAppModal show={toggleCloseAppModal} close={closeCloseAppModal} exit={handleExitApp} />

      <Container isLoad={isLoadUser || isLoad} position="relative" pt="40px">
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

        <FloatMenu floatMenuOptions={floatMenuOptions} />
      </Container>
    </>
  );
};
