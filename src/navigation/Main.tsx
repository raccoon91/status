import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Feather } from "@src/components/atoms";
import { StatusScreen, StatisticsScreen, SettingScreen } from "@src/components/screens";

const Tab = createMaterialBottomTabNavigator();

export const MainNavigation = () => (
  <Tab.Navigator
    initialRouteName="Status"
    labeled={false}
    activeColor="black"
    inactiveColor="darkgray"
    barStyle={styles.tapBar}
  >
    <Tab.Screen
      name="Status"
      component={StatusScreen}
      options={{
        tabBarIcon: ({ color }) => <Feather name="home" color={color} size={22} />,
      }}
    />
    <Tab.Screen
      name="Statistics"
      component={StatisticsScreen}
      options={{
        tabBarIcon: ({ color }) => <Feather name="bar-chart" color={color} size={22} />,
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingScreen}
      options={{
        tabBarIcon: ({ color }) => <Feather name="settings" color={color} size={22} />,
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tapBar: { backgroundColor: "white" },
});
