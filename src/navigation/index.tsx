import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { getUser, getStatus } from "@src/store/thunk";
import { headerStyle } from "@src/configs";
import {
  UserScreen,
  StatusInfoScreen,
  ExerciseScreen,
  ProfileScreen,
  AlarmScreen,
  PrivacyPolicyScreen,
  VersionScreen,
} from "@src/components/screens";
import { MainNavigation } from "./Main";
import type { RouteProp } from "@react-navigation/native";

const getTitleName = (route: RouteProp<Record<string, object | undefined>, string>) => {
  const name = getFocusedRouteNameFromRoute(route);

  return name || "Status";
};

const Stack = createStackNavigator();

export const Navigations = () => {
  const dispatch = useAppDispatch();
  const { isFetch, isLoad, name } = useAppSelector((state) => state.user);
  const { isFetch: isFetchStatus } = useAppSelector((state) => state.status);

  useEffect(() => {
    if (!isFetch) {
      dispatch(getUser());
    }
  }, [isFetch, dispatch]);

  useEffect(() => {
    if (!isFetchStatus) {
      dispatch(getStatus());
    }
  }, [isFetchStatus, dispatch]);

  useEffect(() => {
    if (isFetch && !isLoad) {
      SplashScreen.hide();
    }
  }, [isFetch, isLoad]);

  if (!isFetch || isLoad) {
    return null;
  }

  return (
    <Stack.Navigator>
      {!name ? (
        <Stack.Screen name="User" options={headerStyle("User", "light")} component={UserScreen} />
      ) : (
        <>
          <Stack.Screen
            name="Main"
            options={({ route }) => headerStyle(getTitleName(route), "light")}
            component={MainNavigation}
          />
          <Stack.Screen name="Exercise" options={headerStyle("Exercise", "dark")} component={ExerciseScreen} />
          <Stack.Screen name="StatusInfo" options={headerStyle("StatusInfo", "dark")} component={StatusInfoScreen} />
          <Stack.Screen name="Profile" options={headerStyle("Profile", "light")} component={ProfileScreen} />
          <Stack.Screen name="Alarm" options={headerStyle("Alarm", "light")} component={AlarmScreen} />
          <Stack.Screen
            name="PrivacyPolicy"
            options={headerStyle("PrivacyPolicy", "light")}
            component={PrivacyPolicyScreen}
          />
          <Stack.Screen name="Version" options={headerStyle("Version", "light")} component={VersionScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
