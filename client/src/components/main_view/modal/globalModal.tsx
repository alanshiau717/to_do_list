import React from 'react';
// import { CreateModal, DeleteModal,UpdateModal } from './components';
import Modal, {ModalProps} from "react-bootstrap/Modal"
import {useDispatch, useSelector} from "react-redux";
import {closeModal, CurrentModal} from "../../../redux/reducers/modalSlice";
import {GlobalAddListModal, GlobalListModalProps} from "./add_modal_list";
import {GlobalAddFolderModal} from "./add_modal_folder";
import {EditListModal, EditListModalProps} from "./EditListModal";
import {EditFolderModal, EditFolderModalProps} from "./EditFolderModal";

export const MODAL_TYPES = {
    CREATE_MODAL: "CREATE_MODAL",
    DELETE_MODAL: "DELETE_MODAL",
    UPDATE_MODAL: "UPDATE_MODAL"
};

interface Props {
    openModal: boolean,
    isOpen: boolean,
}




export default function GlobalModal() {
    const dispatch = useDispatch()
    const isOpen = useSelector(
        (state: any) => state.modal.isOpen
    )
    const modalProps = useSelector(
        (state: any) => state.modal.modalProps
    ) as ModalProps
    const currentModal = useSelector(
        (state: any) => state.modal.currentModal
    ) as CurrentModal


    function renderModal(currentModal: CurrentModal, modalProps: ModalProps) {
        switch(currentModal) {
            case CurrentModal.ADD_LIST_MODAL:
                return (<GlobalAddListModal folderId={(modalProps as GlobalListModalProps).folderId}/>)
            case CurrentModal.ADD_FOLDER_MODAL:
                return (<GlobalAddFolderModal/>)
            case CurrentModal.EDIT_LIST_MODAL:
                return (<EditListModal list={(modalProps as EditListModalProps).list}/>)
            case CurrentModal.EDIT_FOLDER_MODAL:
                return (<EditFolderModal folder={(modalProps as EditFolderModalProps).folder}/>)
        }
    }
    return (
        <Modal show={isOpen} onHide={() => dispatch(closeModal())}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            {renderModal(currentModal, modalProps)}
        </Modal>
);
}
// const MODAL_COMPONENTS: any = {
//     [MODAL_TYPES.CREATE_MODAL]: CreateModal,
//     [MODAL_TYPES.DELETE_MODAL]: DeleteModal,
//     [MODAL_TYPES.UPDATE_MODAL]: UpdateModal
// };
