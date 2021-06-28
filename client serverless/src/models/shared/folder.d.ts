export default interface Folder {
  name: string;
  created: Date;
  done: boolean;
  order: number;
  isDeleted: boolean;
  user: string;
}
