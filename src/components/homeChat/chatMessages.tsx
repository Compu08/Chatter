import { useEffect, useState } from "react";
import { Chat, ChatsMessagesProps, Messages } from "../../utils/types";

function ChatMessages({ chatsData, chatId, setUserChatData }: ChatsMessagesProps) {

    const [messages, setMessages] = useState<Object | null>();

    console.log(chatId);
    const chatMessages = chatsData.chats.filter((chat: any) => chat.chatId == chatId);


    console.log(chatMessages);

    useEffect(() => {
        setUserChatData(chatMessages[0]);
    },[chatMessages])

    return (
        <div className="chat-screen d-flex flex-column flex-grow-1 px-4">
            <div className="chat-screen-bg" />
            <div className="chat-inside-box d-flex flex-column">
                {chatMessages[0] ? chatMessages[0].messages.map((msg) => (
                    <div className={msg.received ? "contactMsg py-2 px-3 align-self-start my-3" : "myMsg py-2 px-3 align-self-end my-3"}>
                        {msg.message}
                    </div>
                ))
                    :
                    null
                }
            </div>
        </div>
    )
}

export default ChatMessages;