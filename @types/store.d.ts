interface IExerciseConstant {
  name: string;
  description?: string;
  unit: string;
  status: { name: string; point: number; rate: number }[];
}
interface IStatus {
  name: string;
  value: number;
}

interface IStatusInfo {
  name: string;
  exercises: string[];
}

interface IExercise {
  value: string;
  unit?: string;
}

interface IStatistics {
  status: IStatus[];
  updated: string;
}
