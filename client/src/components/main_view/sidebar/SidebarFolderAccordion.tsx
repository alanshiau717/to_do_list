import {GetFoldersQuery} from "../../../generated";
import {useDispatch} from "react-redux";
import React, {useContext, useState} from "react";
import {Accordion, AccordionContext, useAccordionToggle} from "react-bootstrap";
import {RenderProps, SidebarElementRender} from "./sidebar_element";
import {openFolderModal, openListModal} from "../../../redux/reducers/modalSlice";
import {ChevronDown, ChevronRight, Folder, FolderFill, List} from "react-bootstrap-icons";

interface Props {
    folder: GetFoldersQuery["folders"][0]
}


interface FolderContextAwareToggleProps {
    eventKey: string;
    changeEventKey(): any;
    folderName: string;
}
//@ts-ignore
function FolderContextAwareToggle(props: FolderContextAwareToggleProps) {
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
                //We can use this because we are using folderId as the eventKey
                dispatch(openListModal({props: {folderId: props.eventKey}}))
            }
        }
    ]
    const isCurrentEventKey = currentEventKey === props.eventKey;

    return (
        <SidebarElementRender onClick={(event: any) => {
            decoratedOnClick(event)
        }} icon={isCurrentEventKey ? FolderFill : Folder} name={props.folderName} dropDownMenu={folderDropDownProps}/>
    );
}

export default function SidebarFoldersAccordion(props: Props) {
    const [activeKey, setActiveKey] = useState<string | undefined>(undefined)
    function toggleAccordion(eventKey: string) {
        if(activeKey == eventKey) {
            setActiveKey(undefined)
        } else{
            setActiveKey(eventKey)
        }
    }

    return (
        <Accordion activeKey={activeKey}>
            <div>
            <FolderContextAwareToggle eventKey={props.folder._id} changeEventKey={() => toggleAccordion(props.folder._id)} folderName={props.folder.name}/>
            <Accordion.Collapse eventKey={props.folder._id}>
                <div>
                    {props.folder.lists.map(list => {
                        return(
                            <SidebarElementRender icon={List} name={list.name} isIndented={true}/>
                        )
                    })}
                </div>
            </Accordion.Collapse>

            </div>
        </Accordion>
    )
}