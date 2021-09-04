import { EXERCISES } from "./exercises";

export const CHANNEL_ID = "STATUS_CHANNEL";

export const NOTIFICATION_SCHEDULE = {
  alarm: "ON",
  weeks: [1, 2, 3, 4, 5],
  hour: 19,
  minute: 0,
};

export const WEEKS_NUMBER_TO_STRING: { [key: number]: string } = {
  0: "SU",
  1: "MO",
  2: "TU",
  3: "WE",
  4: "TH",
  5: "FI",
  6: "SA",
};

export const WEEKS_STRING_TO_NUMBER: { [key: string]: number } = {
  SU: 0,
  MO: 1,
  TU: 2,
  WE: 3,
  TH: 4,
  FI: 5,
  SA: 6,
};

export const USER = {
  name: "",
  level: 1,
  experience: 0,
  requiredExperience: 1000,
  totalExperience: 0,
};

export const MAX_UPDATE_STATUS_VALUE = 500;

export const STATUS_COLORS: { [key: string]: string } = {
  "Hit Point": "#e9e9e9",
  Strength: "#d9d9d9",
  Agility: "#c4c4c4",
  Stamina: "#9d9d9d",
};

export const STATUS_INDEX: { [key: string]: number } = {
  "Hit Point": 0,
  Strength: 1,
  Agility: 2,
  Stamina: 3,
};

export const STATUS: IStatus[] = [
  { name: "Hit Point", value: 5000 },
  { name: "Strength", value: 5000 },
  { name: "Agility", value: 5000 },
  { name: "Stamina", value: 5000 },
];

export const EXERCISE_NAMES = Object.keys(EXERCISES) as string[];

const MAP_STATUS_WITH_EXERCISE: { [key: string]: string[] } = {};

EXERCISE_NAMES.forEach((exerciseName) => {
  const exercise = EXERCISES[exerciseName];

  exercise?.status?.forEach((status) => {
    if (MAP_STATUS_WITH_EXERCISE[status.name]) {
      MAP_STATUS_WITH_EXERCISE[status.name]?.push(exercise.name);
    } else {
      MAP_STATUS_WITH_EXERCISE[status.name] = [exercise.name];
    }
  });
});

export const STATUS_INFO: IStatusInfo[] = STATUS.map((status) => ({
  name: status.name,
  exercises: MAP_STATUS_WITH_EXERCISE[status.name] || [],
}));

export { EXERCISES };
