import http from "../http-common";
import authHeader from "../utils/auth.header";

class ToDoList {
  getTask(params: {}) {
    return http.get(`/todolist/`, { headers: authHeader() });
  }
  getFolder(params: {}) {
    return http.get(`/todolist/getfolder`, {
      headers: authHeader(),
      params: params,
    });
  }
  completeTask(taskId: string) {
    return http.post(`/todolist/completetask`, {
      taskId: taskId
    }, {
      headers: authHeader(),
    })
  }

}

export default new ToDoList();
