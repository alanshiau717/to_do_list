import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
// import { fetchCount } from "./counterAPI";

export interface MainViewState {
  currentList: string | null;
}

const initialState: MainViewState = {
  currentList: "default list",
};

export const mainViewSlice = createSlice({
  name: "mainview",
  initialState,
  reducers: {
    changeView: (state, action: PayloadAction<string>) => {
      state.currentList = action.payload;
    },
  },
});

export const { changeView } = mainViewSlice.actions;

export const selectView = (state: RootState) => state.mainview.currentList;

export default mainViewSlice.reducer;
