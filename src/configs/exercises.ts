const expAndRate = (value: number) => ({
  exp: value,
  rate: value / 10,
});

const EXERCISE_LIST: IExerciseConstant[] = [
  {
    name: "push up",
    unit: "count",
    status: [
      { name: "Hit Point", ...expAndRate(1) },
      { name: "Strength", ...expAndRate(1) },
    ],
  },
  {
    name: "pull up",
    unit: "count",
    status: [
      { name: "Hit Point", ...expAndRate(5) },
      { name: "Strength", ...expAndRate(5) },
    ],
  },
  {
    name: "crunch",
    unit: "count",
    status: [
      { name: "Hit Point", ...expAndRate(1) },
      { name: "Strength", ...expAndRate(1) },
    ],
  },
  {
    name: "plank",
    unit: "min",
    status: [
      { name: "Strength", ...expAndRate(4) },
      { name: "Stamina", ...expAndRate(4) },
    ],
  },
  {
    name: "squat",
    unit: "count",
    status: [
      { name: "Strength", ...expAndRate(1) },
      { name: "Agility", ...expAndRate(1) },
    ],
  },
  {
    name: "lunge",
    unit: "count",
    status: [
      { name: "Strength", ...expAndRate(1) },
      { name: "Agility", ...expAndRate(1) },
    ],
  },
  {
    name: "burpees",
    unit: "count",
    status: [
      { name: "Strength", ...expAndRate(1) },
      { name: "Agility", ...expAndRate(1) },
      { name: "Stamina", ...expAndRate(2) },
    ],
  },
  {
    name: "walking",
    unit: "km",
    status: [{ name: "Stamina", ...expAndRate(3) }],
  },
  {
    name: "running",
    unit: "km",
    status: [
      { name: "Strength", ...expAndRate(5) },
      { name: "Agility", ...expAndRate(5) },
      { name: "Stamina", ...expAndRate(5) },
    ],
  },
  {
    name: "cycle",
    unit: "km",
    status: [
      { name: "Strength", ...expAndRate(4) },
      { name: "Agility", ...expAndRate(4) },
      { name: "Stamina", ...expAndRate(4) },
    ],
  },
];

const EXERCISES: { [key: string]: IExerciseConstant } = {};

EXERCISE_LIST.forEach((EXERCISE) => {
  EXERCISES[EXERCISE.name] = EXERCISE;
});

export { EXERCISES };
