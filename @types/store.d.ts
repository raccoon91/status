interface IStatus {
  title: string;
  value: number;
}

interface IUpdate {
  title: string;
  exercise: string;
  value: string;
}

interface IExercise {
  name?: string;
  description?: string;
  point?: number;
  rate?: number;
  count?: string;
}

interface IStatusInfo {
  title: string;
  contents: string[];
}
