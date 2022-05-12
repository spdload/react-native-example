import React, {useState, useEffect, useRef} from 'react';
import {useTheme} from '@react-navigation/native';
import {View, Alert, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {GiftedChat, InputToolbar, Composer} from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

// UI
import ButtonBack from 'src/components/ButtonBack';
import Typography from 'src/components/Typography';
import EmptyPlaceholder from 'src/components/EmptyPlaceholder';
import Icon from '../../../components/Icons';
import {renderBubble} from 'src/components/Chat/Bubble';
import ButtonsToolbar from 'src/components/Chat/ButtonsToolBar';
import Link from '../../../components/Link';
import * as routes from 'src/constants/routes';
import {navigationRef} from '../../../AppContainer';
import Loader from '../../../components/Loader';
import {useQuery, useMutation} from '@apollo/client';
import {SUBSCRIPTION_LAST_MESSAGE_CHAT} from 'src/queries/subscriptions';
import {GET_CHAT_MEMBERS, GET_CHAT_MESSAGES} from 'src/queries/queries';
import {SEND_TEXT_MESSAGE} from 'src/queries/mutations';

const Chat = ({navigation, route}) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const {type, count, avatar, title, id, chapterId} = route.params;
  const {name, colors} = useTheme();
  const [account_uuid, setAcount] = useState();
  useEffect(() => {
    AsyncStorage.getItem('@account_id').then(id => {
      setAcount(id);
    });
  }, []);

  const memeberstList = useQuery(GET_CHAT_MEMBERS, {
    variables: {
      chat_id: id,
      account_id: account_uuid,
    },
  });

  const chatMessages = useQuery(GET_CHAT_MESSAGES, {
    variables: {
      chat_id: id,
      account_uuid,
    },
  });

  const formatMessages = list => {
    return list.map(message => {
      return {
        _id: message?.id,
        text: message?.text,
        type: 'message',
        createdAt: new Date(message?.created_at),
        sending: false,
        isRead: true,
        user: {
          _id: message?.owner_uuid === account_uuid ? 1 : 2,
          name: 'React Native',
          avatar: message?.owner_profile?.avatar?.meta?.link,
        },
      };
    });
  };

  const [SendTextMessage, {data, loading, error}] = useMutation(
    SEND_TEXT_MESSAGE,
    {
      refetchQueries: [
        {
          query: GET_CHAT_MESSAGES,
          variables: {
            chat_id: id,
            account_uuid,
          },
        },
      ],
    },
  );

  const getRecipients = members => {
    const list = members?.rearden_chat_connections[0]?.chat?.chat_connections;
    return list.map(item => {
      return item?.account?.id;
    });
  };
  useEffect(() => {
    account_uuid && subscribeToNewMessages();
  }, [account_uuid, messages]);

  useEffect(() => {
    const list = chatMessages.data?.rearden_chat[0]?.messages;
    if (list?.length) {
      setMessages(formatMessages(list));
    }
  }, [chatMessages.data?.rearden_chat[0]?.messages, account_uuid]);

  const subscribeToNewMessages = () => {
    chatMessages.subscribeToMore &&
      chatMessages.subscribeToMore({
        document: SUBSCRIPTION_LAST_MESSAGE_CHAT,
        variables: {
          chatId: id,
          accountId: account_uuid,
        },

        updateQuery: (prev, {subscriptionData}) => {
          const checkID = obj =>
            obj.id === subscriptionData.data.rearden_chat[0].messages[0].id;
          if (prev?.rearden_chat[0].messages.some(checkID)) {
            return prev;
          }
          const newFeedItem = subscriptionData.data.rearden_chat[0].messages[0];
          const obj = {
            ...prev,
            rearden_chat: [
              {
                ...prev?.rearden_chat[0],
                messages: [newFeedItem, ...prev?.rearden_chat[0].messages],
              },
            ],
          };
          return obj;
        },
      });
  };

  const giftedChatRef = useRef();

  const scrollTo = () => {
    giftedChatRef.current?._messageContainerRef?.current?.scrollToIndex({
      animated: true,
      index: 5,
    });
  };

  const updateMessageList = (uuid, savedMes) => {
    let index;
    const message = messages.filter((message, i) => {
      if (message._id === uuid) {
        index = i;
        return message;
      }
    });
    const copyArr = [...messages];
    copyArr[index] = {
      ...copyArr[index],
      _id: savedMes?.insert_rearden_message_one?.id,
      sending: false,
      isRead: false,
    };
    setMessages(copyArr);
  };

  useEffect(() => {
    if (messages[0]?.sending) {
      sendMessageRequest(messages[0]);
    }
  }, [messages]);

  const sendMessageRequest = message => {
    SendTextMessage({
      variables: {
        text: message.text,
        chat_uuid: id,
        owner_uuid: account_uuid,
        recipient_uuids: getRecipients(memeberstList?.data),
      },
    })
      .then(res => {
        updateMessageList(message._id, res.data);
      })
      .catch(error => console.error('error', error));
  };

  const handleSendMes = text => {
    const uuid = uuidv4();
    const message = {
      _id: `${uuid}`,
      text,
      type: 'message',
      createdAt: new Date(),
      sending: true,
      isRead: false,
      user: {
        _id: 1,
      },
    };
    setMessages([message, ...messages]);
  };

  const onLongPress = (context, message) => {
    setIsOpenDialog(true);
  };

  return (
    <View style={css(colors).container}>
      <View style={css(colors).headerContainer}>
        <View style={css(colors).header}>
          <View style={css(colors).topControls}>
            <ButtonBack
              text="Back"
              pressAction={() => {
                navigation.navigate(routes.HOME);
              }}
            />
          </View>
          <View>
            <Typography
              customStyles={
                type === 'chapter'
                  ? css(colors).titleHeader
                  : css(colors).titleThread
              }
              text={title}
              size={18}
              type="bold"
            />
          </View>

          {type === 'group' && (
            <TouchableOpacity
              style={css(colors).avatar}
              onPress={() =>
                navigationRef.current.navigate(routes.GROUP_DETAILS, {
                  title: title,
                })
              }>
              <Image
                style={css(colors).groupAvatar}
                source={{
                  uri: `${avatar}`,
                }}
              />
            </TouchableOpacity>
          )}
          {type === 'chapter' ? (
            <TouchableOpacity
              style={css(colors).avatar}
              onPress={() => setOpenInfo(true)}>
              <Typography text="Info" customStyles={{color: '#60A5FA'}} />
            </TouchableOpacity>
          ) : null}
          {type === 'idea' ? <View style={{width: 40}} /> : null}
          {type === 'deal' ? <View style={{width: 40}} /> : null}
          {type === 'chat' ? (
            <TouchableOpacity style={css(colors).avatar}>
              <Image
                style={css(colors).groupAvatar}
                source={{
                  uri: `${avatar}`,
                }}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        {type === 'deal' ? (
          <View style={css(colors).footer}>
            <View style={css(colors).document}>
              <View style={css(colors).documentTitle}>
                <Icon name="Icon-15" size={32} color={'#9CA3AF'} />
                <Typography text="Doc" type="Regular" size={14} />
              </View>
              <TouchableOpacity>
                <Icon name="Icon-60" size={28} color={'#60A5FA'} />
              </TouchableOpacity>
            </View>
            <Link
              text="View deals detail"
              handleClick={() =>
                navigationRef.current.navigate(routes.DEALS_DETAILS, {
                  titleDeal: title,
                })
              }
              customStyles={css(colors).linkCustom}
            />
            <View style={css(colors).subFooter}>
              <Typography text={`${count} replies`} type="Regular" size={12} />
            </View>
          </View>
        ) : null}
        {type === 'idea' ? (
          <View style={css(colors).footer}>
            <View style={css(colors).document}>
              <View style={css(colors).documentTitle}>
                <Icon name="Icon-15" size={32} color={'#9CA3AF'} />
                <Typography text="Doc" type="Regular" size={14} />
              </View>
              <TouchableOpacity>
                <Icon name="Icon-60" size={28} color={'#60A5FA'} />
              </TouchableOpacity>
            </View>
            <Link
              text="View idea detail"
              handleClick={() =>
                navigationRef.current.navigate(routes.IDEAS_DETAILS, {
                  titleDeal: 'Idea',
                })
              }
              customStyles={css(colors).linkCustom}
            />
            <View style={css(colors).subFooter}>
              <Typography text={`${count} replies`} type="Regular" size={12} />
            </View>
          </View>
        ) : null}
      </View>
      <GiftedChat
        ref={giftedChatRef}
        scrollToBottom={true}
        messages={messages}
        text={inputValue}
        onInputTextChanged={text => setInputValue(text)}
        onSend={() => handleSendMes(inputValue)}
        user={{
          _id: 1,
        }}
        renderChatEmpty={() => {
          return !loading && chatMessages?.data ? (
            <EmptyPlaceholder
              rotate={true}
              icon="Icon-46"
              title="No message yet"
              text="Get started by typing first message."
            />
          ) : (
            <></>
          );
        }}
        onLongPress={onLongPress}
        renderBubble={props => renderBubble({...props, title, name})}
        renderAccessory={props => {
          return (
            <ButtonsToolbar
              {...props}
              chapterId={chapterId}
              handleSendMes={handleSendMes}
              type={type}
            />
          );
        }}
        renderLoading={() => <Loader />}
        renderInputToolbar={props => {
          return (
            <InputToolbar
              {...props}
              containerStyle={css(colors).containerInputToolBar}
              accessoryStyle={{height: 35}}
              renderSend={() => null}
              renderComposer={props => (
                <Composer textInputStyle={css(colors).composer} {...props} />
              )}
            />
          );
        }}
      />
    </View>
  );
};

const css = props => {
  return StyleSheet.create({
    containerInputToolBar: {
      backgroundColor: props.chatToolbar.background,
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
    container: {
      flex: 1,
    },
    headerContainer: {
      backgroundColor: props.headerBackground,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: Platform.OS === 'ios' ? '10%' : '1%',
      paddingRight: 10,
      width: '100%',
    },
    titleHeader: {
      paddingTop: 10,
    },
    titleThread: {
      paddingTop: 10,
    },
    avatar: {
      paddingVertical: 10,
      color: props.text.primary,
    },

    //Document Idea/Deal

    footer: {
      padding: 10,
      backgroundColor: props.deal.backgroundPinnedDocument,
    },
    document: {
      marginTop: 2,
      marginBottom: 10,
      flexDirection: 'row',
      padding: 10,
      alignItems: 'center',
      backgroundColor: props.chatToolbar.input,
      justifyContent: 'space-between',
      borderRadius: 8,
    },
    documentTitle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    subFooter: {
      borderBottomColor: 'black',
      paddingTop: 10,
      borderTopWidth: 1,
    },
    linkCustom: {
      alignSelf: 'flex-end',
      padding: 0,
      marginBottom: 10,
      fontSize: 14,
    },
    groupAvatar: {
      height: 30,
      width: 30,
      borderRadius: 20,
    },
  });
};

export default Chat;
