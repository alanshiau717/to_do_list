import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GetFoldersDocument, GetFoldersQuery } from "../../generated";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import UserAccessService from "../../services/user.access";
import { Navbar } from "react-bootstrap";
import { List, ListTask, Calendar, Calendar3 } from "react-bootstrap-icons";
import "../../css/main_view.scss";
import SidebarFunctional from "../main_view/sidebar/sidebarFunctional";
import {
  changeListView,
  changeMainView,
} from "../../redux/reducers/mainViewSlice";
import CalendarContainer from "../main_view/calendar/calendarContainer";
import GlobalModal from "../main_view/modal/globalModal";
import TaskViewContainer from "../main_view/main_content/TaskViewContainer";

interface Props extends RouteComponentProps {
  activeList: string;
  activeFolder: string;
  changeListView: any;
}

export default function MainViewPage(props: Props) {
  const [sideBarActive, setSideBarActive] = useState(false);
  const [userDetails] = useState(UserAccessService.getCurrentUser());
  const [folders, setFolders] = useState<GetFoldersQuery["folders"]>([]);
  const currentList = useSelector((state: any) => state.mainview.currentList);
  const currentView = useSelector((state: any) => state.mainview.currentView);
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
        dispatch(
          changeListView({
            list_id: userDetails.inbox.toString(),
            folder_id: userDetails.defaultFolder.toString(),
          })
        );
      }
      setFolders(data.folders);
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
      <div id="navbar">
        <Navbar bg="primary">
          <Navbar.Brand href="#home">
            <List onClick={toggleSidebar} size={45} />
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Brand
              href="#home"
              onClick={() => {
                dispatch(changeMainView({ currentView: "calendar" }));
              }}
            >
              <div
                className={`navbar-icon ${
                  currentView == "calendar" ? "navbar-icon-active" : ""
                }`}
              >
                <Calendar3 />
              </div>
            </Navbar.Brand>
            <Navbar.Brand
              href="#home"
              onClick={() => {
                dispatch(changeMainView({ currentView: "tasks" }));
              }}
            >
              <div
                className={`navbar-icon ${
                  currentView == "tasks" ? "navbar-icon-active" : ""
                }`}
              >
                <ListTask />
              </div>
            </Navbar.Brand>
            <div className={"profile-icon"}>
              <div className={"profile-icon-text"}>A</div>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className="wrapper">
        <div>
          <SidebarFunctional
            folders={folders}
            userDetails={userDetails}
            sidebarActive={sideBarActive}
          />
        </div>
        <div id="content">
          <GlobalModal />
          {currentView == "tasks" ? (
            <TaskViewContainer folders={folders} />
          ) : null}
          {currentView == "calendar" ? (
            <CalendarContainer folders={folders} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
