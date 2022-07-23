import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GlobalListModalProps} from "../../components/main_view/modal/add_modal_list";
import {EditListModalProps} from "../../components/main_view/modal/EditListModal";
import {EditFolderModalProps} from "../../components/main_view/modal/EditFolderModal";

export enum CurrentModal {
    ADD_FOLDER_MODAL,
    ADD_LIST_MODAL,
    EDIT_LIST_MODAL,
    EDIT_FOLDER_MODAL
}


export interface ModalState {
    currentModal: CurrentModal | null,
    isOpen: boolean,
    modalProps: GlobalListModalProps | null | EditListModalProps | EditFolderModalProps
}

const initialState: ModalState = {
    currentModal: null,
    isOpen: false,
    modalProps: null
}

export const modalSlice = createSlice({
        name: "modal",
        initialState,
        reducers: {
            openModal: (state,) => {
                // state.currentModal = action.payload.currentModal
                state.isOpen = true
            },
            openAddFolderModal: (state) => {
                state.currentModal = CurrentModal.ADD_FOLDER_MODAL
                modalSlice.caseReducers.openModal(state)
            },
            openAddListModal: (state, action: PayloadAction<{ props: GlobalListModalProps }>) => {
                state.currentModal = CurrentModal.ADD_LIST_MODAL
                state.modalProps = action.payload.props
                modalSlice.caseReducers.openModal(state)
            },
            openEditListModal: (state, action: PayloadAction<{ props:  EditListModalProps}>) => {
                state.currentModal = CurrentModal.EDIT_LIST_MODAL
                state.modalProps = action.payload.props
                modalSlice.caseReducers.openModal(state)
            },
            openEditFolderModal: (state, action: PayloadAction<{ props:  EditFolderModalProps}>) => {
                state.currentModal = CurrentModal.EDIT_FOLDER_MODAL
                state.modalProps = action.payload.props
                modalSlice.caseReducers.openModal(state)
            },
            closeModal: (state) => {
                state.isOpen = false
            }
        }
    }
)


export const {openModal, closeModal, openAddListModal, openAddFolderModal, openEditListModal, openEditFolderModal} = modalSlice.actions

export default modalSlice.reducer