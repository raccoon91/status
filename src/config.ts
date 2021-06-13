export const initialStatusList = [
  { title: "Hit Point", value: 5.01 },
  { title: "Strength", value: 7.005 },
  { title: "Agility", value: 6.24 },
  { title: "Stamina", value: 5 },
];

export const exercises: { [key: string]: IExercise } = {
  "push up": { point: 1, rate: 0.01, unit: "count" },
  "sit up": { point: 1, rate: 0.01, unit: "count" },
  treadmill: { point: 1, rate: 0.1, unit: "km" },
  cycle: { point: 1, rate: 0.1, unit: "km" },
};

export const mapStatusWithExercise: { [key: string]: string[] } = {
  "Hit Point": ["push up", "sit up"],
  Strength: ["push up", "sit up"],
  Agility: ["treadmill", "cycle"],
  Stamina: ["treadmill", "cycle"],
};
