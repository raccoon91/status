interface IStatus {
  title: string;
  value: number;
}

interface IUpdate {
  name: string;
  value: string;
}

interface IExercise {
  name?: string;
  description?: string;
  point: number;
  rate: number;
  count?: string;
  unit: string;
  status?: string[];
}

interface IStatusInfo {
  title: string;
  contents: string[];
}
