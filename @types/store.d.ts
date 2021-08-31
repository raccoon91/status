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

interface IRejectValue {
  rejectValue: {
    type: string;
    message: string;
  };
}

interface IUserState {
  isFetch: boolean;
  isLoad: boolean;
  name: string;
  newName: string;
  level: number;
  experience: number;
  requiredExperience: number;
}

interface IMainState {
  isFetch: boolean;
  isLoad: boolean;
  status: IStatus[];
  statusInfo: IStatusInfo[];
}

interface IExerciseState {
  isFetch: boolean;
  isLoad: boolean;
  isUpdate: boolean;
  lastUpdated: string;
  exercises: { [key: string]: IExercise };
  exerciseNames: string[];
  displayUpdateStatus: boolean;
  updateStatus: IStatus[];
  enableUpdate: boolean;
}

interface IChartData {
  label: string;
  data: number[];
  backgroundColor: string;
  barThickness?: number;
  borderRadius?: number;
}
interface IStatisticsState {
  isFetch: boolean;
  isLoad: boolean;
  statisticsData: {
    labels: string[];
    datasets: IChartData[];
  } | null;
}

interface IRootState {
  user: IUserState;
  main: IMainState;
  exercise: IExerciseState;
  statistics: IStatisticsState;
}
