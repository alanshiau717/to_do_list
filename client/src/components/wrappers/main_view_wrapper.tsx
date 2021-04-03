import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
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

//wrapper for the main view
//will layout the strucutre of the navbar, sidebar and also main todolist view.
//Will have button on navbar allowing sidebar to be moved
//media Query to also remove it

interface Props extends RouteComponentProps {}
interface State {
  sidebaractive: boolean;
}

export default class MainViewPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sidebaractive: false,
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }
  toggleSidebar() {
    if (this.state.sidebaractive) {
      this.setState({ sidebaractive: false });
    } else {
      this.setState({ sidebaractive: true });
    }
  }
  render() {
    const { sidebaractive } = this.state;
    return (
      <div id="outer_wrapper">
        <Navbar bg="primary" expand="lg">
          <Navbar.Brand href="#home">
            <List onClick={this.toggleSidebar} />
          </Navbar.Brand>
        </Navbar>
        <div className="wrapper">
          <div id="sidebar" className={`${sidebaractive ? "active" : ""}`}>
            <div>Test Sidebar</div>
          </div>
          <div id="content">
            <div>Test Content</div>
          </div>
        </div>
      </div>
    );
  }
}
