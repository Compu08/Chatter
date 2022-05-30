import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { UserDataState } from "../utils/types";

// Define the initial state using that type
const initialState: UserDataState = {
    name: "",
    lastName: "",
    email: "",
    photo: "",
    userId: "",
    authToken: "",
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setUserName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setLoginData: (state, action: PayloadAction<UserDataState>) => {
            state.userId = action.payload.userId;
            state.authToken = action.payload.authToken;
        },
        setUserData: (state, action: PayloadAction<UserDataState>) => {
            state.name = action.payload.name;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.photo = action.payload.photo;
        }
    }
})

export const { setUserName, setLoginData, setUserData } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getUser = (state: RootState) => state.user;

export default userSlice.reducer;