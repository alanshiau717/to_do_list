import { Component } from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";
import IFolder from "../../../models/client/folder";
import SidebarFolder from "./sidebar_folder";
import IJWT from "../../../models/shared/jwt";
import { connect } from "react-redux"
import { changeListView } from "../../../redux/reducers/mainViewSlice"

interface Props extends RouteComponentProps {
  folders: IFolder[];
  userDetails: IJWT;
  changeListView: any;
}
interface State { }

//This component is a skeleton for the sidebart
//Will take data regarding folders and lists and pass them to children props
//which will render the folders and lists
//It will however render the default folders - Inbox etc

class SideBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.changeListViewHandler = this.changeListViewHandler.bind(this)
  }
  changeListViewHandler() {
    this.props.changeListView(this.props.userDetails.inbox)
  }
  render() {
    const { folders, userDetails } = this.props;
    return (
      <div>
        {folders.map((folder) => {
          return folder._id !== userDetails.default_folder ? (
            <SidebarFolder folder={folder} key={folder._id} />
          ) : (
            <button key={folder._id} onClick={this.changeListViewHandler}>
              "Inbox"
            </button>
          );
        })}
      </div>
    );
  }
}


// export default connect(null, {changeListView})(SideBar)
export default withRouter(connect(null, { changeListView })(SideBar))
// export default withRouter(SideBar);
