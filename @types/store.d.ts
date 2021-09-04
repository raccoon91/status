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

interface IExercises {
  [key: string]: IExercise;
}

interface IStatistics {
  status: IStatus[];
  updated: string;
}

interface IUserState {
  isFetch: boolean;
  isLoad: boolean;
  name: string;
  newName: string;
  level: number;
  experience: number;
  requiredExperience: number;
  totalExperience: number;
}

interface IStatusState {
  isFetch: boolean;
  isLoad: boolean;
  status: IStatus[];
  statusInfo: IStatusInfo[];
}

interface IChartData {
  label: string;
  data: number[];
  backgroundColor: string;
  barThickness?: number;
  borderRadius?: number;
}

interface IExerciseState {
  isFetch: boolean;
  isLoad: boolean;
  isUpdate: boolean;
  lastUpdated: string;
  exercises: IExercises;
  exerciseNames: string[];
  updateStatus: IStatus[];
  enableUpdate: boolean;
  statistics: {
    labels: string[];
    datasets: IChartData[];
  } | null;
}

interface IRootState {
  user: IUserState;
  status: IStatusState;
  exercise: IExerciseState;
}

interface IRejectValue {
  rejectValue: {
    type: string;
    message: string;
  };
}
