import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
// import { fetchCount } from "./counterAPI";

export interface MainViewState {
  currentList: string | null;
  currentFolder: string | null
}

const initialState: MainViewState = {
  currentList: null,
  currentFolder: null
};

export const mainViewSlice = createSlice({
  name: "mainview",
  initialState,
  reducers: {
    changeListView: (state, action: PayloadAction<{ list_id: string, folder_id: string }>) => {
      state.currentList = action.payload.list_id;
      state.currentFolder = action.payload.folder_id
    },
  },
});

export const { changeListView } = mainViewSlice.actions;

export const selectView = (state: RootState) => state.mainview.currentList;

export default mainViewSlice.reducer;
