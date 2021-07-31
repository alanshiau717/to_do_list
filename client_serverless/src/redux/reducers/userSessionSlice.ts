import { createSlice, PayloadAction} from "@reduxjs/toolkit";
// import { RootState } from "../store";


export interface UserState {
    isAuthenticated: boolean
    isAuthenticating: boolean
}

const initialState: UserState = {
    isAuthenticated: false,
    isAuthenticating: true
}

export const userSessionSlice = createSlice({
    name: "userSession",
    initialState,
    reducers: {
        userHasAuthenticated: (state) => {
            state.isAuthenticated = true
        },
        userIsAuthenticating: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticating = action.payload
        }
    }
})

export const { userHasAuthenticated, userIsAuthenticating } = userSessionSlice.actions

export default userSessionSlice.reducer
