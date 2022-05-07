import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Console } from "console";
import { RootState } from "../store";
// import { fetchCount } from "./counterAPI";

export interface MainViewState {
  currentList: string | null;
  currentFolder: string | null;
  currentView: "tasks" | "calendar"
}

const initialState: MainViewState = {
  currentList: null,
  currentFolder: null,
  currentView: "tasks"
};

export const mainViewSlice = createSlice({
  name: "mainview",
  initialState,
  reducers: {
    changeListView: (state, action: PayloadAction<{ list_id: string, folder_id: string }>,) => {  
      state.currentList = action.payload.list_id;
      state.currentFolder = action.payload.folder_id
    },
    changeMainView: (state, action: PayloadAction<{ currentView: "tasks" | "calendar" }>,) => {  
      console.log("Hit ChangeMainView")
      console.log(action)
      state.currentView = action.payload.currentView;
    },
  },
});

export const { changeListView, changeMainView } = mainViewSlice.actions;

export const selectView = (state: RootState) => state.mainview.currentList;

export default mainViewSlice.reducer;
