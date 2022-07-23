import {GetFoldersQuery} from "../../../generated";
import React, {useContext, useEffect, useState} from "react";
import {Accordion, AccordionContext, useAccordionToggle} from "react-bootstrap";
import {RenderProps, SidebarElementRender} from "./sidebar_element";
import {ChevronDown, ChevronRight, Folder, List} from "react-bootstrap-icons";
import {UserDetails} from "../../../services/user.access";
import {useDispatch} from "react-redux";
import { openFolderModal, openListModal} from "../../../redux/reducers/modalSlice";
import SidebarFoldersAccordion from "./SidebarFolderAccordion";


interface Props {
    folders: GetFoldersQuery["folders"];
    userDetails: UserDetails;
}

interface ContextAwareToggle {
    eventKey: string;
    defaultFolder: string;
    changeEventKey(): any;
}

function ContextAwareToggle(props: ContextAwareToggle) {
    const dispatch = useDispatch()
    const currentEventKey = useContext(AccordionContext);
    const decoratedOnClick = useAccordionToggle(
        props.eventKey,
        () => {
            props.changeEventKey()
        },
    );
    const folderDropDownProps: RenderProps["dropDownMenu"] = [
        {
            name: "Add List", function: () => {
                dispatch(openListModal({props: {folderId: props.defaultFolder}}))
            }
        },
        {
            name: "Add Folder", function: () => {
                dispatch(openFolderModal())
            }
        }
    ]
    const isCurrentEventKey = currentEventKey === props.eventKey;

    return (
        <SidebarElementRender fontWeight="Bold" onClick={(event: any) => {
            decoratedOnClick(event)
        }} icon={isCurrentEventKey ? ChevronDown : ChevronRight} name={"Projects"} dropDownMenu={folderDropDownProps}/>
    );
}

function getDefaultLists(folders: GetFoldersQuery["folders"], defaultFolder: string, inbox: string): GetFoldersQuery["folders"][0]["lists"] {
    let defaultLists: GetFoldersQuery["folders"][0]["lists"] = []
    folders.forEach(
        (folder) => {
            if (folder._id == defaultFolder) {
                folder.lists.forEach((list) => {
                    if (list._id !== inbox) {
                        defaultLists.push(list)
                    }
                })
            }
        }
    )
    return defaultLists
}

function getNonDefaultFolders(folders: GetFoldersQuery["folders"], defaultFolder: string): GetFoldersQuery["folders"] {
    let nonDefaultFolders: GetFoldersQuery["folders"] = []
    folders.forEach(
        (folder) => {
            if(folder._id !== defaultFolder) {
                nonDefaultFolders.push(folder)
            }
        }
    )
    return nonDefaultFolders
}

export default function ProjectsAccordion(props: Props) {

    const {folders, userDetails} = props

    let defaultLists = getDefaultLists(folders, userDetails.defaultFolder.toString(), userDetails.inbox.toString())
    let nonDefaultFolders = getNonDefaultFolders(folders, userDetails.defaultFolder.toString())
    const [activeKey, setActiveKey] = useState<string | undefined>(undefined)

    function toggleAccordion(eventKey: string) {
        if(activeKey==eventKey){
            setActiveKey(undefined)
        } else {
            setActiveKey(eventKey)
        }
    }

    return (
        <Accordion activeKey={activeKey}>
            <ContextAwareToggle eventKey={"1"} defaultFolder={userDetails.defaultFolder.toString()} changeEventKey={() => {
                toggleAccordion("1")
            }}/>
            <Accordion.Collapse eventKey={"1"}>
                <div>
                    {defaultLists.map(list => {
                        return (
                            <SidebarElementRender icon={List} name={list.name}/>
                        )
                    })}
                    {nonDefaultFolders.map(folder => {
                        return (
                            <SidebarFoldersAccordion folder={folder}></SidebarFoldersAccordion>
                        )
                    })}

                </div>
            </Accordion.Collapse>
        </Accordion>
    )

}

