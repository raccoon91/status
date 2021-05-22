import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";
import { StatsScreen, SettingScreen } from "@src/screens";
import { HomeNavigation } from "./Home";
import { getFocusedRouteNameFromRoute, RouteProp } from "@react-navigation/native";

const getVisibility = (route: RouteProp<Record<string, object | undefined>, string>) => {
  const focusedRouteName = getFocusedRouteNameFromRoute(route);

  if (focusedRouteName === "Update") {
    return false;
  }

  return true;
};

const Tab = createBottomTabNavigator();

const MainNavigation = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      showLabel: false,
      activeTintColor: "black",
      inactiveTintColor: "gray",
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeNavigation}
      options={({ route }) => ({
        tabBarIcon: ({ color }) => <Icon name="home" color={color} size={22} />,
        tabBarVisible: getVisibility(route),
      })}
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

export default MainNavigation;
