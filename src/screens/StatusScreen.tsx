import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusPage } from "@src/pages";

const Stack = createStackNavigator();

export const StatusScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Status" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Status" component={StatusPage} />
    </Stack.Navigator>
  );
};
