import List from "../shared/list";
import Task from "./task";

export default interface IList extends List {
  tasks: Task[];
  folder: string;
  _id: string;
}
