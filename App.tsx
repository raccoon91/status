import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "@src/navigation";

const App = () => (
  <NavigationContainer>
    <MainNavigator />
  </NavigationContainer>
);

export default App;
