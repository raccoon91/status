const exercisePointAndRate = (point: number) => ({
  point,
  rate: point / 10,
});

const EXERCISE_LIST: IExerciseConstant[] = [
  {
    name: "push up",
    unit: "count",
    status: [
      { name: "Hit Point", ...exercisePointAndRate(1) },
      { name: "Strength", ...exercisePointAndRate(1) },
    ],
  },
  {
    name: "pull up",
    unit: "count",
    status: [
      { name: "Hit Point", ...exercisePointAndRate(5) },
      { name: "Strength", ...exercisePointAndRate(5) },
    ],
  },
  {
    name: "crunch",
    unit: "count",
    status: [
      { name: "Hit Point", ...exercisePointAndRate(1) },
      { name: "Strength", ...exercisePointAndRate(1) },
    ],
  },
  {
    name: "plank",
    unit: "min",
    status: [
      { name: "Strength", ...exercisePointAndRate(10) },
      { name: "Stamina", ...exercisePointAndRate(10) },
    ],
  },
  {
    name: "squat",
    unit: "count",
    status: [
      { name: "Strength", ...exercisePointAndRate(1) },
      { name: "Agility", ...exercisePointAndRate(1) },
    ],
  },
  {
    name: "lunge",
    unit: "count",
    status: [
      { name: "Strength", ...exercisePointAndRate(1) },
      { name: "Agility", ...exercisePointAndRate(1) },
    ],
  },
  {
    name: "burpees",
    unit: "count",
    status: [
      { name: "Strength", ...exercisePointAndRate(2) },
      { name: "Agility", ...exercisePointAndRate(2) },
      { name: "Stamina", ...exercisePointAndRate(2) },
    ],
  },
  {
    name: "walking",
    unit: "km",
    status: [{ name: "Stamina", ...exercisePointAndRate(5) }],
  },
  {
    name: "running",
    unit: "km",
    status: [
      { name: "Strength", ...exercisePointAndRate(10) },
      { name: "Agility", ...exercisePointAndRate(10) },
      { name: "Stamina", ...exercisePointAndRate(10) },
    ],
  },
  {
    name: "cycle",
    unit: "km",
    status: [
      { name: "Strength", ...exercisePointAndRate(10) },
      { name: "Agility", ...exercisePointAndRate(10) },
      { name: "Stamina", ...exercisePointAndRate(10) },
    ],
  },
];

const EXERCISES: { [key: string]: IExerciseConstant } = {};

EXERCISE_LIST.forEach((EXERCISE) => {
  EXERCISES[EXERCISE.name] = EXERCISE;
});

export { EXERCISES };
