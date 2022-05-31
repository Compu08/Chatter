import { useEffect, useRef } from "react";
import { Chat, ChatsMessagesProps } from "../../utils/types";

function ChatMessages({ chatsData, chatId, setUserChatData }: ChatsMessagesProps) {

    const positionRef = useRef<any>();
    const chatMessages = chatsData.chats.filter((chat: any) => chat.chatId == chatId);


    useEffect(() => {
        setUserChatData(chatMessages[0]);
        positionRef.current.scrollIntoView();
    }, [chatMessages])

    return (
        <div className="chat-screen d-flex flex-column flex-grow-1 px-4">
            <div className="chat-inside-box d-flex flex-column">
                {chatMessages[0] ? chatMessages[0].messages.map((msg) => (
                    <div className={msg.received ? "contactMsg py-2 px-3 align-self-start my-3 d-flex gap-3" : "myMsg py-2 px-3 align-self-end my-3 d-flex gap-3"}>
                        <div>
                            {msg.message}
                        </div>
                        <div className="chat-message-time">
                            {msg.timeDate.slice(11,16)+" p.m."}
                        </div>
                    </div>
                ))
                    :
                    null
                }
                <div ref={positionRef} />
            </div>
        </div>
    )
}

export default ChatMessages;