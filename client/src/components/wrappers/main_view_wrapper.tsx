import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import UserAccessService from "../../services/user.access";
import { Navbar } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import "../../css/main_view.css";
import SideBar from "../main_view/sidebar/sidebar";
import MainService from "../../services/main.service";
import IFolder from "../../models/client/folder";
import IJWT from "../../models/shared/jwt";
import { connect } from "react-redux";
import { changeListView } from "../../redux/reducers/mainViewSlice";
import SidebarTaskContainer from '../main_view/sidebar/sidebar_listcontainer'
import update from 'immutability-helper';



export type Iedittask =
  (action: "complete" | "delete" | "edit" | "add",
    payload: {
      name?: string;
      due?: Date;
      done?: boolean;
      order?: number;
      isDeleted?: boolean;
      _id: string
    } | string)
    => void

export type Ieditlist =
  (action: "add" | "delete" | "edit",
    payload: {
      name?: string,
      created?: Date,
      user?: string,
      isDeleted?: string,
      order?: number
      folderId: string
      listId: string
    } | string) => void

export type Ieditfolder =
  (action: "add" | "delete" | "edit",
    payload: {
      name?: string,
      created?: Date,
      user?: string,
      isDeleted?: string,
      order?: number
      _id: string
    } | string) => void


interface Props extends RouteComponentProps {
  activeList: string;
  activeFolder: string;
  changeListView: any
}
interface State {
  sidebaractive: boolean;
  folders: IFolder[];
  userDetails: IJWT;
}

