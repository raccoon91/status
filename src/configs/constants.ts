const INITIAL_STATUS: { name: string; value: number }[] = [
  { name: "Hit Point", value: 5 },
  { name: "Strength", value: 5 },
  { name: "Agility", value: 5 },
  { name: "Stamina", value: 5 },
];

const EXERCISES: { [key in string]: IExercise } = {
  "push up": {
    name: "push up",
    point: 1,
    rate: 0.01,
    unit: "count",
    status: ["Hit Point", "Strength"],
  },
  "sit up": {
    name: "sit up",
    point: 1,
    rate: 0.01,
    unit: "count",
    status: ["Hit Point", "Strength"],
  },
  treadmill: {
    name: "treadmill",
    point: 1,
    rate: 0.1,
    unit: "km",
    status: ["Agility", "Stamina"],
  },
  cycle: {
    name: "cycle",
    point: 1,
    rate: 0.1,
    unit: "km",
    status: ["Agility", "Stamina"],
  },
};

const EXERCISE_NAMES = Object.keys(EXERCISES) as string[];

const MAP_STATUS_WITH_EXERCISE: { [key in string]: string[] } = {};

EXERCISE_NAMES.forEach((key) => {
  const exercise = EXERCISES[key];

  exercise?.status?.forEach((status) => {
    if (MAP_STATUS_WITH_EXERCISE[status]) {
      MAP_STATUS_WITH_EXERCISE[status]?.push(exercise.name);
    } else {
      MAP_STATUS_WITH_EXERCISE[status] = [exercise.name];
    }
  });
});

export { INITIAL_STATUS, EXERCISES, EXERCISE_NAMES, MAP_STATUS_WITH_EXERCISE };
