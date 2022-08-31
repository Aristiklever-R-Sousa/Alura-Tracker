export enum NoficationType {
  SUCESS = "sucess",
  FAIL = "danger",
  WARNING = "warning",
}

export interface INotification {
  title: string;
  text: string;
  type: NoficationType;
  id: number;
}
