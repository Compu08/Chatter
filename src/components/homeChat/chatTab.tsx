import { useState } from 'react';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { BsThreeDotsVertical } from 'react-icons/bs';
import deleteChat from '../../api/deleteChat';
import client from '../../utils/client';
import { ChatTabProps } from '../../utils/types';
import useDeleteChat from '../../api/deleteChat';

function ChatTab({ name, time, photo, chatId, messages, lastMsg, userData, onClick }: ChatTabProps) {

    const deleteChat = useDeleteChat(userData.userId, chatId);
    const lastMessage = messages[0] ? (messages.slice(-1)[0].message).slice(0, 55) + "..." : "No hay mensajes.";

    console.log(lastMessage)

    const eraseChat = () => {
        deleteChat();
    }

    return (
        <div id="chatTab" className="chatTab d-flex flex-row justify-content-between px-3 cursor-default" onClick={onClick}>
            <div className="d-flex flex-row gap-3 w-100 justify-content-center align-items-center">
                <div className="chatPhoto">
                    <img src={`http://localhost:8080/${photo.substring(5)}`} alt="ProfilePhoto" className="image" />
                </div>
                <div className="chatInfo d-flex flex-column py-2 w-100">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="chatContact text-chatter-black fw-bold">
                            {name}
                        </div>
                        <div className="chat-time text-chatter-black opacity-50 self-align-end">
                            20:57am.
                        </div>
                    </div>
                    <div className="chatPreview d-flex flex-row gap-1 align-items-center">
                        <div className="iconStatus text-primary">
                            <IoCheckmarkDoneOutline />
                        </div>
                        <div className="msgPreview text-chatter-black fs-smaller opacity-50">
                            {lastMessage}
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-chatter-black chatTab-dots d-flex align-items-center" onClick={eraseChat}>
                <BsThreeDotsVertical />
            </div>
        </div>
    )
}

export default ChatTab;