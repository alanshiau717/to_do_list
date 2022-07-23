import {GetFoldersDocument, GetFoldersQuery, ModifyListDocument} from "../../../generated";
import {RenderProps, SidebarElementRender} from "./sidebar_element";
import {useMutation} from "@apollo/client";
import {useDispatch} from "react-redux";
import {openEditListModal} from "../../../redux/reducers/modalSlice";
import {List} from "react-bootstrap-icons";
import {changeListView} from "../../../redux/reducers/mainViewSlice";

interface Props {
    list: GetFoldersQuery["folders"][0]["lists"][0];
    isIndented?: boolean
}

SidebarElementList.defaultProps = {
    isIndented: false
}

export function SidebarElementList(props: Props) {
    const [modifyList, {data,loading,error}] = useMutation(
        ModifyListDocument,
        {
            refetchQueries: [GetFoldersDocument]
        }
    )
    const dispatch = useDispatch()
    const listDropDownProps: RenderProps["dropDownMenu"] = [
        {
            name: "Rename", function: () => {
                dispatch(openEditListModal({props: {list: props.list}}))
            }
        },
        {
            name: "Delete", function: () => {
                modifyList({
                    variables: {
                        data: {
                            id: parseInt(props.list._id),
                            isDeleted: true
                        }
                    }
                })
            }
        }
    ]

    return (
        <SidebarElementRender icon={List} name={props.list.name} dropDownMenu={listDropDownProps} isIndented={props.isIndented} onClick={() => {
            // dispatch(changeListView({list_id: props.list._id}))
        }}/>
    )

}