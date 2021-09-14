import dayjs from "dayjs";
import { EXERCISES, STATUS_INDEX, MAX_UPDATE_STATUS_VALUE, STATUS_COLORS } from "@src/configs";

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
    return calculateUserLevel(totalExperience - requiredExperience, level + 1, requiredExperience + 100);
  }
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

  if (experience > 1000) {
    return 1000;
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

    status.reverse().forEach((stat) => {
      if (!datasets[stat.name]) {
        datasets[stat.name] = {
          label: stat.name,
          data: [],
          backgroundColor: STATUS_COLORS[stat.name],
          barThickness: 16,
        };
      }

      if (stat.value) {
        datasets[stat.name].data.push(stat.value / 1000);
      } else {
        datasets[stat.name].data.push(0);
      }
    });
  }

  return {
    chartLabels: labels,
    chartDatasets: Object.values(datasets),
  };
};
