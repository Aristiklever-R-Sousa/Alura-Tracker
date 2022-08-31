export enum NotificationType {
  SUCESS = "success",
  FAIL = "danger",
  WARNING = "warning",
}

export interface INotification {
  title: string;
  text: string;
  type: NotificationType;
  id: number;
}
