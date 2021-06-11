import Task from "../shared/task";

export default interface ITask extends Task {
  list: string;
  _id: string;
}
