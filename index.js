/**
 * @format
 */

import { AppRegistry } from "react-native";
import { initNotification } from "src/utils";
import App from "./App";
import { name as appName } from "./app.json";

initNotification();

AppRegistry.registerComponent(appName, () => App);
