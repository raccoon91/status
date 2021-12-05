import React, { useRef, useState, useCallback, useEffect } from "react";
import analytics from "@react-native-firebase/analytics";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { Navigations } from "@src/navigation";
import { store } from "@src/store";
import { theme, toastConfig } from "@src/configs";
import { initAdmobConsent } from "@src/components/organisms";
import { Welcome } from "@src/components/screens";
import {
  appVersionCheck,
  initNotification,
  registerLocalNotificationEvent,
  unregisterLocalNotificationEvent,
} from "@src/utils";
import type { NavigationContainerRef } from "@react-navigation/native";

if (__DEV__) {
  analytics().setAnalyticsCollectionEnabled(false);
}

const App = () => {
  const [appVersionChecked, setAppVersionChecked] = useState(false);
  const navigationRef = useRef<NavigationContainerRef>(null);
  const routeNameRef = useRef<string | undefined>();

  const appReady = useCallback(async () => {
    await appVersionCheck();

    initNotification();
    setAppVersionChecked(true);
  }, []);

  useEffect(() => {
    appReady();
  }, [appReady]);

  useEffect(() => {
    if (appVersionChecked) {
      initAdmobConsent();
      registerLocalNotificationEvent();

      return () => {
        unregisterLocalNotificationEvent();
      };
    }
  }, [appVersionChecked]);

  const handleOnReady = () => {
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (currentRouteName) {
      routeNameRef.current = currentRouteName;
    }
  };

  const handleOnStateChange = async () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (currentRouteName) {
      if (previousRouteName !== currentRouteName) {
        await analytics().logScreenView({
          screen_name: currentRouteName,
          screen_class: currentRouteName,
        });
      }

      routeNameRef.current = currentRouteName;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {appVersionChecked ? (
        <Provider store={store}>
          <SafeAreaProvider>
            <NavigationContainer ref={navigationRef} onReady={handleOnReady} onStateChange={handleOnStateChange}>
              <Navigations />
            </NavigationContainer>
          </SafeAreaProvider>
        </Provider>
      ) : (
        <Welcome />
      )}

      <Toast ref={(ref) => Toast.setRef(ref)} config={toastConfig} />
    </ThemeProvider>
  );
};

export default App;
