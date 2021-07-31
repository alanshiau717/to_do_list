import Folder from "../shared/folder";
import List from "./list";

export default interface IFolder extends Folder {
  _id: string;
  lists: List[];
}
