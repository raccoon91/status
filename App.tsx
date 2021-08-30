import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { Navigations } from "@src/navigation";
import Toast from "react-native-toast-message";
import { store } from "./src/store";
import { initNotification, registerLocalNotificationEvent, unregisterLocalNotificationEvent } from "src/utils";

initNotification();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    registerLocalNotificationEvent();

    return () => {
      unregisterLocalNotificationEvent();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Navigations />
        </NavigationContainer>
      </Provider>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaProvider>
  );
};

export default App;
