import Task from "../shares/task";

export default interface ITask extends Task {
  list: string;
  _id: string;
}
