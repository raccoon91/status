const INITIAL_STATUS: { name: string; value: number }[] = [
  { name: "Hit Point", value: 5 },
  { name: "Strength", value: 5 },
  { name: "Agility", value: 5 },
  { name: "Stamina", value: 5 },
];

const EXERCISES: { [key: string]: IExercise } = {
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

export { INITIAL_STATUS, EXERCISES, EXERCISE_NAMES, MAP_STATUS_WITH_EXERCISE };
