interface IExercise {
  name: string;
  description?: string;
  point: number;
  rate: number;
  unit: string;
  status: string[];
}
interface IStatValues {
  name: string;
  value: number;
}

interface IExerciseValues {
  name: string;
  value: string;
}

interface IStatInfoValues {
  name: string;
  exercises: string[];
}