//wrapper for the main view
//will layout the strucutre of the navbar, sidebar and also main todolist view.
//Will have button on navbar allowing sidebar to be moved
//media Query to also remove it
//Most logic will be defined and executed from this class
export class MainViewPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sidebaractive: false,
      folders: [],
      userDetails: UserAccessService.getCurrentUser(),
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.editTask = this.editTask.bind(this)
  }

  componentDidMount() {
    MainService.getFolder({})
      .then((response) => {
        // setting up props
        this.setState({ folders: response.data });
        this.props.changeListView(
          {
            list_id: this.state.userDetails.inbox,
            folder_id: this.state.userDetails.default_folder
          })
      })
      .catch((e) => console.log(e));
  }
  editTask: Iedittask = (action, payload) => {
    var folderindex = -1
    var listindex = -1
    var taskindex = -1
    this.state.folders.forEach(
      (folder, curr_folder_index) => {
        if (folder._id === this.props.activeFolder) {
          folderindex = curr_folder_index
          folder.lists.forEach(
            (list, curr_list_index) => {
              if (list._id === this.props.activeList) {
                listindex = curr_list_index
              }
            }
          )
        }
      }
    )
    if (action === "complete") {
      if (typeof payload == "string") {
        this.state.folders[folderindex].lists[listindex].tasks.forEach(
          (task, curr_task_index) => {
            if (task._id === payload) {
              taskindex = curr_task_index
            }
          }
        )
        this.setState(
          {
            folders: update(this.state.folders, {
              [folderindex]: {
                lists: {
                  [listindex]: {
                    tasks: {
                      [taskindex]: {
                        done: { $set: true }
                      }
                    }
                  }
                }
              }
            }
            )
          })
        MainService.completeTask(payload)
          .then((response) => {
            console.log(response)
          })
      }
      else {
        console.log("Something went wrong in adding a task, payload was not a string")
      }
    }
    if (action === "delete") {
      if (typeof payload == "string") {
        this.state.folders[folderindex].lists[listindex].tasks.forEach(
          (task, curr_task_index) => {
            if (task._id === payload) {
              taskindex = curr_task_index
            }
          }
        )
        this.setState(
          {
            folders: update(this.state.folders, {
              [folderindex]: {
                lists: {
                  [listindex]: {
                    tasks: { $splice: [[taskindex, 1]] }
                  }
                }
              }
            }
            )
          }
        )
        MainService.changeTask({taskId: payload, isDeleted: true})
      }
      else {
        console.log("Something went wrong in adding a task, payload was not a string")
      }
    }
    if (action === "edit") {
      if (typeof payload == "object") {
        this.state.folders[folderindex].lists[listindex].tasks.forEach(
          (task, curr_task_index) => {
            if (task._id === payload._id) {
              taskindex = curr_task_index
            }
          }
        )
        for (const [key, value] of Object.entries(payload)) {
          if (key !== "_id") {
            this.setState(
              {
                folders: update(this.state.folders, {
                  [folderindex]: {
                    lists: {
                      [listindex]: {
                        tasks: {
                          [taskindex]: {
                            [key]: { $set: value }
                          }
                        }
                      }
                    }
                  }
                }
                )
              })
            MainService.changeTask({ taskId: payload._id, [key]: value })


          }
        }

      }
      else {
        console.log('something went wrong when editing a task')
      }
    }
    if (action === "add") {
      if (typeof payload == "string") {
        console.log(this.state.folders[folderindex].lists[listindex].tasks)
        const last_index = this.state.folders[folderindex].lists[listindex].tasks.length
        this.setState(
          {
            folders: update(this.state.folders, {
              [folderindex]: {
                lists: {
                  [listindex]: {
                    tasks: {
                      $push: [{
                        name: payload,
                        created: new Date(),
                        done: false,
                        order: 0,
                        isDeleted: false,
                        list: this.props.activeList,
                        _id: "",
                        user: ""
                      }]
                    }
                  }
                }
              }
            }
            )
          })

        MainService.createTask({
          name: payload,
          list: this.props.activeList,
          order: 0
        }).then(
          resp => {
            this.setState(
              {
                folders: update(this.state.folders, {
                  [folderindex]: {
                    lists: {
                      [listindex]: {
                        tasks: {
                          [last_index]: {
                            $set: resp.data
                          }
                        }
                      }
                    }
                  }
                }
                )
              })

          }
        ).catch(err => {
          console.log()
        })
      }
      else {
        console.log('something went wrong when adding a task')
      }
      console.log('hit create')
    }


  }
  editFolder: Ieditfolder = (action, payload) => {
  
    if (action === "delete") {
      var folderindex = -1
      this.state.folders.forEach(
        (folder, curr_folder_index) => {
          if (folder._id === payload) {
            folderindex = curr_folder_index
          }
        }
      )
  
      if (typeof payload === "string") {
          this.setState({
            folders: update(this.state.folders, {
              $splice: [[folderindex, 1]]
            })
          })
          MainService.deleteFolder({folderId: payload})
          if(payload === this.props.activeFolder){
            this.props.changeListView({list_id: this.state.userDetails.inbox, folder_id: this.state.userDetails.default_folder})
          }
      } else {
        console.log('List Delete Failed, wrong payload')
      }
    }
    if (action === "add") {
      if (typeof payload === "string") {
        const last_index = this.state.folders.length
        this.setState(
          {
            folders: update(this.state.folders, {
              $push: [{
                _id: "",
                lists: [],
                name: payload,
                created: new Date(),
                done: false,
                order: 0,
                isDeleted: false,
                user: ""
              }]
            }
            )
          })

        MainService
          .createFolder({ name: payload, order: 0 })
          .then(resp => {
            this.setState(
              {
                folders: update(this.state.folders, {
                  [last_index]: { $set: resp.data }
                }
                )
              })
          })


      }
      else {
        console.log('List add failed, wrong payload')
      }
    }
    if (action === "edit") {
      if (typeof payload === "object") { }
      else {
        console.log('List Edit Failed, wrong payload')
      }

    }
  }
  toggleSidebar() {
    if (this.state.sidebaractive) {
      this.setState({ sidebaractive: false });
    } else {
      this.setState({ sidebaractive: true });
    }
  }
  editList: Ieditlist = (action, payload) => {
    if (action === "delete") {
      var folderindex = -1
      var listindex = -1
      if (typeof payload === "object") {
        this.state.folders.forEach(
          (folder, curr_folder_index) => {
            if (folder._id === payload.folderId) {
              folderindex = curr_folder_index
              folder.lists.forEach(
                (list, curr_list_index) => {
                  if (list._id === payload.listId) {
                    listindex = curr_list_index
                  }
                }
              )
            }
          }
        )
        this.setState({
          folders: update(this.state.folders, {
            [folderindex]: {
              lists: {
                $splice: [[listindex, 1]]
              }
            }
          })
        })
        MainService.deleteList({listId: payload.listId})
      } else {
        console.log('List Delete Failed, wrong payload')
      }
    }
    if (action === "add") {
      if (typeof payload === "string") {
        const last_index = this.state.folders[0].lists.length
        this.setState(
          {
            folders: update(this.state.folders, {
              0: {
                lists: {
                  $push: [{
                    // name: payload,
                    // create: new Date(),
                    // done: false,
                    // order: 0,
                    // isDeleted: false
                    name: payload,
                    created: new Date(),
                    user: "",
                    isDeleted: false,
                    order: 0,
                    tasks: [],
                    _id: "",
                    folder: this.state.userDetails.default_folder
                  }]
                }

              }
            }
            )
          })

        MainService
          .createList({ name: payload, order: 0, folder: this.state.userDetails.default_folder })
          .then(resp => {
            this.setState(
              {
                folders: update(this.state.folders, {
                  0: {
                    lists: {
                      [last_index]: { $set: resp.data }
                    }

                  }
                }
                )
              })
          })


      }
      else {
        console.log('List add failed, wrong payload')
      }
    }
    if (action === "edit") {
      if (typeof payload === "object") { }
      else {
        console.log('List Edit Failed, wrong payload')
      }

    }

  }
  render() {
    const { sidebaractive, folders, userDetails } = this.state;
    const sidebar_props = {
      folders,
      userDetails
    };
    return (
      <div id="outer_wrapper">
        <Navbar bg="primary" expand="lg">
          <Navbar.Brand href="#home">
            <List onClick={this.toggleSidebar} />
          </Navbar.Brand>
        </Navbar>
        <div className="wrapper">
          <div id="sidebar" className={`${sidebaractive ? "active" : ""}`}>
            <SideBar {...sidebar_props} editList={this.editList} editFolder={this.editFolder}/>
          </div>
          <div id="content">
            <div>
              <SidebarTaskContainer folders={this.state.folders} editTask={this.editTask} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return { activeList: state.mainview.currentList, activeFolder: state.mainview.currentFolder };
};

export default connect(mapStateToProps, { changeListView })(MainViewPage);
