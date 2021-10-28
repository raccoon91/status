import dayjs from "dayjs";
import { EXERCISES, STATUS_CONFIG, MAX_UPDATE_STATUS_VALUE, MAX_UPDATE_EXPERIENCE_VALUE } from "@src/configs";

export const calculateUserLevel = (
  totalExperience: number,
  level = 1,
  requiredExperience = 1000,
): { newLevel: number; newExperience: number; newRequiredExperience: number } => {
  if (totalExperience < requiredExperience) {
    return {
      newLevel: level,
      newExperience: totalExperience,
      newRequiredExperience: requiredExperience,
    };
  } else {
    return calculateUserLevel(totalExperience - requiredExperience, level + 1, requiredExperience + 1000);
  }
};

export const validateExerciseHour = (last: string | null | undefined, current: string) => {
  if (
    last &&
    dayjs(current).isAfter(dayjs(last), "day") &&
    dayjs(current).isAfter(dayjs(last).subtract(8, "hour"), "hour")
  ) {
    return true;
  }

  return false;
};

export const calculateNextUpdateHour = (last: string | null | undefined) => {
  const current = dayjs().format("YYYY-MM-DD HH:mm");

  if (validateExerciseHour(last, current)) {
    return null;
  }

  const after8Hours = dayjs(last).add(8, "hour");

  if (dayjs(after8Hours).isAfter(dayjs(last), "day")) {
    return after8Hours.format("MM-DD  A hh:mm");
  }

  return dayjs(last).add(1, "day").format("MM-DD  A 00:00");
};

export const fixedNumber = (number: number, digits = 4) => {
  return Number(number.toFixed(digits));
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

    exerciseStatus.forEach(({ name: statName, rate: statRate }) => {
      const { index: statIndex } = STATUS_CONFIG[statName];
      const updateValue = Number(exercises[exerciseName].value) * statRate;

      if (status[statIndex]) {
        status[statIndex].value += updateValue;
      }

      if (status[statIndex].value < 0) {
        status[statIndex].value = 0;
      }

      if (status[statIndex].value > MAX_UPDATE_STATUS_VALUE) {
        status[statIndex].value = MAX_UPDATE_STATUS_VALUE;
      }
    });
  });

  return status;
};

export const calculateExperience = (exercises: IExercises) => {
  let experience = 0;

  Object.keys(exercises).forEach((exerciseName) => {
    const exerciseStatus = EXERCISES?.[exerciseName]?.status || [];

    exerciseStatus.forEach(({ exp: statusEXP }) => {
      experience += Number(exercises[exerciseName].value) * statusEXP;
    });
  });

  if (experience > MAX_UPDATE_EXPERIENCE_VALUE) {
    return MAX_UPDATE_EXPERIENCE_VALUE;
  }

  return experience;
};

export const calculateStatistics = (statistics: IStatistics[]) => {
  const labels: string[] = [];
  const datasets: { [key: string]: IChartData } = {};

  for (let i = 0; i < statistics.length; i++) {
    const { exercises, updated } = statistics[i];
    const status = exerciseToStatus(exercises);

    labels.push(dayjs(updated).format("MM-DD"));

    status.reverse().forEach(({ name: statName, value: statValue }) => {
      const { color: statColor } = STATUS_CONFIG[statName];

      if (!datasets[statName]) {
        datasets[statName] = {
          label: statName,
          data: [],
          backgroundColor: statColor,
          barThickness: 12,
          hoverBorderWidth: 1.5,
          hoverBorderColor: "black",
        };
      }

      if (statValue) {
        datasets[statName].data.push(statValue / 1000);
      } else {
        datasets[statName].data.push(0);
      }
    });
  }

  return {
    chartLabels: labels,
    chartDatasets: Object.values(datasets),
  };
};
