import {gql} from '@apollo/client';

export const SUBSCRIPTION_CHATS_LIST = gql`
  subscription CHATS_LIST($account_uuid: uuid) {
    rearden_chat_connections(
      where: {
        deleted_at: {_is_null: true}
        thread_uuid: {_is_null: true}
        chat: {kind: {_in: ["private", "group"]}}
        member_uuid: {_eq: $account_uuid}
      }
      order_by: {last_updated_at: desc}
    ) {
      last_message {
        message {
          text
          created_at
          owner_profile {
            first_name
            last_name
          }
        }
      }
      chat {
        id
        kind
        title
        chat_connections(
          where: {
            chat: {kind: {_eq: "private"}}
            member_uuid: {_neq: $account_uuid}
          }
        ) {
          profile {
            first_name
            last_name
            avatar {
              meta
            }
          }
        }
      }
    }
  }
`;
export const SUBSCRIPTION_LAST_MESSAGE_CHAT = gql`
  subscription GET_LAST_MESSAGE(
    $chatId: uuid
    $accountId: uuid
    $limit: Int = 1
  ) {
    rearden_chat(where: {id: {_eq: $chatId}}) {
      messages(
        where: {account_uuid: {_eq: $accountId}}
        limit: $limit
        order_by: {created_at: desc}
      ) {
        id
        text
        owner_uuid
        created_at
        owner_profile {
          avatar {
            meta
          }
        }
      }
    }
  }
`;

export const SUBSCRIPTION_CHAPTER_CHAT_MESSAGES = gql`
  subscription GET_CHAPTER_MESSAGE(
    $account_uuid: uuid = ""
    $chapter_uuid: uuid = ""
  ) {
    rearden_chapter(where: {id: {_eq: $chapter_uuid}}) {
      name
      description
      chat_uuid
      content(
        where: {account_uuid: {_eq: $account_uuid}}
        order_by: {created_at: desc}
      ) {
        message {
          id
          text
          created_at
          created_at
          owner_uuid
          owner_profile {
            first_name
            last_name
            avatar {
              meta
            }
          }
        }
        chapter_case {
          id
          name
          description
          thread_uuid
          created_at
          type
          attachment_uuid
          owner_uuid
          attachment {
            meta
          }
          owner_profile {
            first_name
            last_name
            avatar {
              meta
            }
          }
        }
      }
    }
  }
`;
