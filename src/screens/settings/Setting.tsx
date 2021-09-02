import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/core";
import { Container, Text, OpacityBox } from "@src/components/atoms";

export const SettingScreen = () => {
  const navigation = useNavigation();

  const navigateTo = (to: string) => () => {
    navigation.navigate(to);
  };

  return (
    <Container f="1" align="flex-start" justify="flex-start" p="10px">
      <OpacityBox justify="flex-start" w="100%" h="60px" bgColor="white" onPress={navigateTo("Profile")}>
        <Icon name="user" color="black" size={24} />
        <Text size="16px" weight="bold" mx="20px">
          Profile
        </Text>
      </OpacityBox>

      <OpacityBox justify="flex-start" w="100%" h="60px" mt="10px" bgColor="white" onPress={navigateTo("Alarm")}>
        <Icon name="bell" color="black" size={24} />
        <Text size="16px" weight="bold" mx="20px">
          Alarm
        </Text>
      </OpacityBox>

      <OpacityBox justify="flex-start" w="100%" h="60px" mt="10px" bgColor="white" onPress={navigateTo("Version")}>
        <Icon name="info" color="black" size={24} />
        <Text size="16px" weight="bold" mx="20px">
          Version
        </Text>
      </OpacityBox>
    </Container>
  );
};
