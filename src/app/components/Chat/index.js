import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

// GiftedChat
import {GiftedChat, InputToolbar, Composer} from 'react-native-gifted-chat';
import {renderBubble} from 'src/components/Chat/Bubble';
import ButtonsToolbar from 'src/components/Chat/ButtonsToolBar';

// UI
import EmptyPlaceholder from 'src/components/EmptyPlaceholder';
import Loader from 'src/components/Loader';

const Chat = ({type, chapterId, messagesList, title = '', sendMessage}) => {
  const [messages, setMessages] = useState(messagesList);
  const [inputValue, setInputValue] = useState();
  const {name, colors} = useTheme();

  useEffect(() => {
    setMessages(messagesList);
  }, [messagesList]);

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
    sendMessage(message);
  };

  return (
    <GiftedChat
      // TODO scroll to reply message
      // ref={giftedChatRef}r
      scrollToBottom={true}
      messages={messages}
      text={inputValue}
      onInputTextChanged={text => setInputValue(text)}
      onSend={() => handleSendMes(inputValue)}
      user={{
        _id: 1,
      }}
      renderChatEmpty={() => {
        return (
          <EmptyPlaceholder
            rotate={true}
            icon="Icon-46"
            title="No message yet"
            text="Get started by typing first message."
          />
        );
      }}
      // TODO edit-delete modal
      // onLongPress={onLongPress}
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
  );
};

const css = props => {
  return StyleSheet.create({
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

export default Chat;
