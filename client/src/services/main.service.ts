import http from "../http-common";
import authHeader from "../utils/auth.header";

class ToDoList {
  addTask() {
    return http.get("/todolist/", { headers: authHeader() });
  }
}
export default new ToDoList();
