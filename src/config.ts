export const initialStatusList = [
  { title: "Hit Point", value: 5.01 },
  { title: "Strength", value: 7.005 },
  { title: "Agility", value: 6.24 },
  { title: "Stamina", value: 5 },
];

export const exercises = {
  "push up": { point: 1, rate: 0.1, unit: "count" },
  "sit up": { point: 1, rate: 0.1, unit: "count" },
  treadmill: { point: 1, rate: 1, unit: "km" },
  cycle: { point: 1, rate: 1, unit: "km" },
};

export const initialUpdateList = [
  { title: "Hit Point", value: 0 },
  { title: "Strength", value: 0 },
  { title: "Agility", value: 0 },
  { title: "Stamina", value: 0 },
];

export const initialStatusInfoList = [
  {
    title: "Hit Point",
    contents: ["push up", "sit up"],
  },
  {
    title: "Strength",
    contents: ["push up", "sit up"],
  },
  {
    title: "Agility",
    contents: ["treadmill", "cycle"],
  },
  {
    title: "Stamina",
    contents: ["treadmill", "cycle"],
  },
];
