import "../../../css/sidebarElement.scss";
import {Icon, Inbox, ThreeDotsVertical} from "react-bootstrap-icons";
import React, {Component, EventHandler, forwardRef, useState} from "react";
import {Dropdown} from "react-bootstrap";

const ThreeDotsVertical25 = React.forwardRef<any, any>(({children, onClick}, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        <ThreeDotsVertical size={25} className={"DropdownIcon"}>
            {children}
        </ThreeDotsVertical>
    </a>
));

export interface RenderProps {
    icon: Icon;
    dropDownMenu?: dropDownProps[];
    name: string;
    isSelected?: boolean

    onClick?(event: any): any;

    isIndented?: boolean
    fontWeight?: string
}

interface dropDownProps {
    name: string,

    function(): any
}

SidebarElementRender.defaultProps = {
    fontWeight: "Regular",
    isSelected: false,
    isIndented: false
}


export function SidebarElementRender(props: RenderProps) {
    const [showElementOptions, setElementOptions] = useState(false)
    const Icon = props.icon
    return (
        <div
            className={`${props.isIndented ? "sidebarElement-indented" : ""} sidebarElement clickPropagator ${props.isSelected ? "sidebarElement-selected" : ""}`}
            onMouseEnter={() => {
                setElementOptions(true)
            }
            } onMouseLeave={() => {
            setElementOptions(false)
        }}
            onClick={(event) => {
                // @ts-ignore
                if (!event.target.classList.value.includes("clickPropagator")) {
                    event.preventDefault()
                } else if (props.onClick) {
                    props.onClick(event)
                }
            }}
        >
            <div className={"sidebarIcon clickPropagator"}><Icon className={"clickPropagator"} size={24}/></div>
            <div  className={"sidebarTextContainer clickPropagator"}>
                <div style={{fontWeight: props.fontWeight}} className={"sidebarText clickPropagator"}>
                    {props.name}
                </div>
            </div>
            <div className={"sidebarDropdownIcon"}>{showElementOptions &&
                <Dropdown className={"Dropdown"}>
                    <Dropdown.Toggle
                        className={"Dropdown"}
                        id="dropdown-basic"
                        as={ThreeDotsVertical25}
                    />
                    {props.dropDownMenu &&
                        <Dropdown.Menu>
                            {props.dropDownMenu.map((dropDownProps) => {
                                return (
                                    <Dropdown.Item onClick={() => dropDownProps.function()}>
                                        {dropDownProps.name}
                                    </Dropdown.Item>
                                )
                            })}
                        </Dropdown.Menu>
                    }
                </Dropdown>
            }</div>

        </div>);
}

export default function SidebarElement() {
    const [showElementOptions, setElementOptions] = useState(false)
    return (<div className="sidebarElement" onMouseEnter={() => {
        setElementOptions(true)
    }
    } onMouseLeave={() => {
        setElementOptions(false)
    }}>
        <Inbox size={25}/>
        <div className={"sidebarText"}>Inbox</div>
        {showElementOptions &&
            <Dropdown>
                <Dropdown.Toggle
                    id="dropdown-basic"
                    as={ThreeDotsVertical25}
                />
                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={() => {
                            // dispatch(openListModal())
                            // dispatch(openModal({currentModal: "Folder"}))
                        }}
                        as="div"
                    >
                        Add List
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => {
                        }}
                        as="div"
                    >
                        Delete Folder
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        }
    </div>);
}