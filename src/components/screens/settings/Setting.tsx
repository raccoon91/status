import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Bold, OpacityBox, Feather } from "@src/components/atoms";
import { ScrollScreenTemplate } from "@src/components/templates";

export const SettingScreen = () => {
  const navigation = useNavigation();

  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

  const navigateToAlarm = () => {
    navigation.navigate("Alarm");
  };

  const navigateToPrivacyPolicy = () => {
    navigation.navigate("PrivacyPolicy");
  };

  const navigateToPatchNotes = () => {
    navigation.navigate("PatchNotes");
  };

  const navigateToVersion = () => {
    navigation.navigate("Version");
  };

  return (
    <ScrollScreenTemplate bgColor="gray50" w="100%" p="20px 10px">
      <OpacityBox justify="flex-start" h="50px" p="12px 16px" bgColor="white" onPress={navigateToProfile}>
        <Feather name="user" color="black" size={24} />
        <Bold size="sm" ml="20px">
          Profile
        </Bold>
      </OpacityBox>

      <OpacityBox justify="flex-start" h="50px" p="12px 16px" mt="10px" bgColor="white" onPress={navigateToAlarm}>
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
        onPress={navigateToPrivacyPolicy}
      >
        <Feather name="alert-triangle" color="black" size={24} />
        <Bold size="sm" ml="20px">
          Privacy Policy
        </Bold>
      </OpacityBox>

      <OpacityBox justify="flex-start" h="50px" p="12px 16px" mt="10px" bgColor="white" onPress={navigateToPatchNotes}>
        <Feather name="book" color="black" size={24} />
        <Bold size="sm" ml="20px">
          Patch Notes
        </Bold>
      </OpacityBox>

      <OpacityBox justify="flex-start" h="50px" p="12px 16px" mt="10px" bgColor="white" onPress={navigateToVersion}>
        <Feather name="info" color="black" size={24} />
        <Bold size="sm" ml="20px">
          Version
        </Bold>
      </OpacityBox>
    </ScrollScreenTemplate>
  );
};
