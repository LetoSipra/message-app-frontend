import { gql } from "@apollo/client";

export default {
  Queries: {
    chats: gql`
      query Chats {
        chats {
          id
          chatters {
            user {
              id
              username
            }
          }
          updatedAt
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
  Subscriptions: {},
};
