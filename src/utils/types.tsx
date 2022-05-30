import {Dispatch, MouseEventHandler, SetStateAction} from 'react';

export interface UserDataState {
    name?: string,
    lastName?: string,
    password?: string,
    email?: string,
    photo?: string,
    userId: string,
    authToken?: string,
}

export interface ChatsState {
    chats: Array<Chat>,
}

export interface Chat{
    messages: Array<Messages>,
    messageId:string,
    image: string,
    name: string,
}

export interface ChatsMessagesProps{
    chatId: string,
    chatsData: ChatsState,
    setUserChatData: Dispatch<SetStateAction<Chat>>
}

export interface Messages{
    message: string,
    messageId: string,
    received: boolean,
    timeDate: string,
}

export interface MyProfileProps {
    name?: string,
    lastName?: string,
    email?: string
    photo?: string,
}

export interface ChatTabProps {
    name: string,
    lastMsg?: string,
    time?: string,
    photo: string,
    chatId: string,
    messages: Array<Messages>,
    userData: UserDataState,
    onClick?:MouseEventHandler<HTMLDivElement>,
}

export interface ChatModalProps {
    isOpen: boolean,
    setIsOpen: Function,
    userData: UserDataState,
}

export interface LoginData {
    email: string,
    password: string,
}

export interface RegisterData {
    name: string,
    lastName: string,
    email: string,
    password: string,
}
