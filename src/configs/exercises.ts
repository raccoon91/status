export const EXERCISES: { [key: string]: IExerciseConstant } = {
  "push up": {
    name: "push up",
    unit: "count",
    status: [
      { name: "Hit Point", point: 1, rate: 0.1 },
      { name: "Strength", point: 1, rate: 0.1 },
    ],
  },
  "sit up": {
    name: "sit up",
    unit: "count",
    status: [
      { name: "Hit Point", point: 1, rate: 0.1 },
      { name: "Strength", point: 1, rate: 0.1 },
    ],
  },
  running: {
    name: "running",
    unit: "km",
    status: [
      { name: "Agility", point: 1, rate: 0.1 },
      { name: "Stamina", point: 1, rate: 0.1 },
    ],
  },
  cycle: {
    name: "cycle",
    unit: "km",
    status: [
      { name: "Agility", point: 1, rate: 0.1 },
      { name: "Stamina", point: 1, rate: 0.1 },
    ],
  },
};
