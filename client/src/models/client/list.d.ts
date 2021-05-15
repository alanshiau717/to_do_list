import List from "../shared/list";
import Task from "../shared/task";

export default interface IList extends List {
  tasks: task[];
  folder: string;
  _id: string;
}
