/**
 * @format
 */

import { AppRegistry } from "react-native";
import { initNotification } from "./src/utils";
import { name as appName } from "./app.json";
import App from "./App";

initNotification();

AppRegistry.registerComponent(appName, () => App);
