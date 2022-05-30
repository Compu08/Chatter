import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Chat, ChatsState } from "../utils/types";

// Define the initial state using that type
const initialState: ChatsState = {
    chats: []
}

export const chatsSlice = createSlice({
    name: 'chats',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setChatsData: (state, action: PayloadAction<Array<Chat>>) => {
            state.chats = action.payload
        }
    }
})

export const { setChatsData } = chatsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getChats = (state: RootState) => state.chats;

export default chatsSlice.reducer;