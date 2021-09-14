interface IExerciseConstant {
  name: string;
  unit: string;
  description?: string;
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
}

interface IExercises {
  [key: string]: IExercise;
}

interface IStatistics {
  exercises: IExercises;
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
  weekStatistics: { exercises: IExercises; updated: string }[];
  selectedChartIndex: string | null;
  selectedStatistics: {
    exercises: { name: string; value: string | number; unit: string }[];
    status: IStatus[];
    updated: string;
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
