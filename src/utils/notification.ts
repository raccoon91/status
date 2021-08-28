import { AppState, Platform, PushNotificationIOS } from "react-native";
import PushNotification from "react-native-push-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import { CHANNEL_ID, SCHEDULE_TIME } from "src/configs";

const handleAppStateChange = (nextAppState: string) => {
  if (nextAppState === "active") {
    registerLocalNotification();
  }
};

const getScheduleTime = async () => {
  const storageTime = await AsyncStorage.getItem("@time");

  if (storageTime) {
    return Number(storageTime);
  } else {
    AsyncStorage.setItem("@time", String(SCHEDULE_TIME));

    return SCHEDULE_TIME;
  }
};

const checkOrCreateChannel = () => {
  PushNotification.channelExists(CHANNEL_ID, function (exists) {
    if (!exists) {
      PushNotification.createChannel(
        {
          channelId: CHANNEL_ID,
          channelName: CHANNEL_ID,
        },
        (created) => console.log(`createChannel returned '${created}'`),
      );
    }
  });
};

const registerLocalNotification = async () => {
  PushNotification.setApplicationIconBadgeNumber(0);
  PushNotification.cancelAllLocalNotifications();

  checkOrCreateChannel();

  const schduleTime = await getScheduleTime();
  const notificationDate = dayjs().add(1, "day").hour(schduleTime).minute(0).second(0).toDate();

  PushNotification.localNotificationSchedule({
    channelId: CHANNEL_ID,

    /* Android Only Properties */
    priority: "high",
    visibility: "public",
    importance: "high",

    /* iOS and Android properties */
    title: "Update Your Status",
    message: "TEST",
    playSound: false,
    number: 1,
    // actions: ["OK"],

    // for production
    repeatType: "day",
    date: notificationDate,

    // test to trigger each miniute
    // repeatType: "minute",
    // date: dayjs().add(1, "minute").second(0).toDate(),
  });
};

export const initNotification = () => {
  PushNotification.configure({
    onNotification: function (notification) {
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === "ios",
  });
};

export const register = async () => {
  registerLocalNotification();

  AppState.addEventListener("change", handleAppStateChange);
};

export const unregister = () => {
  AppState.removeEventListener("change", handleAppStateChange);
};
