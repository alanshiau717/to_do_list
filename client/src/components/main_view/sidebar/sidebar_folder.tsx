import React, { Component } from "react";
import { Accordion, Nav, Dropdown } from "react-bootstrap";
import { changeListView } from "../../../redux/reducers/mainViewSlice";
import { connect } from "react-redux";
import IFolder from "../../../models/client/folder";
import { ThreeDotsVertical, Folder } from "react-bootstrap-icons";
import {
  Ieditfolder,
  Ieditlist,
} from "../../wrappers/main_view_wrapper";
import ListUnit from "./list_unit";
import AddModalList from "./add_modal_list";

interface Props {
  folder: IFolder;
  changeListView: any;
  editFolder: Ieditfolder;
  editList: Ieditlist;
}
interface State {
  hover: boolean;
  modalShow: boolean;
  currFolder: string;
}
//folder and list props passed into it
//folder will be created and lists will be passed into another list
class SidebarFolder extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hover: false,
      modalShow: false,
      currFolder: "",
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.changeListViewHandler =
      this.changeListViewHandler.bind(this);
    this.changeHover = this.changeHover.bind(this);
  }
  closeModal() {
    this.setState({ modalShow: false });
  }
  openModal(folder_id: string) {
    this.setState({ modalShow: true, currFolder: folder_id });
  }
  changeListViewHandler(listid: string, folderid: string) {
    var payload = {
      list_id: listid,
      folder_id: folderid,
    };

    this.props.changeListView(payload);
  }
  changeHover(state: boolean) {
    this.setState({ hover: state });
  }
  componentDidMount() {}
  render() {
    const { folder } = this.props;
    return (
      <Accordion
        key={folder._id}
        defaultActiveKey="-1"
        onMouseLeave={() => this.changeHover(false)}
        onMouseEnter={() => this.changeHover(true)}
      >
        <Accordion.Toggle
          as={Nav.Link}
          variant="link"
          eventKey={folder._id}
          style={{ padding: "0px" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "30px auto 30px",
            }}
          >
            <div
              style={{
                gridColumn: "1 / 2",
              }}
            >
              <Folder />
            </div>
            <div
              style={{
                gridColumn: "2 / 3",
                justifySelf: "start",
                maxWidth: "100%",
              }}
              className="text-truncate"
            >
              {folder.name}
            </div>
            <div
              style={{
                gridColumn: "3 / 4",
              }}
            >
              {this.state.hover && (
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    as={ThreeDotsVertical}
                  />
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        this.openModal(folder._id);
                      }}
                      as="div"
                    >
                      Add List
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        this.props.editFolder("delete", folder._id);
                      }}
                      as="div"
                    >
                      Delete Folder
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </div>
        </Accordion.Toggle>

        <Accordion.Collapse eventKey={folder._id}>
          {/* <Card.Body> */}
          <div>
            {folder.lists.map((list) => {
              return (
                !list.isDeleted && (
                  <div key={list._id}>
                    <ListUnit
                      list={list}
                      folderId={folder._id}
                      editList={this.props.editList}
                    />
                  </div>
                )
              );
            })}
          </div>
          {/* </Card.Body> */}
        </Accordion.Collapse>
        <AddModalList
          folderId={this.state.currFolder}
          editList={this.props.editList}
          closeModal={this.closeModal}
          modalShow={this.state.modalShow}
        />
      </Accordion>
    );
  }
}

export default connect(null, { changeListView })(SidebarFolder);

// export default withRouter(
//   connect(null, { changeListView })(SidebarFolder),
// );
