import { EXERCISES, STATUS_INDEX, MAX_UPDATE_STATUS_VALUE } from "@src/configs";

export const exerciseToStatus = (exercises: IExercises) => {
  const status: IStatus[] = [];

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
