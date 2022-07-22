import { createSlice, PayloadAction, createStore, combineReducers} from "@reduxjs/toolkit";


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
        userHasAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload
        },
        userIsAuthenticating: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticating = action.payload
        }
    }
})



export const { userHasAuthenticated, userIsAuthenticating } = userSessionSlice.actions



export default userSessionSlice.reducer
