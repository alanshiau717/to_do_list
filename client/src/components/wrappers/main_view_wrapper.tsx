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
import { changeView } from "../../redux/reducers/mainViewSlice";

//wrapper for the main view
//will layout the strucutre of the navbar, sidebar and also main todolist view.
//Will have button on navbar allowing sidebar to be moved
//media Query to also remove it

interface Props extends RouteComponentProps {
  activeFolder: string;
}
interface State {
  sidebaractive: boolean;
  folders: IFolder[];
  userDetails: IJWT;
}

export class MainViewPage extends Component<Props, State> {
  // const dispatch = useAppDispatch();
  // dispatch(changeView("hellow this is a test"));
  // console.log(useAppSelector(selectView));
  // const test = useAppSelector{}
  constructor(props: Props) {
    super(props);
    this.state = {
      sidebaractive: false,
      folders: [],
      userDetails: UserAccessService.getCurrentUser(),
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.getValue = this.getValue.bind(this);
  }
  componentDidMount() {
    console.log(this.getValue());
    MainService.getFolder({})
      .then((response) => {
        this.setState({ folders: response.data });
      })
      .catch((e) => console.log(e));
  }

  toggleSidebar() {
    if (this.state.sidebaractive) {
      this.setState({ sidebaractive: false });
    } else {
      this.setState({ sidebaractive: true });
    }
  }

  getValue() {
    return this.props.activeFolder;
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

const mapStateToProps = (state: any) => {
  return { activeFolder: state.mainview.currentList };
};

export default connect(mapStateToProps, { changeView })(MainViewPage);
