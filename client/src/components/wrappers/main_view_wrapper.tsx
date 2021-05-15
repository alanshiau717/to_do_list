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
//wrapper for the main view
//will layout the strucutre of the navbar, sidebar and also main todolist view.
//Will have button on navbar allowing sidebar to be moved
//media Query to also remove it

export type Iedittask =
  (action: "complete" | "delete" | "edit" | "add",
    payload: {
      name?: string;
      due?: Date;
      done?: boolean;
      order?: number;
      isDeleted?: boolean;
    } | string)
    => void

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
        this.props.changeListView(this.state.userDetails.inbox)
      })
      .catch((e) => console.log(e));
  }
  editTask: Iedittask = (action, payload) => {
    var folderindex = -1
    var listindex = -1
    var taskindex = -1
    if (action === "complete") {
      if (typeof payload == "string") {
        this.state.folders.forEach(
          (folder, curr_folder_index) => {
            if (folder._id === this.props.activeFolder) {
              folderindex = curr_folder_index
              console.log(folder)
              folder.lists.forEach(
                (list, curr_list_index) => {
                  if (list._id === this.props.activeList) {
                    listindex = curr_list_index
                    list.tasks.forEach(
                      (task, curr_task_index) => {
                        if (task._id === payload) {
                          taskindex = curr_task_index
                        }
                      }
                    )
                  }
                }
              )
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
      console.log('hit delete')
    }
    if (action === "edit") {
      console.log('hit edit')
    }
    if (action === "add") {
      if (typeof payload == "object" && (payload.name) && (payload.order)) {

      }
      console.log('hit create')
    }


  }
  toggleSidebar() {
    if (this.state.sidebaractive) {
      this.setState({ sidebaractive: false });
    } else {
      this.setState({ sidebaractive: true });
    }
  }
  render() {
    const { sidebaractive, folders, userDetails } = this.state;
    const sidebar_props = {
      folders,
      userDetails,
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
            <SideBar {...sidebar_props} />
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
