interface IStatus {
  name: string;
  value: number;
}

interface IStatusInfoContent {
  name: string;
  description?: string;
  point?: number;
}

interface IStatusInfo {
  title: string;
  contents: IStatusInfoContent[];
}
