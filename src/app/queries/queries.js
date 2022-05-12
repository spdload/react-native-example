import {gql} from '@apollo/client';

export const GET_STARED_CHATS = gql`
  query GetChatsList($account_uuid: uuid, $is_starred: Boolean = true) {
    rearden_chat_connections(
      where: {
        member_uuid: {_eq: $account_uuid}
        deleted_at: {_is_null: true}
        thread_uuid: {_is_null: true}
        is_starred: {_eq: $is_starred}
        chapter_uuid: {_is_null: true}
      }
      order_by: {chat: {created_at: desc}}
    ) {
      is_starred
      chat {
        created_at
        id
        kind
        title
        messages(
          where: {
            account_uuid: {_eq: $account_uuid}
            recipient_uuids: {_contains: [$account_uuid]}
          }
          limit: 1
          order_by: {created_at: desc}
        ) {
          created_at
          id
          text
        }
        chat_connections(where: {member_uuid: {_neq: $account_uuid}}) {
          account {
            profiles {
              first_name
              last_name
            }
          }
        }
      }
    }
  }
`;

export const GET_CHATS_LIST = gql`
  query GetChatsList($account_uuid: uuid) {
    rearden_chat_connections(
      where: {
        member_uuid: {_eq: $account_uuid}
        deleted_at: {_is_null: true}
        thread_uuid: {_is_null: true}
        chapter_uuid: {_is_null: true}
      }
      order_by: {chat: {created_at: desc}}
    ) {
      is_starred
      chat {
        created_at
        id
        kind
        title
        messages(
          where: {
            account_uuid: {_eq: $account_uuid}
            recipient_uuids: {_contains: [$account_uuid]}
          }
          limit: 1
          order_by: {created_at: desc}
        ) {
          created_at
          id
          text
        }
        chat_connections(where: {member_uuid: {_neq: $account_uuid}}) {
          account {
            profiles {
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
  }
`;

export const GET_CHAT_MEMBERS = gql`
  query GetChatMembers($chat_id: uuid = "", $account_id: uuid = "") {
    rearden_chat_connections(
      where: {chat: {id: {_eq: $chat_id}}, account: {id: {_eq: $account_id}}}
    ) {
      chat {
        id
        chat_connections {
          role
          account {
            id
            profiles {
              first_name
              last_name
            }
          }
        }
      }
    }
  }
`;

export const GET_CHAT_MESSAGES = gql`
  query GetChatMessages($chat_id: uuid = "", $account_uuid: uuid = "") {
    rearden_chat(where: {id: {_eq: $chat_id}}) {
      id
      messages(
        where: {account_uuid: {_eq: $account_uuid}}
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

export const GET_CHAPTER_MEMBERS_LIST = gql`
  query ChapterMemebers($chapter: uuid = "") {
    rearden_chapter(where: {id: {_eq: $chapter}}) {
      chapter_members(
        where: {deleted_at: {_is_null: true}, thread_uuid: {_is_null: true}}
        order_by: {role: asc}
      ) {
        id
        role
        account {
          id
          profiles {
            id
            first_name
            last_name
            avatar {
              id
              meta
            }
          }
          companies {
            address {
              city
              country
            }
          }
        }
      }
    }
  }
`;

export const GET_CHAPTER_THREADS = gql`
  query GetChapterThreads(
    $account_uuid: uuid = ""
    $chapter_uuid: uuid = ""
    $type: String = ""
  ) {
    rearden_chapter(where: {id: {_eq: $chapter_uuid}}) {
      name
      description
      chat_uuid
      content(
        where: {
          account_uuid: {_eq: $account_uuid}
          chapter_case: {type: {_eq: $type}}
        }
        order_by: {created_at: desc}
      ) {
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
