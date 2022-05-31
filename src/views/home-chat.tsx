import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { IoMdSettings } from 'react-icons/io';
import React, { useEffect, useState, useRef, LegacyRef } from 'react';
import NewChatModal from "../components/homeChat/newChatModal";
import ChatTab from "../components/homeChat/chatTab";
import MyProfile from "../components/myProfile";
import useSendMsg from "../api/sendMsg";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getUser } from "../redux/userSlice";
import useGetUserData from "../api/getUser";
import { Chat } from "../utils/types";
import useGetChats from "../api/getChats";
import { getChats, setIsAllowedExpand } from "../redux/chatsSlice";
import ChatMessages from "../components/homeChat/chatMessages";
import ChatHeader from "../components/homeChat/chatHeader";
import ConfigDropdown from "../layout/dropdowns/config";
import SearchBar from "../components/searchBar";
import { NotificationFailure } from "../components/notifications";

function HomeChat() {

    const chatHeaderInitialState: Chat = {
        messages: [],
        messageId: "",
        image: "",
        name: "",

    }

    const [msgEntry, setMsgEntry] = useState<string>("");
    const [selectedChat, setSelectedChat] = useState<string>("");
    const [userChatData, setUserChatData] = useState<Chat>(chatHeaderInitialState);
    const [configOpen, setConfigOpen] = useState<Boolean>(false);
    const ref = useRef<any>();

    const dispatch = useAppDispatch();

    const userData = useAppSelector(getUser);
    const chats = useAppSelector(getChats);

    const data = useGetUserData(userData.userId);
    const getChatsData = useGetChats(userData.userId);

    const sendMsg = useSendMsg(msgEntry, userData.userId, selectedChat);

    const positionRef = useRef<any>();   

    useEffect(() => {
        data();
        getChatsData();
    }, [userData]);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
            setConfigOpen(isOpen => isOpen && chats.isAllowedExpand);
            positionRef.current.scrollIntoView();
        }
    }, [chats]);

    const handleMsgEntry = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMsgEntry(e.target.value);
    }

    const handleSendMsg = () => {
        if (msgEntry != "") {
            setMsgEntry("");
            sendMsg();
            getChatsData();
        }else{
            NotificationFailure("¡Error! No puedes enviar un mensaje en blanco");
        }
    }

    const handleChatClick = (chatId: string) => {
        setSelectedChat(chatId);
    }

    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter")
            handleSendMsg();
    }

    const handleOpenConfig = (e:React.MouseEvent<HTMLDivElement>) =>{
        setConfigOpen(!configOpen);
        dispatch(setIsAllowedExpand(true));
        e.stopPropagation();
    }


    return (
        <div className="main-wrapper-chat d-flex row flex-grow-1 w-85">
            <div className="chat-left-side bg-chats-background d-flex flex-column w-30 p-0">
                <div className="profile-container bg-chatter-green px-3 d-flex justify-content-between align-items-center py-2">
                    <MyProfile name={userData?.name} lastName={userData?.lastName} email={userData?.email} photo={userData?.photo} />
                    <span className="iconHover cursor-pointer fs-3 position-relative" onClick={handleOpenConfig}>
                        <IoMdSettings />
                        <ConfigDropdown isOpen={configOpen} userData={userData} getChatsData={getChatsData} setIsOpen={setConfigOpen} />
                    </span>
                </div>

                <SearchBar userId={userData.userId} chatId={selectedChat} />
                
                <div className="chatsDiv d-flex flex-grow-1 flex-column" ref={ref}>
                    <div ref={positionRef} />
                    {chats ? chats.chats.map((tab: any) => (
                        <ChatTab name={tab.name} photo={tab.image} chatId={tab.chatId} messages={tab.messages} userData={userData} selectedChat={selectedChat} onClick={() => handleChatClick(tab.chatId)} />
                    ))
                        :
                        null
                    }
                </div>

            </div>

            <div className="chat-right-side w-70 d-flex flex-column p-0">

                <ChatHeader userChatData={userChatData} />

                <ChatMessages chatId={selectedChat} chatsData={chats} setUserChatData={setUserChatData} />               

                <div className="d-flex flex-row align-items-center justify-content-center bg-chatter-green px-4 py-2">
                    <div className="text-chatter-black fs-3 opacity-75">
                        <FontAwesomeIcon icon={faSmile} />
                    </div>

                    <div className="w-100 px-3">
                        <input placeholder="Escribe tu mensaje" value={msgEntry} className="user-chat-input px-4 py-4 w-100 bg-white" onChange={handleMsgEntry} onKeyDown={handleEnterPress} disabled={selectedChat ? false : true} />
                    </div>

                    <div className="text-chatter-black fs-3 opacity-75 cursor-pointer" onClick={handleSendMsg}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </div>
                </div>
            </div>

            
        </div>
    )

}
export default HomeChat;    