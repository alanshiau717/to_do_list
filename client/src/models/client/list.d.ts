import list from "../shared/list";
import task from "../shares/task";

export default interface IList extends List {
  tasks: task[];
  folder: string;
  _id: string;
}
