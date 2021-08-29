const CHANNEL_ID = "STATUS_CHANNEL";

const SCHEDULE_ALARM = "ON";

const SCHEDULE_WEEKS = [1, 2, 3, 4, 5];

const SCHEDULE_TIME = 19;

const WEEKS_NUMBER_TO_STRING: { [key: number]: string } = {
  0: "SU",
  1: "MO",
  2: "TU",
  3: "WE",
  4: "TH",
  5: "FI",
  6: "SA",
};

const WEEKS_STRING_TO_NUMBER: { [key: string]: number } = {
  SU: 0,
  MO: 1,
  TU: 2,
  WE: 3,
  TH: 4,
  FI: 5,
  SA: 6,
};

const STATUS_COLORS: { [key: string]: string } = {
  "Hit Point": "#e9e9e9",
  Strength: "#d9d9d9",
  Agility: "#c4c4c4",
  Stamina: "#9d9d9d",
};

const STATUS_INDEX: { [key: string]: number } = {
  "Hit Point": 0,
  Strength: 1,
  Agility: 2,
  Stamina: 3,
};

const STATUS: IStatus[] = [
  { name: "Hit Point", value: 5 },
  { name: "Strength", value: 5 },
  { name: "Agility", value: 5 },
  { name: "Stamina", value: 5 },
];

const USER = {
  name: "",
  level: 1,
  experience: 0,
  requiredExperience: 0,
  status: STATUS,
};

const EXERCISES: { [key: string]: IExerciseConstant } = {
  "push up": {
    name: "push up",
    unit: "count",
    status: [
      { name: "Hit Point", point: 1, rate: 0.001 },
      { name: "Strength", point: 1, rate: 0.001 },
    ],
  },
  "sit up": {
    name: "sit up",
    unit: "count",
    status: [
      { name: "Hit Point", point: 1, rate: 0.001 },
      { name: "Strength", point: 1, rate: 0.001 },
    ],
  },
  running: {
    name: "running",
    unit: "km",
    status: [
      { name: "Agility", point: 1, rate: 0.001 },
      { name: "Stamina", point: 1, rate: 0.001 },
    ],
  },
  cycle: {
    name: "cycle",
    unit: "km",
    status: [
      { name: "Agility", point: 1, rate: 0.001 },
      { name: "Stamina", point: 1, rate: 0.001 },
    ],
  },
};

const EXERCISE_NAMES = Object.keys(EXERCISES) as string[];

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

const STATUS_INFO: IStatusInfo[] = STATUS.map((status) => ({
  name: status.name,
  exercises: MAP_STATUS_WITH_EXERCISE[status.name] || [],
}));

export {
  CHANNEL_ID,
  SCHEDULE_ALARM,
  SCHEDULE_WEEKS,
  SCHEDULE_TIME,
  WEEKS_NUMBER_TO_STRING,
  WEEKS_STRING_TO_NUMBER,
  STATUS_COLORS,
  STATUS_INDEX,
  USER,
  EXERCISES,
  EXERCISE_NAMES,
  STATUS_INFO,
};
