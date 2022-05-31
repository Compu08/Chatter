import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { IoMdSettings } from 'react-icons/io';
import { HiPhoneMissedCall } from 'react-icons/hi';
import React, { useEffect, useState, useRef, LegacyRef } from 'react';
import empty from '../assets/images/empty.png'
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
import { socket } from "../utils/socket";

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

    const chats = useAppSelector(getChats);
    const dispatch = useAppDispatch();

    const userData = useAppSelector(getUser);

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

            //Posicionamiento de la scroll de los chats al inicio en la "div fantasma"
            positionRef.current.scrollIntoView();

            //Obtengo respuesta del socket y actualizo los mensajes
            socket.on("chats", (msg) => {
                if(msg.action == "ReceivedNewMessage" || msg.action == "SentNewMessage" || msg.action == "delete" || msg.action == "create"){
                    getChatsData();
                }
            });

            return () => {
                socket.off();
              };
        }
    }, [chats]);

    const handleMsgEntry = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMsgEntry(e.target.value);
    }

    const handleSendMsg = () => {
        if (msgEntry != "") {
            setMsgEntry("");
            sendMsg();
        } else {
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

    const handleOpenConfig = (e: React.MouseEvent<HTMLDivElement>) => {
        setConfigOpen(!configOpen);
        dispatch(setIsAllowedExpand(true));
        e.stopPropagation();
    }

    return (
        <div className="main-wrapper-chat d-flex row flex-grow-1 w-85" data-aos="zoom-in">
            <div className="chat-left-side bg-chats-background d-flex flex-column w-30 p-0">
                <div className="profile-container bg-chatter-green px-3 d-flex justify-content-between align-items-center py-2">
                    <MyProfile name={userData?.name} lastName={userData?.lastName} email={userData?.email} photo={userData?.photo} />
                    <div className="position-relative cursor-pointer d-flex">
                        <span className="iconHover fs-3 align-self-center justify-self-center" onClick={handleOpenConfig}>
                            <IoMdSettings aria-label="Boton de Configuracion" />
                        </span>
                        <ConfigDropdown isOpen={configOpen} userData={userData} getChatsData={getChatsData} />
                    </div>
                </div>

                <SearchBar userId={userData.userId} chatId={selectedChat} />

                <div className="chatsDiv d-flex flex-grow-1 flex-column" ref={ref}>
                    <div ref={positionRef} />
                    {chats && chats.chats.length > 0 ? chats.chats.map((tab: any, i:any) => (
                        <ChatTab key={i} name={tab.name} photo={tab.image} chatId={tab.chatId} messages={tab.messages} userData={userData} selectedChat={selectedChat} onClick={() => handleChatClick(tab.chatId)} />
                    ))
                        :
                        <div className="text-chatter-black opacity-25 fs-smaller text-center h-100 d-flex justify-content-center align-items-center text-no-selection">
                            <div>No hay chats disponibles</div>
                        </div>
                    }
                </div>
            </div>

            {/* Si hay un chat seleccionado, muestra el chat, si no muestra la div de inicio. */}
            {selectedChat == "" ?
                <div className="chat-right-side empty-chats w-70 d-flex flex-column justify-content-center align-items-center align-content-center p-0 position-relative text-no-selection">
                    <img className="opacity-50" src={empty} />
                    <div className="d-flex flex-column align-items-center justify-content-center text-chatter-black opacity-75">
                        <div className="fs-3 fw-bold">CHATTER</div>
                        <div className="my-1">¡Comunicate con tus amigos sin costo alguno!</div>
                        <div className="division-line bg-chatter-black opacity-25 my-3"></div>
                        <div className="fs-smaller d-flex justify-content-center align-items-center gap-2"><HiPhoneMissedCall />Llamadas Deshabilitadas</div>
                    </div>
                    <div className="empty-chat-line" />
                </div>
                :
                <div className="chat-right-side w-70 d-flex flex-column p-0">
                    <ChatHeader userChatData={userChatData} />

                    <ChatMessages chatId={selectedChat} chatsData={chats} setUserChatData={setUserChatData} />

                    <div className="d-flex flex-row align-items-center justify-content-center bg-chatter-green px-4 py-2">
                        <div className="black-icon cursor-pointer text-chatter-black fs-3 opacity-75">
                            <FontAwesomeIcon icon={faSmile} />
                        </div>

                        <div className="w-100 px-3">
                            <input placeholder="Escribe tu mensaje" value={msgEntry} className="user-chat-input px-4 py-4 w-100 bg-white" onChange={handleMsgEntry} onKeyDown={handleEnterPress} disabled={selectedChat ? false : true} />
                        </div>

                        <div className="black-icon text-chatter-black fs-3 opacity-75 cursor-pointer" onClick={handleSendMsg}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </div>
                    </div>

                </div>

            }
        </div>
    )

}
export default HomeChat;    