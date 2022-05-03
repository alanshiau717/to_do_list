// import { RouteComponentProps, withRouter } from "react-router-dom";
// import { UserDetails } from "../../services/user.access";
// import IFolder from "../../models/client/folder";
import { useEffect, useState } from "react";
// import UserAccessService from "../../services/user.access";
import { useQuery } from "@apollo/client";
import { GetFoldersDocument, GetFoldersQuery } from "../../generated";
import { useDispatch, useSelector } from "react-redux";
// import { changeListView } from "../../redux/reducers/mainViewSlice";
// import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import UserAccessService from "../../services/user.access";
import { Navbar } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import "../../css/main_view.css";
import SideBar from "../main_view/sidebar/sidebar";
import MainService from "../../services/main.service";
import IFolder from "../../models/client/folder";
import { changeListView } from "../../redux/reducers/mainViewSlice";
import SidebarTaskContainer from "../main_view/main_content/main_content_container";
import update from "immutability-helper";
import { UserDetails } from "../../services/user.access";

export type Iedittask = (
  action: "complete" | "delete" | "edit" | "add",
  payload:
    | {
        name?: string;
        due?: Date;
        done?: boolean;
        order?: number;
        isDeleted?: boolean;
        _id: string;
      }
    | string,
) => void;

export type Ieditlist = (
  action: "add" | "delete" | "edit",
  payload:
    | {
        name?: string;
        created?: Date;
        user?: string;
        isDeleted?: string;
        order?: number;
        folderId: string;
        listId?: string;
      }
    | string,
) => void;

export type Ieditfolder = (
  action: "add" | "delete" | "edit",
  payload:
    | {
        name?: string;
        created?: Date;
        user?: string;
        isDeleted?: string;
        order?: number;
        _id: string;
      }
    | string,
) => void;

interface Props extends RouteComponentProps {
  activeList: string;
  activeFolder: string;
  changeListView: any;
}

export default function MainViewPage(props: Props) {
  const [sideBarActive, setSideBarActive] = useState(false);
  const [userDetails, setUserDetails] = useState(
    UserAccessService.getCurrentUser(),
  );
  const [folders, setFolders] = useState<GetFoldersQuery["folders"]>(
    [],
  );
  // const [folders, folderDispatch] = useReducer(reducer, []);
  const currentList = useSelector(
    (state: any) => state.mainview.currentList,
  );
  const { loading, error, data } = useQuery(GetFoldersDocument);
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    if (sideBarActive) {
      setSideBarActive(false);
    } else {
      setSideBarActive(true);
    }
  };
  useEffect(() => {
    if (data) {
      if (currentList == null) {
        console.log("changing List view from mainViewWrapper");
        dispatch(
          changeListView({
            list_id: userDetails.inbox.toString(),
            folder_id: userDetails.defaultFolder.toString(),
            test: "mainviewwrapper",
          }),
        );
      }
      setFolders(data.folders);
    }
    if (error) {
      console.log(error);
    }
    if (loading) {
      console.log("loading");
    }
  }, [
    data,
    dispatch,
    userDetails.inbox,
    userDetails.defaultFolder,
    error,
    loading,
  ]);
  return (
    <div id="outer_wrapper">
      <Navbar bg="primary" expand="lg">
        <Navbar.Brand href="#home">
          <List onClick={toggleSidebar} />
        </Navbar.Brand>
      </Navbar>
      <div className="wrapper">
        <div
          id="sidebar"
          className={`${sideBarActive ? "active" : ""}`}
        >
          <SideBar
            folders={folders}
            userDetails={userDetails}
            // changeListView={changeListView}
            // {...folders}
            // editList={editList}
            // editFolder={editFolder}
          />
        </div>
        <div id="content">
          <div>
            <SidebarTaskContainer folders={folders} />
          </div>
        </div>
      </div>
    </div>
  );
}
