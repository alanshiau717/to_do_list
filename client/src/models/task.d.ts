//Interface for a single task.

export default interface Task {
  name: string;
  created: Date;
  due?: Date;
  done: boolean;
  order: number;
  isDeleted: boolean;
  list: string;
  user: string;
}
