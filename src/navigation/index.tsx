import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute, RouteProp } from "@react-navigation/core";
import { UserScreen, ExerciseScreen } from "@src/screens";
import { MainNavigation } from "./Main";

const getTitleName = (route: RouteProp<Record<string, object | undefined>, string>) => {
  const name = getFocusedRouteNameFromRoute(route);

  return name || "Status";
};

const Stack = createStackNavigator();

export const Navigations = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="User"
        options={{
          title: "User",
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "#e2e2e2",
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "left",
        }}
        component={UserScreen}
      />
      <Stack.Screen
        name="Main"
        options={({ route }) => ({
          title: getTitleName(route),
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "#e2e2e2",
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "left",
        })}
        component={MainNavigation}
      />
      <Stack.Screen
        name="Exercise"
        options={{
          title: "Exercise",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "left",
        }}
        component={ExerciseScreen}
      />
    </Stack.Navigator>
  );
};
