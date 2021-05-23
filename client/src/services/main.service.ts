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
  createTask(payload: { name: string, list: string, order: number }) {
    return http.post(`/todolist/createtask`, {
      ...payload
    }, {
      headers: authHeader(),
    })
  }
  createList(payload: { name: string, folder: string, order: number }) {
    return http.post(`/todolist/createlist`, {
      ...payload
    }, {
      headers: authHeader()
    })
  }
  createFolder(payload: { name: string, order: number }) {
    return http.post(`/todolist/createfolder`, {
      ...payload
    }, {
      headers: authHeader()
    })
  }


}

export default new ToDoList();
