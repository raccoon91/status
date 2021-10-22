import { EXERCISES } from "./exercises";
const { version } = require("../../package.json");

export const CHANNEL_ID = "STATUS_CHANNEL";

export const NOTIFICATION_SCHEDULE = {
  alarm: "ON",
  weeks: [1, 2, 3, 4, 5],
  hour: 19,
  minute: 0,
};

export const WEEKS: { [key: string]: number } = {
  SU: 0,
  MO: 1,
  TU: 2,
  WE: 3,
  TH: 4,
  FI: 5,
  SA: 6,
};

export const WEEKS_NAMES = Object.keys(WEEKS);

export const MAX_UPDATE_EXPERIENCE_VALUE = 1000;

export const USER = {
  version,
  name: "",
  level: 1,
  experience: 0,
  requiredExperience: 1000,
  totalExperience: 0,
};

export const MAX_UPDATE_STATUS_VALUE = 50;

export const STATUS_CONFIG: { [key: string]: { index: number; color: string } } = {
  "Hit Point": { index: 0, color: "#9d9d9d" },
  Strength: { index: 1, color: "#c4c4c4" },
  Agility: { index: 2, color: "#d9d9d9" },
  Stamina: { index: 3, color: "#e9e9e9" },
};

export const STATUS: IStatus[] = [
  { name: "Hit Point", value: 5000 },
  { name: "Strength", value: 5000 },
  { name: "Agility", value: 5000 },
  { name: "Stamina", value: 5000 },
];

export const EXERCISE_NAMES = Object.keys(EXERCISES) as string[];

const MAP_STATUS_WITH_EXERCISE: { [key: string]: { name: string; unit: string; rate: number }[] } = {};

EXERCISE_NAMES.forEach((exerciseName) => {
  const exercise = EXERCISES[exerciseName];

  exercise?.status?.forEach((status) => {
    if (!MAP_STATUS_WITH_EXERCISE[status.name]) {
      MAP_STATUS_WITH_EXERCISE[status.name] = [];
    }

    MAP_STATUS_WITH_EXERCISE[status.name].push({
      name: exercise.name,
      unit: exercise.unit,
      rate: status.rate,
    });
  });
});

export const STATUS_INFO: IStatusInfo[] = STATUS.map((status) => ({
  name: status.name,
  exercises: MAP_STATUS_WITH_EXERCISE[status.name] || [],
}));

export { EXERCISES };
