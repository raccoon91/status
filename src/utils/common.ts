import AsyncStorage from "@react-native-async-storage/async-storage";
import { NOTIFICATION_SCHEDULE, EXERCISES, STATUS_INDEX, MAX_UPDATE_STATUS_VALUE } from "@src/configs";

export const getNotificationSchedule = async () => {
  const storageSchedule = await AsyncStorage.getItem("@schedule");
  let schedule: typeof NOTIFICATION_SCHEDULE;

  if (storageSchedule !== null) {
    schedule = JSON.parse(storageSchedule);
  } else {
    AsyncStorage.setItem("@schedule", JSON.stringify(NOTIFICATION_SCHEDULE));

    schedule = NOTIFICATION_SCHEDULE;
  }

  return schedule;
};

export const exerciseToStatus = (exercises: IExercises) => {
  const status: IStatus[] = [
    { name: "Hit Point", value: 0 },
    { name: "Strength", value: 0 },
    { name: "Agility", value: 0 },
    { name: "Stamina", value: 0 },
  ];

  Object.keys(exercises).forEach((exerciseName) => {
    const exerciseStatus = EXERCISES?.[exerciseName]?.status || [];

    exerciseStatus.forEach((stat) => {
      const updateValue = Number(exercises[exerciseName].value) * stat.rate;

      if (status?.[STATUS_INDEX[stat.name]]) {
        status[STATUS_INDEX[stat.name]].value += updateValue;
      } else {
        status[STATUS_INDEX[stat.name]] = {
          name: stat.name,
          value: updateValue,
        };
      }

      if (status[STATUS_INDEX[stat.name]].value < 0) {
        status[STATUS_INDEX[stat.name]].value = 0;
      }

      if (status[STATUS_INDEX[stat.name]].value > MAX_UPDATE_STATUS_VALUE) {
        status[STATUS_INDEX[stat.name]].value = MAX_UPDATE_STATUS_VALUE;
      }
    });
  });

  return status;
};

export const calculateExperience = (exercises: IExercises) => {
  let experience = 0;

  Object.keys(exercises).forEach((exerciseName) => {
    const exerciseStatus = EXERCISES?.[exerciseName]?.status || [];

    exerciseStatus.forEach((stat) => {
      experience += Number(exercises[exerciseName].value) * stat.point;
    });
  });

  return experience;
};
