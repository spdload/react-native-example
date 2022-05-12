import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from '../Icons';
import {useTheme} from '@react-navigation/native';

import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import EmojiBoard from 'react-native-emoji-board';
import PhotoVideoPicker from '../PhotoVideoPicker';

const ChatToolbar = () => {
  const {colors} = useTheme();

  const [showEmoji, setShowEmoji] = useState(false);
  const onClickEmoji = emoji => {};

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  return (
    <>
      <View style={css(colors).wrapper}>
        <View style={css(colors).input}>
          <InputToolbar
            onPressActionButton={null}
            // {...props}
            containerStyle={css(colors).input}
          />
        </View>
        <View style={css(colors).buttonsPanel}>
          <View style={css(colors).attachmentsButtons}>
            <TouchableOpacity onPress={() => alert('clicked')}>
              <Icon name="Icon-33" size={24} color={colors.chatToolbar.icons} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('clicked')}>
              <Icon name="Icon-43" size={24} color={colors.chatToolbar.icons} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => alert('setPhotoVideoPickerVisible()')}>
              <Icon name="Icon-57" size={24} color={colors.chatToolbar.icons} />
            </TouchableOpacity>
          </View>
          <View style={css(colors).rightPanel}>
            <TouchableOpacity onPress={() => setShowEmoji(!showEmoji)}>
              <Icon name="Icon-34" size={24} color={colors.chatToolbar.icons} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('clicked')}>
              <Icon name="Icon-11" size={24} color={colors.chatToolbar.icons} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <EmojiBoard
        showBoard={showEmoji}
        onClick={onClickEmoji}
        onRemove={() => setShowEmoji(!showEmoji)}
        containerStyle={css.emojiKeyboard}
      />
    </>
  );
};

const css = props => {
  return StyleSheet.create({
    wrapper: {
      display: 'flex',
      justifyContent: 'space-around',
      paddingRight: 5,
      paddingLeft: 5,
      // marginTop: 280,
      backgroundColor: props.inputBg,
      height: 121,
      borderTopWidth: 1,
      borderTopColor: props.chatToolbar.borderTop,
    },
    input: {
      backgroundColor: props.dropdown.badgeBg,
      height: 44,
      borderRadius: 8,
    },
    buttonsPanel: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '95%',
      marginLeft: 8,
      paddingBottom: 18,
    },
    attachmentsButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 110,
    },
    rightPanel: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 70,
    },
    emojiKeyboard: {},
  });
};
export default ChatToolbar;
