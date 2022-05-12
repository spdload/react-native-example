import React, {useState, useEffect} from 'react';
import {StyleSheet, Platform, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

// GQL
import {useQuery, useMutation, useSubscription} from '@apollo/client';
import {GET_CHAPTER_MEMBERS_LIST} from 'src/queries/queries';
import {SEND_TEXT_MESSAGE} from 'src/queries/mutations';
import {SUBSCRIPTION_CHAPTER_CHAT_MESSAGES} from 'src/queries/subscriptions';
// UI
import Header from './components/Header';
import Chat from 'src/components/Chat';
import Loader from 'src/components/Loader';

const ChapterChat = props => {
  const {route, navigation} = props;
  const {name, colors} = useTheme();
  const {type, accout, title, chapterId, chat_uuid} = route.params;
  const [messages, setMessages] = useState([]);

  const {data, loading, errors} = useSubscription(
    SUBSCRIPTION_CHAPTER_CHAT_MESSAGES,
    {
      variables: {account_uuid: accout, chapter_uuid: chapterId},
    },
  );

  const [SendTextMessage] = useMutation(SEND_TEXT_MESSAGE);

  const members = useQuery(GET_CHAPTER_MEMBERS_LIST, {
    variables: {
      chapter: chapterId,
    },
  });

  useEffect(() => {
    data &&
      messages &&
      setMessages(formatResponse(data?.rearden_chapter[0]?.content, accout));
  }, [data]);

  if (loading) return <Loader />;

  const chapterInfo = data?.rearden_chapter[0];

  const getRecipients = response => {
    const list = response?.data?.rearden_chapter[0]?.chapter_members;
    return list.map(item => {
      return item?.account?.id;
    });
  };

  const sendMessage = message => {
    SendTextMessage({
      variables: {
        text: message.text,
        chat_uuid: chat_uuid,
        owner_uuid: accout,
        recipient_uuids: getRecipients(members),
      },
    });
  };

  return (
    <View style={css(colors).container}>
      <View style={css(colors).headerContainer}>
        <Header
          navigation={navigation}
          details={{
            account: accout,
            chapter: chapterId,
            title: chapterInfo?.name,
            description: chapterInfo?.description,
            chat_uuid: chapterInfo?.chat_uuid,
          }}
        />
      </View>
      <Chat
        type="chapter"
        chapterId={chapterId}
        messagesList={messages}
        sendMessage={sendMessage}
      />
    </View>
  );
};

function formatResponse(messages, account) {
  const identicalFields = message => {
    return {
      _id: message.id,
      isRead: false,
      sending: false,
      createdAt: new Date(message.created_at),
      user: {
        _id: message?.owner_uuid === account ? 1 : 2,
        name: `${message.owner_profile?.first_name} ${message?.owner_profile?.last_name}`,
        avatar: `${
          message?.owner_profile?.avatar?.meta.link
            ? message?.owner_profile?.avatar?.meta.link
            : ''
        }`,
      },
    };
  };
  const fotmatMessageByType = (type, item) => {
    switch (type) {
      case 'message':
        const {message} = item;
        return {
          ...identicalFields(message),
          text: message.text,
          type: 'message',
        };
      case 'deal':
        const {chapter_case} = item;
        return {
          ...identicalFields(chapter_case),
          thread_uuid: chapter_case.thread_uuid,
          deal_title: chapter_case.name,
          attachment: {
            id: chapter_case?.attachment_uuid,
            name: chapter_case?.attachment?.meta?.name,
          },
          type: 'deal',
        };
      case 'idea':
        const idea = item?.chapter_case;
        return {
          test: 'test',
          ...identicalFields(idea),
          type: 'idea',
          idea_description: idea.description,
          thread_uuid: idea.thread_uuid,
          attachment: {
            id: idea?.attachment_uuid,
            name: idea?.attachment?.meta?.name,
          },
        };
    }
  };
  return messages.length
    ? messages.map(message => {
        return message?.chapter_case
          ? fotmatMessageByType(message?.chapter_case.type, message)
          : fotmatMessageByType('message', message);
      })
    : [];
}

const css = props => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    headerContainer: {
      backgroundColor: props.headerBackground,
    },

    containerInputToolBar: {
      backgroundColor: props.chatToolbar.background,
      paddingHorizontal: 4,
      paddingBottom: 25,
      bottom: -25,
    },
    composer: {
      backgroundColor: props.chatToolbar.input,
      color: props.chatToolbar.text,
      borderRadius: 8,
      marginLeft: 5,
      marginRight: 5,
      paddingTop: 10,
      paddingLeft: 10,
      marginTop: 10,
      marginBottom: 10,
    },
  });
};

export default ChapterChat;
