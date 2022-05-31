export const FILTER_QUERY = `query filterMessage($userId: ID!, $chatId: ID!, $filter: String!) {
    filterMessages(userId: $userId, chatId: $chatId, filter: $filter){
        message
    }
}`;