import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Feather";
import { HighlightBox } from "@src/components/atoms";
import { StatusScreen, UpdateStatusScreen } from "@src/screens";
import { useNavigation } from "@react-navigation/core";

const Stack = createStackNavigator();

export const HomeNavigation = () => {
  const navigation = useNavigation();

  const handlePressGoStatus = () => {
    navigation.navigate("Status");
  };

  return (
    <Stack.Navigator initialRouteName="Status">
      <Stack.Screen name="Status" options={{ headerShown: false }} component={StatusScreen} />
      <Stack.Screen
        name="Update"
        options={{
          title: "Update",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <HighlightBox px="10px" onPress={handlePressGoStatus}>
              <Icon name="chevron-left" color="white" size={36} />
            </HighlightBox>
          ),
        }}
        component={UpdateStatusScreen}
      />
    </Stack.Navigator>
  );
};
