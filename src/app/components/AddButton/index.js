import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {interMedium} from '../../../fonts/font';
import Icon from '../Icons';

const AddButton = ({disabled = false, text, onPress = () => {}, styles}) => {
  const {
    colors: {addButton: colors},
  } = useTheme();

  return (
    <View style={[css(colors).container, styles]}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={css(colors).button}>
        <Icon
          style={{transform: [{rotate: '45deg'}]}}
          name={'Icon-36'}
          size={24}
          color={colors.text}
        />
        <Text style={css(colors).text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const css = props => {
  return StyleSheet.create({
    button: {
      color: props.text,
      flexDirection: 'row',
      padding: 6,
    },

    text: {
      ...interMedium,
      paddingLeft: 8,
      fontSize: 18,
      lineHeight: 22,
      color: props.text,
    },
  });
};

export default AddButton;
