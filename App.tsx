import React, { useRef, useEffect } from "react";
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
import { registerLocalNotificationEvent, unregisterLocalNotificationEvent } from "@src/utils";
import type { NavigationContainerRef } from "@react-navigation/native";

if (__DEV__) {
  analytics().setAnalyticsCollectionEnabled(false);
}

const App = () => {
  const navigationRef = useRef<NavigationContainerRef>(null);
  const routeNameRef = useRef<string | undefined>();

  useEffect(() => {
    initAdmobConsent();
    registerLocalNotificationEvent();

    return () => {
      unregisterLocalNotificationEvent();
    };
  }, []);

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
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef} onReady={handleOnReady} onStateChange={handleOnStateChange}>
            <Navigations />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>

      <Toast ref={(ref) => Toast.setRef(ref)} config={toastConfig} autoHide={false} />
    </ThemeProvider>
  );
};

export default App;
