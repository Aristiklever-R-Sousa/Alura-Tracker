import IProject from "./IProject";

export default interface ITask {
  id?: string;
  project: IProject;
  description: string;
  timeInSeconds: number;
}
