import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Feather";
import { StatsScreen, SettingScreen } from "@src/screens";
import { HomeNavigator } from "./Home";

const Tab = createMaterialBottomTabNavigator();

const styles = StyleSheet.create({
  tapBar: {
    backgroundColor: "white",
  },
});

const Navigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    labeled={false}
    activeColor="black"
    inactiveColor="darkgray"
    barStyle={styles.tapBar}
  >
    <Tab.Screen
      name="Home"
      component={HomeNavigator}
      options={{
        tabBarIcon: ({ color }) => <Icon name="home" color={color} size={22} />,
      }}
    />
    <Tab.Screen
      name="Stats"
      component={StatsScreen}
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

export default Navigator;
