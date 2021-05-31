import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute, RouteProp } from "@react-navigation/core";
import { UpdateStatusScreen } from "@src/screens";
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
          headerTitleAlign: "left",
        }}
        component={UpdateStatusScreen}
      />
    </Stack.Navigator>
  );
};
