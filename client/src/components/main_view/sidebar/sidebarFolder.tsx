import { Component, useState } from "react";
import { Accordion, Nav, Dropdown } from "react-bootstrap";
import { changeListView } from "../../../redux/reducers/mainViewSlice";
import { connect } from "react-redux";
import { ThreeDotsVertical, Folder } from "react-bootstrap-icons";
import ListUnit from "./list_unit";
import AddModalList from "./add_modal_list";
import {
  GetFoldersQuery,
  ModifyFolderDocument,
} from "../../../generated";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";

interface Props {
  folder: GetFoldersQuery["folders"][0];
  // changeListView: any;
  // editFolder: Ieditfolder;
  // editList: Ieditlist;
}

export default function SidebarFolder(props: Props) {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [currFolder, setCurrFolder] = useState("");
  const [modifyFolder, { data, loading, error }] = useMutation(
    ModifyFolderDocument,
  );
  function closeModal() {
    setModalShow(false);
  }
  function openModal(folder_id: string) {
    setModalShow(true);
    setCurrFolder(folder_id);
  }

  function changeListViewHandler(listid: string, folderid: string) {
    var payload = {
      list_id: listid,
      folder_id: folderid,
    };
    dispatch(changeListView(payload));
  }
  function changeHover(state: boolean) {
    setHover(state);
  }
  return (
    <Accordion
      key={props.folder._id}
      defaultActiveKey="-1"
      onMouseLeave={() => changeHover(false)}
      onMouseEnter={() => changeHover(true)}
    >
      <Accordion.Toggle
        as={Nav.Link}
        variant="link"
        eventKey={props.folder._id}
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
            {props.folder.name}
          </div>
          <div
            style={{
              gridColumn: "3 / 4",
            }}
          >
            {hover && (
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  as={ThreeDotsVertical}
                />
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      openModal(props.folder._id);
                    }}
                    as="div"
                  >
                    Add List
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      modifyFolder({
                        variables: {
                          data: {
                            id: parseInt(props.folder._id),
                            isDeleted: true,
                          },
                        },
                      });
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

      <Accordion.Collapse eventKey={props.folder._id}>
        {/* <Card.Body> */}
        <div>
          {props.folder.lists.map((list) => {
            return (
              !list.isDeleted && (
                <div key={list._id}>
                  <ListUnit
                    list={list}
                    folderId={props.folder._id}
                    noDelete={false}
                    // editList={this.props.editList}
                  />
                </div>
              )
            );
          })}
        </div>
        {/* </Card.Body> */}
      </Accordion.Collapse>
      <AddModalList
        folderId={currFolder}
        // editList={this.props.editList}
        closeModal={closeModal}
        modalShow={modalShow}
      />
    </Accordion>
  );
}
