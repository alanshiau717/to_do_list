import { FoldersApiFactory } from "../apiClient";
import http from "../http-common";
import authHeader from "../utils/auth.header";
import authConfig from "../utils/axios.auth.config"


class ToDoList {
  foldersApiFactory = FoldersApiFactory(authConfig,process.env.REACT_APP_EXPRESS_SERVER_BASE_URL,undefined)

  getTask(params: {}) {
    return http.get(`/todolist/`, { headers: authHeader() });
  }
  // getFolder(params: {}) {  
  //   return http.get(`/todolist/getfolder`, {
  //     headers: authHeader(),
  //     params: params,
  //   });
  // }

  async getFolders(){
    const folders = await this.foldersApiFactory.getFolder()
    console.log(folders)
    return folders
  }
  completeTask(taskId: string) {
    return http.post(`/todolist/completetask`, {
      taskId: taskId
    }, {
      headers: authHeader(),
    })
  }
  changeTask(payload: { taskId: string, name?: string, due?: Date, isDeleted?: boolean, list?: string }) {
    return http.post(`/todolist/changetask`, {
      ...payload
    },
      { headers: authHeader() })
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
  deleteFolder(payload: {folderId: string }){
    console.log('hit')
    return http.delete(`/todolist/deletefolder`, {
      headers: authHeader(),
      params: {...payload}
    })
  }
  deleteList(payload: {listId: string}){
    return http.delete(`todolist/deletelist`, {
      headers: authHeader(),
      params: {...payload}
    })
  }



}

export default new ToDoList();
