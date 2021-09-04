const EXERCISE_LIST: IExerciseConstant[] = [
  {
    name: "push up",
    unit: "count",
    status: [
      { name: "Hit Point", point: 1, rate: 0.1 },
      { name: "Strength", point: 1, rate: 0.1 },
    ],
  },
  {
    name: "crunch",
    unit: "count",
    status: [
      { name: "Hit Point", point: 1, rate: 0.1 },
      { name: "Strength", point: 1, rate: 0.1 },
    ],
  },
  {
    name: "plank",
    unit: "min",
    status: [
      { name: "Hit Point", point: 1, rate: 0.1 },
      { name: "Strength", point: 1, rate: 0.1 },
    ],
  },
  {
    name: "squat",
    unit: "count",
    status: [
      { name: "Strength", point: 1, rate: 0.1 },
      { name: "Agility", point: 1, rate: 0.1 },
    ],
  },
  {
    name: "lunge",
    unit: "count",
    status: [
      { name: "Strength", point: 1, rate: 0.1 },
      { name: "Agility", point: 1, rate: 0.1 },
    ],
  },
  {
    name: "burpees",
    unit: "count",
    status: [
      { name: "Strength", point: 1, rate: 0.1 },
      { name: "Agility", point: 1, rate: 0.1 },
    ],
  },
  {
    name: "running",
    unit: "km",
    status: [
      { name: "Agility", point: 1, rate: 0.1 },
      { name: "Stamina", point: 1, rate: 0.1 },
    ],
  },
  {
    name: "cycle",
    unit: "km",
    status: [
      { name: "Agility", point: 1, rate: 0.1 },
      { name: "Stamina", point: 1, rate: 0.1 },
    ],
  },
];

const EXERCISES: { [key: string]: IExerciseConstant } = {};

EXERCISE_LIST.forEach((EXERCISE) => {
  EXERCISES[EXERCISE.name] = EXERCISE;
});

export { EXERCISES };
