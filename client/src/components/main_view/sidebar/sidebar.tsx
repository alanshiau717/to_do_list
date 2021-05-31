import { Component } from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";
import IFolder from "../../../models/client/folder";
import SidebarFolder from "./sidebar_folder";
import IJWT from "../../../models/shared/jwt";
import { connect } from "react-redux"
import { changeListView } from "../../../redux/reducers/mainViewSlice"
import { Ieditlist, Ieditfolder } from "../../wrappers/main_view_wrapper"
import { Modal, Button, Navbar, Nav, Row, Container, Col} from "react-bootstrap"
import { Plus} from "react-bootstrap-icons"

import ListUnit from "./list_unit"
interface Props extends RouteComponentProps {
  folders: IFolder[];
  userDetails: IJWT;
  changeListView: any;
  editList: Ieditlist;
  editFolder: Ieditfolder
}
interface State {
  modalShow: boolean,
  newItemName: string,
  modalSetting: 'list' | 'folder' | ""
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
      newItemName: "",
      modalSetting: ""
    }
  }
  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      newItemName: e.target.value
    })
  }
  openModal(item: "folder" | "list") {
    this.setState({
      modalSetting: item,
      modalShow: true
    })
  }
  closeModal() {
    this.setState({
      modalShow: false
    })
  }
  handleSubmit(e: React.FormEvent) {
    if (this.state.modalSetting === 'folder') {
      this.props.editFolder('add', this.state.newItemName)
    }
    else if (this.state.modalSetting === 'list') {
      this.props.editList('add', this.state.newItemName)
    }
    else {
      console.log('An error has occured adding a list or folder')
    }

    e.preventDefault();
  }
  changeListViewHandler(listid: string, folderid: string) {
    var payload = {
      list_id: listid,
      folder_id: folderid
    }
    this.props.changeListView(payload)
  }
  render() {
    const { folders, userDetails } = this.props;
    return (
    <Navbar>
      <Nav className="flex-column" style={{maxWidth: "100%", minWidth: "100%"}}>
      <div>
        {folders.map((folder) => {
          return folder._id !== userDetails.default_folder ? (
            (!folder.isDeleted &&  <SidebarFolder folder={folder} key={folder._id} editFolder={this.props.editFolder} editList={this.props.editList}/>)
          ) : (
            <div key={folder._id}>
              <Container style={{padding: "0px"}}>
              <Row style={{maxWidth: "100%", minWidth: "100%"}} >
              <Col>
              <Nav.Item>Lists 
              </Nav.Item>
              </Col>
              <Col className="ml-auto" md="auto" >
              <Plus onClick={()=> this.openModal('list')} style={{cursor:'pointer'}}/>
              </Col>
              </Row>
              </Container>
              <div>
                {folder.lists.map((list) => {
                  return <div key={list._id}>
                    <ListUnit list = {list} folderId= {folder._id} editList={this.props.editList}/>
                  </div>
                })}
              </div>
              <Container style={{padding: "0px"}}>
              <Row style={{maxWidth: "100%", minWidth:"100%"}}>
                <Col>
              <Nav.Item>Folders 
              </Nav.Item>
              </Col> 
              <Col className="ml-auto" md="auto">
              <Plus onClick={() => this.openModal('folder')} style={{cursor:'pointer'}}/>
              </Col>
              </Row>
              </Container>

            </div>
          );
        })
        }
        <Modal show={this.state.modalShow} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Please enter {this.state.modalSetting} name</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <label>
                Name:
              <input type="text" value={this.state.newItemName} onChange={this.handleChange} />
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
      </Nav>
      </Navbar>
    );
  }
}


// export default connect(null, {changeListView})(SideBar)
export default withRouter(connect(null, { changeListView })(SideBar))
// export default withRouter(SideBar);
