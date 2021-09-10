import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute, RouteProp } from "@react-navigation/native";
import { useAppSelector, useAppDispatch } from "@src/hooks";
import { getUser, getStatus } from "@src/store/thunk";
import { UserScreen, StatusInfoScreen, ExerciseScreen, ProfileScreen, AlarmScreen, VersionScreen } from "@src/screens";
import { headerStyle } from "@src/components/atoms";
import { MainNavigation } from "./Main";

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
          <Stack.Screen name="Version" options={headerStyle("Version", "light")} component={VersionScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
