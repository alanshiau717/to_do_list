import { Component } from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";
import IFolder from "../../../models/client/folder";
import SidebarFolder from "./sidebar_folder";
import IJWT from "../../../models/shared/jwt";
import { connect } from "react-redux"
import { changeListView } from "../../../redux/reducers/mainViewSlice"
import { Ieditlist } from "../../wrappers/main_view_wrapper"
import { Modal, Button } from "react-bootstrap"
interface Props extends RouteComponentProps {
  folders: IFolder[];
  userDetails: IJWT;
  changeListView: any;
  editList: Ieditlist
}
interface State {
  modalShow: boolean,
  newListName: string
}

//This component is a skeleton for the sidebart
//Will take data regarding folders and lists and pass them to children props
//which will render the folders and lists
//It will however render the default folders - Inbox etc

class SideBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.changeListViewHandler = this.changeListViewHandler.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      modalShow: false,
      newListName: ""
    }
  }
  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      newListName: e.target.value
    })
  }
  openModal() {
    this.setState({
      modalShow: true
    })
  }
  closeModal() {
    this.setState({
      modalShow: false
    })
  }
  handleSubmit(e: React.FormEvent) {
    this.props.editList('add', this.state.newListName)
    e.preventDefault();
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
            <div>
              <div>
                {folder.lists.map((list) => {
                  return <div>
                    <button key={list._id} onClick={this.changeListViewHandler}>
                      {list.name}
                    </button>
                  </div>
                })}
              </div>
              <div>
                <button onClick={() => this.openModal()}>Add List</button>
              </div>
            </div>
          );
        })
        }
        <Modal show={this.state.modalShow} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Please enter list name</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <label>
                Name:
              <input type="text" value={this.state.newListName} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div >
    );
  }
}


// export default connect(null, {changeListView})(SideBar)
export default withRouter(connect(null, { changeListView })(SideBar))
// export default withRouter(SideBar);
