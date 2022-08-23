import {Icon, X} from "react-bootstrap-icons";
import "../../css/SmallButton.scss"
import {useState} from "react";

interface Props {
    text: String,
    onIconClick?(event: any): any,
    onClick?(event: any): any
}

export function SmallButton(props: Props) {
    const [showIcon, setShowIcon] = useState(false)
    return (
        <div className={"smallButtonContainer clickPropagator"}
             onMouseEnter={() => setShowIcon(true)}
             onMouseLeave={() => setShowIcon(false)}
             onClick={(event) => {
                 // @ts-ignore
                 if (!event.target.classList.value.includes("clickPropagator")) {
                     event.preventDefault()
                 } else if (props.onClick) {
                     props.onClick(event)
                 }
             }}
        >
            <div className={"smallButtonText clickPropagator"}> {props.text}</div>
            {/*TODO: When we change this to visible the whole modal gets a bit bigger.*/}
            {/*TODO: Misalligned at start hover*/}
            <div
                className={`smallButtonIcon ${showIcon ? "smallButtonIcon-visible" : ""}`}
                onClick={(event) => {
                props.onIconClick && props.onIconClick(event)
            }}
            >
                <X size={20}/>
            </div>
        </div>
    )
}