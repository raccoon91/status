import React, { useRef, useEffect } from "react";
import analytics from "@react-native-firebase/analytics";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { Navigations } from "@src/navigation";
import { store } from "@src/store";
import { registerLocalNotificationEvent, unregisterLocalNotificationEvent } from "@src/utils";
import type { NavigationContainerRef } from "@react-navigation/native";

const App = () => {
  const navigationRef = useRef<NavigationContainerRef>(null);
  const routeNameRef = useRef<string | undefined>();

  useEffect(() => {
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
    <>
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer ref={navigationRef} onReady={handleOnReady} onStateChange={handleOnStateChange}>
            <Navigations />
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default App;
