import { gql } from "@apollo/client";

export default {
  Queries: {
    chats: gql`
      query Chats {
        chats {
          id
          updatedAt
          chatters {
            user {
              id
              username
            }
          }
        }
      }
    `,
  },
  Mutations: {
    create: gql`
      mutation Create($IDs: [String]!) {
        createChat(IDs: $IDs) {
          chatId
        }
      }
    `,
  },
  Subscriptions: {
    chatCreated: gql`
      subscription ChatCreated {
        chatCreated {
          id
          updatedAt
          chatters {
            user {
              id
              username
            }
          }
        }
      }
    `,
  },
};
