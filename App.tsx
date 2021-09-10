import React, { useEffect } from "react";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { Navigations } from "@src/navigation";
import { store } from "@src/store";
import { registerLocalNotificationEvent, unregisterLocalNotificationEvent } from "@src/utils";

const App = () => {
  useEffect(() => {
    registerLocalNotificationEvent();

    return () => {
      unregisterLocalNotificationEvent();
    };
  }, []);

  return (
    <>
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer>
            <Navigations />
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default App;
