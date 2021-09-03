import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute, RouteProp } from "@react-navigation/native";
import { headerStyle } from "src/components/atoms";
import { UserScreen, ExerciseScreen, ProfileScreen, AlarmScreen, VersionScreen } from "@src/screens";
import { MainNavigation } from "./Main";

const getTitleName = (route: RouteProp<Record<string, object | undefined>, string>) => {
  const name = getFocusedRouteNameFromRoute(route);

  return name || "Status";
};

const Stack = createStackNavigator();

export const Navigations = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="User" options={headerStyle("User", "light")} component={UserScreen} />
      <Stack.Screen
        name="Main"
        options={({ route }) => headerStyle(getTitleName(route), "light")}
        component={MainNavigation}
      />
      <Stack.Screen name="Exercise" options={headerStyle("Exercise", "dark")} component={ExerciseScreen} />
      <Stack.Screen name="Profile" options={headerStyle("Profile", "light")} component={ProfileScreen} />
      <Stack.Screen name="Alarm" options={headerStyle("Alarm", "light")} component={AlarmScreen} />
      <Stack.Screen name="Version" options={headerStyle("Version", "light")} component={VersionScreen} />
    </Stack.Navigator>
  );
};
