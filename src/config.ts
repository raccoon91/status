export const initialStatusList = [
  { title: "Hit Point", value: 5 },
  { title: "Strength", value: 5 },
  { title: "Agility", value: 5 },
  { title: "Stamina", value: 5 },
];

export const exercises: { [key: string]: IExercise } = {
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

export const exerciseList = Object.keys(exercises);

const statusWithExerciseData: { [key: string]: string[] } = {};

Object.keys(exercises).forEach((key) => {
  const exercise = exercises[key];

  exercise?.status?.forEach((target) => {
    if (!statusWithExerciseData[target]) {
      statusWithExerciseData[target] = [exercise.name!];
    } else {
      statusWithExerciseData[target].push(exercise.name!);
    }
  });
});

export const mapStatusWithExercise = statusWithExerciseData;
