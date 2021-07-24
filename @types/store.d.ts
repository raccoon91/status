interface IExercise {
  name: string;
  description?: string;
  unit: string;
  status: { name: string; point: number; rate: number }[];
}
interface IStatValues {
  name: string;
  value: number;
}

interface IExerciseValues {
  name: string;
  value: string;
  unit?: string;
}

interface IStatInfoValues {
  name: string;
  exercises: string[];
}
