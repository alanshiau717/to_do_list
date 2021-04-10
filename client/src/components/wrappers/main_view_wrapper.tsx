import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import UserAccessService from "../../services/user.access";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import "../../css/main_view.css";
import SideBar from "../main_view/sidebar/sidebar";
import MainService from "../../services/main.service";
import IFolder from "../../models/client/folder";
import IJWT from "../../models/shared/jwt";
//wrapper for the main view
//will layout the strucutre of the navbar, sidebar and also main todolist view.
//Will have button on navbar allowing sidebar to be moved
//media Query to also remove it

interface Props extends RouteComponentProps {}
interface State {
  sidebaractive: boolean;
  folders: IFolder[];
  userDetails: IJWT;
}

export default class MainViewPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sidebaractive: false,
      folders: [],
      userDetails: UserAccessService.getCurrentUser(),
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }
  componentDidMount() {
    MainService.getFolder({})
      .then((response) => {
        this.setState({ folders: response.data });
      })
      .catch((e) => console.log(e));
    // this.setState({ userDetails: UserAccessService.getCurrentUser() });
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
            <div>Test Content</div>
          </div>
        </div>
      </div>
    );
  }
}
