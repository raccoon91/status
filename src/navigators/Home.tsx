import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "@src/screens";

const Stack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Status" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Status" component={HomeScreen} />
    </Stack.Navigator>
  );
};
