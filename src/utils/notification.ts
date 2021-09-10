import { AppState, Platform, PushNotificationIOS } from "react-native";
import PushNotification from "react-native-push-notification";
import dayjs from "dayjs";
import { storage } from "./storage";
import { NOTIFICATION_SCHEDULE, CHANNEL_ID } from "@src/configs";

export const getNotificationSchedule = async () => {
  const storageSchedule = await storage.getItem("@schedule", NOTIFICATION_SCHEDULE);

  return storageSchedule;
};

const createScheduleDates = async () => {
  const schedule = await getNotificationSchedule();

  if (schedule.alarm === "OFF") {
    return [];
  }

  const currentWeek = dayjs().day();

  return schedule.weeks.map((week) => {
    let scheduleDate = dayjs().second(0).millisecond(0);

    if (
      week < currentWeek ||
      (week === currentWeek && scheduleDate.hour() > schedule.hour) ||
      (week === currentWeek && scheduleDate.hour() === schedule.hour && scheduleDate.minute() >= schedule.minute)
    ) {
      scheduleDate = scheduleDate.add(7, "day");
    }

    return scheduleDate.day(week).hour(schedule.hour).minute(schedule.minute).toDate();
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

  const scheduleDates = await createScheduleDates();

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

const handleAppStateChange = (nextAppState: string) => {
  if (nextAppState === "active") {
    registerLocalNotification();
  }
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
