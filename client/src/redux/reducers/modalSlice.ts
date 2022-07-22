import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store"
import {GlobalAddFolderModal, GlobalFolderModalProps} from "../../components/main_view/modal/add_modal_folder";
import {GlobalListModalProps} from "../../components/main_view/modal/add_modal_list";

export enum CurrentModal {
    ADD_FOLDER_MODAL,
    ADD_LIST_MODAL
}


export interface ModalState {
    currentModal: CurrentModal | null,
    isOpen: boolean,
    modalProps: GlobalFolderModalProps | GlobalListModalProps | null
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
            openModal: (state, ) => {
                // state.currentModal = action.payload.currentModal
                state.isOpen = true
            },
            openFolderModal: (state, action: PayloadAction<{props: GlobalFolderModalProps}>) => {
                state.currentModal = CurrentModal.ADD_FOLDER_MODAL
                state.modalProps = action.payload.props
                modalSlice.caseReducers.openModal(state)
            },
            openListModal: (state, action: PayloadAction<{props: GlobalListModalProps}>) => {
                state.currentModal = CurrentModal.ADD_LIST_MODAL
                state.modalProps = action.payload.props
                modalSlice.caseReducers.openModal(state)
            },
            closeModal: (state) => {
                state.isOpen = false
            }
        }
    }
)


export const {openModal, closeModal, openListModal, openFolderModal} = modalSlice.actions

export default modalSlice.reducer