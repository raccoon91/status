import React from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
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
        tabBarIcon: ({ color }) => <Icon name="home" color={color} size={22} />,
      }}
    />
    <Tab.Screen
      name="Statistics"
      component={StatisticsScreen}
      options={{
        tabBarIcon: ({ color }) => <Icon name="bar-chart" color={color} size={22} />,
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingScreen}
      options={{
        tabBarIcon: ({ color }) => <Icon name="settings" color={color} size={22} />,
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tapBar: { backgroundColor: "white" },
});
