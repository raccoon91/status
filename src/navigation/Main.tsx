import React from "react";
import { Feather } from "@src/components/atoms";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StatusScreen, StatisticsScreen, SettingScreen } from "@src/components/screens";

const Tab = createMaterialTopTabNavigator();

export const MainNavigation = () => (
  <Tab.Navigator
    initialRouteName="Status"
    tabBarPosition="bottom"
    screenOptions={{
      tabBarShowLabel: false,
      tabBarIndicatorStyle: { backgroundColor: "black" },
    }}
  >
    <Tab.Screen
      name="Status"
      component={StatusScreen}
      options={{
        tabBarIcon: ({ color }) => <Feather name="home" color={color} size={20} />,
      }}
    />
    <Tab.Screen
      name="Statistics"
      component={StatisticsScreen}
      options={{
        tabBarIcon: ({ color }) => <Feather name="bar-chart" color={color} size={20} />,
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingScreen}
      options={{
        tabBarIcon: ({ color }) => <Feather name="settings" color={color} size={20} />,
      }}
    />
  </Tab.Navigator>
);
