import {gql} from '@apollo/client';

export const INSERT_CHAT_CONNECTIONS = gql`
  mutation InsertChatConnections(
    $chapters: [rearden_chat_connections_insert_input!]!
  ) {
    insert_rearden_chat_connections(objects: $chapters) {
      returning {
        id
      }
    }
  }
`;

export const INSERT_ADDRESS = gql`
  mutation InsertAddress($address: rearden_address_insert_input!) {
    insert_rearden_address_one(object: $address) {
      id
    }
  }
`;

export const INSERT_EDUCATION = gql`
  mutation InsertEducation($education: [rearden_education_insert_input!]!) {
    insert_rearden_education(objects: $education) {
      returning {
        id
      }
    }
  }
`;

export const INSERT_ORGANIZATION = gql`
  mutation InsertOrganization(
    $organization: rearden_organizations_insert_input!
  ) {
    insert_rearden_organizations_one(object: $organization) {
      id
    }
  }
`;

export const INSERT_FAMILY_INFO = gql`
  mutation InsertFamilyInterests(
    $family: [rearden_family_information_insert_input!]!
  ) {
    insert_rearden_family_information(objects: $family) {
      returning {
        id
      }
    }
  }
`;

export const UPLOAD_PHOTO = gql`
  mutation UploadFile(
    $file: Upload!
    $account_uuid: ID!
    $type: UploadType! = photo
  ) {
    uploadFile(account_uuid: $account_uuid, file: $file, type: $type) {
      code
      error
      attachment {
        link
        mimetype
        name
        size
        id
      }
      message
    }
  }
`;
export const UPLOAD_FILE = gql`
  mutation UploadFile(
    $file: Upload!
    $account_uuid: ID!
    $type: UploadType! = document
  ) {
    uploadFile(account_uuid: $account_uuid, file: $file, type: $type) {
      code
      error
      attachment {
        link
        mimetype
        name
        size
        id
      }
      message
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation CreateChat($kind: CreateChatKind!, $participants: [uuid!]!) {
    create_chat(participants: $participants, kind: $kind) {
      chat_uuid
      error
    }
  }
`;

export const CREATE_GROUP_CHAT = gql`
  mutation CreateGroupChat(
    $kind: CreateChatKind!
    $title: String
    $participants: [uuid!]!
  ) {
    create_chat(participants: $participants, kind: $kind, title: $title) {
      chat_uuid
      error
    }
  }
`;

export const SEND_TEXT_MESSAGE = gql`
  mutation SendTextMessage(
    $text: String = ""
    $chat_uuid: uuid = ""
    $owner_uuid: uuid = ""
    $recipient_uuids: jsonb = ""
  ) {
    insert_rearden_message_one(
      object: {
        text: $text
        chat_uuid: $chat_uuid
        type: "text"
        owner_uuid: $owner_uuid
        recipient_uuids: $recipient_uuids
      }
    ) {
      id
    }
  }
`;

export const CREATE_THREAD = gql`
  mutation CreateThread(
    $chapter_uuid: uuid = ""
    $attachment_uuid: uuid = ""
    $type: ChapterCaseType = deal
    $name: String = ""
    $description: String = ""
  ) {
    create_chapter_case(
      attachment_uuid: $attachment_uuid
      chapter_uuid: $chapter_uuid
      type: $type
      name: $name
      description: $description
    ) {
      chapter_case_uuid
      error
    }
  }
`;
