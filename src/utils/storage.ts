import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import { USER, STATUS, NOTIFICATION_SCHEDULE } from "@src/configs";

export const removeStorage = async (targets?: string[]) => {
  if (!targets) {
    const keys = await AsyncStorage.getAllKeys();

    for (const key of keys) {
      await AsyncStorage.removeItem(key);
    }
  } else {
    for (const key of targets) {
      await AsyncStorage.removeItem(key);
    }
  }
};

export const getStorageUser = async () => {
  let user = USER;

  const storageUser = await AsyncStorage.getItem("@user");

  if (storageUser) {
    user = JSON.parse(storageUser);
  } else {
    AsyncStorage.setItem("@user", JSON.stringify(USER));
  }

  return user;
};

export const setStorageUser = async (newUser: typeof USER) => {
  await AsyncStorage.setItem("@user", JSON.stringify(newUser));
};

export const getStorageStatus = async () => {
  let status = STATUS;

  const storageStatus = await AsyncStorage.getItem("@status");

  if (storageStatus) {
    status = JSON.parse(storageStatus);
  } else {
    AsyncStorage.setItem("@status", JSON.stringify(STATUS));
  }

  return status;
};

export const setStorageStatus = async (newStatus: IStatus[]) => {
  await AsyncStorage.setItem("@status", JSON.stringify(newStatus));
};

export const getStorageStatistics = async () => {
  let statistics: IStatistics[] = [];
  let year = dayjs().year();

  const currentYearStorageStatistics = await AsyncStorage.getItem(`@${year}-statistics`);

  if (currentYearStorageStatistics) {
    statistics = JSON.parse(currentYearStorageStatistics);
  }

  if (statistics.length < 7) {
    year = dayjs().subtract(1, "year").year();
    const lastYearStorageStatistics = await AsyncStorage.getItem(`@${year}-statistics`);

    if (lastYearStorageStatistics) {
      const lastStatistics = JSON.parse(lastYearStorageStatistics);

      if (lastStatistics.length > 0) {
        statistics = lastStatistics.slice(`-${7 - statistics.length}`).concat(statistics);
      }
    }
  } else {
    statistics = statistics.slice(-7);
  }

  return statistics;
};

export const setStorageStatistics = async (newStatistics: IStatistics) => {
  const year = dayjs().year();

  const storageStatistics = await AsyncStorage.getItem(`@${year}-statistics`);

  const statistics = storageStatistics ? JSON.parse(storageStatistics) : [];
  statistics.push(newStatistics);

  await AsyncStorage.setItem(`@${year}-statistics`, JSON.stringify(statistics));
};

export const getStorageSchedule = async () => {
  let schedule = NOTIFICATION_SCHEDULE;

  const storageSchedule = await AsyncStorage.getItem("@schedule");

  if (storageSchedule) {
    schedule = JSON.parse(storageSchedule);
  } else {
    AsyncStorage.setItem("@schedule", JSON.stringify(NOTIFICATION_SCHEDULE));
  }

  return schedule;
};

export const setStorageSchedule = async (newSchdule: typeof NOTIFICATION_SCHEDULE) => {
  await AsyncStorage.setItem("@schedule", JSON.stringify(newSchdule));
};
