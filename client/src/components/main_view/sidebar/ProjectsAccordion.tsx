import {GetFoldersQuery} from "../../../generated";
import React, {useContext, useEffect, useState} from "react";
import {Accordion, AccordionContext, useAccordionToggle} from "react-bootstrap";
import {RenderProps, SidebarElementRender} from "./sidebar_element";
import {ChevronDown, ChevronRight, List} from "react-bootstrap-icons";
import {UserDetails} from "../../../services/user.access";
import {useDispatch} from "react-redux";
import {CurrentModal, openFolderModal, openListModal, openModal} from "../../../redux/reducers/modalSlice";


interface Props {
    folders: GetFoldersQuery["folders"];
    userDetails: UserDetails;
}


// @ts-ignore
function ContextAwareToggle({eventKey, callback, defaultFolder, changeEventKey}) {
    const dispatch = useDispatch()
    const currentEventKey = useContext(AccordionContext);
    const decoratedOnClick = useAccordionToggle(
        eventKey,
        () => {
            callback && callback(eventKey)
            changeEventKey()
        },
    );
    const folderDropDownProps: RenderProps["dropDownMenu"] = [
        {
            name: "Add List", function: () => {
                dispatch(openListModal({props: {folderId: defaultFolder}}))
            }
        },
        {
            name: "Add Folder", function: () => {
                dispatch(openFolderModal({props: {folderId: defaultFolder}}))
            }
        }
    ]
    const isCurrentEventKey = currentEventKey === eventKey;

    return (
        <SidebarElementRender fontWeight="Bold" onClick={(event: any) => {
            decoratedOnClick(event)
        }} icon={isCurrentEventKey ? ChevronDown : ChevronRight} name={"Projects"} dropDownMenu={folderDropDownProps}/>
    );
}

function getDefaultLists(folders: GetFoldersQuery["folders"], defaultFolder: string, inbox: string): GetFoldersQuery["folders"][0]["lists"] {
    let test: GetFoldersQuery["folders"][0]["lists"] = []
    folders.forEach(
        (folder) => {
            if (folder._id == defaultFolder) {
                folder.lists.forEach((list) => {
                    if (list._id !== inbox) {
                        test.push(list)
                    }
                })
            }
        }
    )
    return test
}


export default function ProjectsAccordion(props: Props) {

    const {folders, userDetails} = props

    let lists = getDefaultLists(folders, userDetails.defaultFolder.toString(), userDetails.inbox.toString())
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
            {/* @ts-ignore */}
            <ContextAwareToggle eventKey={"1"} defaultFolder={userDetails.defaultFolder} changeEventKey={() => {
                toggleAccordion("1")
            }}/>
            <Accordion.Collapse eventKey={"1"}>
                <div>
                    {lists.map(list => {
                        return (
                            <SidebarElementRender icon={List} name={list.name}/>
                        )
                    })}
                </div>
            </Accordion.Collapse>

        </Accordion>
    )

}

