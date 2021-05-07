import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/Feather";

import { HomeScreen, StatsScreen, SettingScreen } from "@src/screens";

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  tapBar: { margin: 10, borderRadius: 5 },
});

const tabBarOptions = {
  style: styles.tapBar,
  activeTintColor: "black",
  inactiveTintColor: "darkgray",
  showIcon: true,
  showLabel: false,
  iconStyle: {
    width: 30,
    height: 30,
  },
  indicatorStyle: {
    backgroundColor: "black",
  },
};

const App = () => (
  <NavigationContainer>
    <Tab.Navigator tabBarPosition="bottom" initialRouteName="Home" tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="home" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="bar-chart" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="settings" color={color} size={26} />,
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default App;
