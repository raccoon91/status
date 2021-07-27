import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { Navigations } from "@src/navigation";
import Toast from "react-native-toast-message";
import { store } from "./src/store";

const App = () => (
  <>
    <Provider store={store}>
      <NavigationContainer>
        <Navigations />
      </NavigationContainer>
    </Provider>
    <Toast ref={(ref) => Toast.setRef(ref)} />
  </>
);

export default App;
