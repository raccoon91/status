// // Exercise Example
// const exercises = {
//   lastExercises: [
//     {
//       "push up": {
//         value: 10,
//         unit: "count",
//       },
//     },
//     {
//       cycle: {
//         value: 10,
//         unit: "km",
//       },
//     },
//   ],
//   lastUpdated: "2021-08-20 10:00",
// };

// // Stats Example
// const statistics = [
//   {
//     status: [
//       {
//         name: "Hit Point",
//         value: 5,
//       },
//       {
//         name: "Strength",
//         value: 5,
//       },
//     ],
//     updated: "2021-08-20 10:00",
//   },
//   {
//     status: [
//       {
//         name: "Hit Point",
//         value: 5,
//       },
//       {
//         name: "Strength",
//         value: 5,
//       },
//     ],
//     updated: "2021-08-20 10:00",
//   },
// ];

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

export { STATUS_INDEX, STATUS_COLORS, USER, EXERCISES, EXERCISE_NAMES, STATUS_INFO };
