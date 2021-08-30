import { AppState, Platform, PushNotificationIOS } from "react-native";
import PushNotification from "react-native-push-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import { CHANNEL_ID, SCHEDULE_ALARM, SCHEDULE_WEEKS, SCHEDULE_TIME } from "src/configs";

const handleAppStateChange = (nextAppState: string) => {
  if (nextAppState === "active") {
    registerLocalNotification();
  }
};

const getScheduleDates = async () => {
  const storageAlarm = await AsyncStorage.getItem("@notificationAlarm");
  let alarm: string;

  if (storageAlarm) {
    alarm = storageAlarm;
  } else {
    alarm = SCHEDULE_ALARM;
  }

  if (alarm === "OFF") {
    return [];
  }

  const storageWeeks = await AsyncStorage.getItem("@notificationWeeks");
  const storageTime = await AsyncStorage.getItem("@notificationTime");
  let weeks: number[];
  let time: number;

  if (storageWeeks) {
    weeks = JSON.parse(storageWeeks);
  } else {
    AsyncStorage.setItem("@notificationWeeks", JSON.stringify(SCHEDULE_WEEKS));

    weeks = SCHEDULE_WEEKS;
  }

  if (storageTime) {
    time = Number(storageTime);
  } else {
    AsyncStorage.setItem("@notificationTime", String(SCHEDULE_TIME));

    time = SCHEDULE_TIME;
  }

  const currentWeek = dayjs().day();

  return weeks.map((week) => {
    let scheduleDate = dayjs().minute(0).second(0).millisecond(0);

    if (week < currentWeek || (week === currentWeek && scheduleDate.hour() >= time)) {
      scheduleDate = scheduleDate.add(7, "day");
    }

    return scheduleDate.day(week).hour(time).toDate();
  });
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

// const getNotificationList = () => {
//   PushNotification.getScheduledLocalNotifications((notifications) => {
//     console.log("=========== Notifications ===========");
//     console.log("\n", "count", notifications.length);
//     notifications.forEach((notification) => {
//       console.log("\n", notification.date);
//     });
//   });
// };

export const registerLocalNotification = async () => {
  PushNotification.setApplicationIconBadgeNumber(0);
  PushNotification.cancelAllLocalNotifications();

  checkOrCreateChannel();

  const scheduleDates = await getScheduleDates();

  scheduleDates.forEach((scheduleDate) => {
    PushNotification.localNotificationSchedule({
      channelId: CHANNEL_ID,

      /* Android Only Properties */
      priority: "high",
      visibility: "public",
      importance: "high",

      /* iOS and Android properties */
      title: "Status Alarm",
      message: "Update Your Status",
      playSound: false,
      vibrate: false,
      number: 1,
      // actions: ["OK"],

      date: scheduleDate,
    });
  });

  // getNotificationList();
};

export const unregisterLocalNotification = () => {
  PushNotification.cancelAllLocalNotifications();

  // getNotificationList();
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

export const registerLocalNotificationEvent = async () => {
  AppState.addEventListener("change", handleAppStateChange);
};

export const unregisterLocalNotificationEvent = () => {
  AppState.removeEventListener("change", handleAppStateChange);
};
