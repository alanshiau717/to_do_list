import React, {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {GetFoldersDocument, GetFoldersQuery} from "../../generated";
import {useDispatch, useSelector} from "react-redux";
import {RouteComponentProps} from "react-router-dom";
import UserAccessService from "../../services/user.access";
import {Navbar} from "react-bootstrap";
import {List} from "react-bootstrap-icons";
import "../../css/main_view.css";
import SidebarFunctional from "../main_view/sidebar/sidebarFunctional";
import {changeListView} from "../../redux/reducers/mainViewSlice";
import Calendar from "../main_view/calendar/calendarContainer";
import GlobalModal from "../main_view/modal/globalModal";
import TaskViewContainer from "../main_view/main_content/TaskViewContainer";

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
    const currentView = useSelector(
        (state: any) => state.mainview.currentView,
    );
    const {loading, error, data} = useQuery(GetFoldersDocument);
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
            <div id="navbar">
                <Navbar bg="primary" expand="lg">
                    <Navbar.Brand href="#home">
                        <List onClick={toggleSidebar} size={45}/>
                    </Navbar.Brand>
                </Navbar>
            </div>

            <div className="wrapper">
                <div
                >
                    <SidebarFunctional
                        folders={folders}
                        userDetails={userDetails}
                        sidebarActive={sideBarActive}
                    />
                </div>
                <div id="content">
                    <GlobalModal />
                    {currentView == "tasks" ? (

                            <TaskViewContainer folders={folders}/>
                            // <SidebarTaskContainer folders={folders}/>

                    ) : null}
                    {currentView == "calendar" ? (
                        <Calendar folders={folders}/>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
