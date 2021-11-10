/**
 * @format
 */

import { AppRegistry } from "react-native";
import { appVersionCheck, initNotification } from "./src/utils";
import { name as appName } from "./app.json";
import App from "./App";

appVersionCheck();
initNotification();

AppRegistry.registerComponent(appName, () => App);
