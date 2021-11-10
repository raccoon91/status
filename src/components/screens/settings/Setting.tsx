import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Bold, OpacityBox, Feather } from "@src/components/atoms";
import { ScrollScreenTemplate } from "@src/components/templates";

export const SettingScreen = () => {
  const navigation = useNavigation();

  const navigateTo = (to: string) => () => {
    navigation.navigate(to);
  };

  return (
    <ScrollScreenTemplate bgColor="gray50" w="100%" p="20px 10px">
      <OpacityBox justify="flex-start" h="50px" p="12px 16px" bgColor="white" onPress={navigateTo("Profile")}>
        <Feather name="user" color="black" size={24} />
        <Bold size="sm" ml="20px">
          Profile
        </Bold>
      </OpacityBox>

      <OpacityBox justify="flex-start" h="50px" p="12px 16px" mt="10px" bgColor="white" onPress={navigateTo("Alarm")}>
        <Feather name="bell" color="black" size={24} />
        <Bold size="sm" ml="20px">
          Alarm
        </Bold>
      </OpacityBox>

      <OpacityBox
        justify="flex-start"
        h="50px"
        p="12px 16px"
        mt="10px"
        bgColor="white"
        onPress={navigateTo("PrivacyPolicy")}
      >
        <Feather name="book" color="black" size={24} />
        <Bold size="sm" ml="20px">
          Privacy Policy
        </Bold>
      </OpacityBox>

      <OpacityBox
        justify="flex-start"
        h="50px"
        p="12px 16px"
        mt="10px"
        bgColor="white"
        onPress={navigateTo("PatchNotes")}
      >
        <Feather name="alert-triangle" color="black" size={24} />
        <Bold size="sm" ml="20px">
          Patch Notes
        </Bold>
      </OpacityBox>

      <OpacityBox justify="flex-start" h="50px" p="12px 16px" mt="10px" bgColor="white" onPress={navigateTo("Version")}>
        <Feather name="sliders" color="black" size={24} />
        <Bold size="sm" ml="20px">
          Version
        </Bold>
      </OpacityBox>
    </ScrollScreenTemplate>
  );
};
