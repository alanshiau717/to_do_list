import { RouteComponentProps, withRouter } from "react-router-dom";
import {UserDetails} from "../../services/user.access"
import IFolder from "../../models/client/folder";
import { useEffect, useState } from "react";
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
  interface State {
    sidebaractive: boolean;
    folders: IFolder[];
    userDetails: UserDetails;
  }
  


function MainViewPage(props: Props) {
    const [sideBarActive, setSideBarActive] = useState(false)
    
}