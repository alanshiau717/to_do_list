import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counterSlice";
import mainViewReducer from "./reducers/mainViewSlice";
import userSessionSlice from "./reducers/userSessionSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    mainview: mainViewReducer,
    usersession: userSessionSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
