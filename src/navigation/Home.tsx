import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, UpdateStatusScreen } from "@src/screens";

const Stack = createStackNavigator();

export const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Status" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Status" component={HomeScreen} />
      <Stack.Screen name="Update" component={UpdateStatusScreen} />
    </Stack.Navigator>
  );
};
