import React from 'react';
import {Text, Image, View} from 'react-native';
import {Bubble, MessageText} from 'react-native-gifted-chat';
import ReplyIcon from '../../../assets/images/reply-icon.svg';
import ContextMenu from 'react-native-context-menu-view';

import LoaderImage from '../../../assets/images/small-loader.gif';
import CheckIcon from '../../../assets/images/check-icon.svg';
import DoubleCheckIcon from '../../../assets/images/double-check.svg';
import DealMessage from 'src/components/Chat/DealMessage';

export const renderBubble = props => {
  const {currentMessage} = props;

  const renderStatusIndicator = () => {
    if (currentMessage?.sending)
      return (
        <Image source={LoaderImage} style={{width: 12, height: 12}}></Image>
      );
    if (currentMessage?.isRead) return <DoubleCheckIcon fill="#E2E8F0" />;
    return <CheckIcon />;
  };

  if (currentMessage.type === 'deal' || currentMessage.type === 'idea') {
    return (
      <DealMessage
        message={currentMessage}
        chatProps={props}
        type={currentMessage.type}
      />
    );
  }
  return (
    // <ContextMenu
    //   actions={[
    //     {title: 'Pin', systemIcon: 'pin'},
    //     {title: 'Edit', systemIcon: 'pencil'},
    //     {
    //       title: 'Delete',
    //       destructive: true,
    //       inlineChildren: true,
    //       systemIcon: 'trash',
    //     },
    //   ]}
    //   onPress={e => {}}>
    <>
      <Bubble
        {...props}
        textStyle={{
          left: {
            color: props?.name === 'dark' ? '#FFFFFF' : '#0F172A',
          },
          right: {
            color: '#FFFFFF',
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: props?.name === 'dark' ? '#1F2937' : '#F8FAFC',
            display: 'flex',
            marginTop: 15,
            flexDirection: 'row',
            borderBottomLeftRadius: 0,
          },
          right: {
            backgroundColor: '#1D4ED8',
            marginTop: 15,
            left: 0,
            marginBottom: 15,
            borderBottomRightRadius: 0,
          },
        }}
        tickStyle={{color: 'transparent'}}
        timeTextStyle={{
          left: {color: '#94A3B8'},
          right: {color: '#E2E8F0', marginRight: 15},
        }}
      />
      {currentMessage.user._id === 1 ? (
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            right: 5,
            width: 15,
            height: 15,
          }}>
          {renderStatusIndicator()}
        </View>
      ) : (
        <></>
      )}
    </>
    // </ContextMenu>
  );
};
