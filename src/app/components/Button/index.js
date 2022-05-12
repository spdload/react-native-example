import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {interRegular} from '../../../fonts/font';

const Button = ({
  type = 'primary',
  disabled = false,
  text,
  theme,
  onPress = () => {},
  styles,
}) => {
  const {
    colors: {button: colors},
  } = useTheme();

  return (
    <View style={[css(theme || colors).container, styles]}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={css(theme || colors, type, disabled).button}>
        <Text style={css(theme || colors, type, disabled).text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const css = (theme, type, disabled) => {
  let background;
  let text;
  let border;

  background = disabled ? theme[`${type}BgDisabled`] : theme[`${type}Bg`];
  text = disabled ? theme[`${type}TextDisabled`] : theme[`${type}Text`];
  border = disabled ? theme[`${type}BorderDisabled`] : theme[`${type}Border`];

  return StyleSheet.create({
    container: {
      width: '100%',
      height: 36,
    },

    button: {
      display: 'flex',
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: background,
      borderRadius: 6,
      borderColor: border,
      borderWidth: type === 'secondary' ? 1 : 0,
    },

    text: {
      ...interRegular,
      fontSize: 16,
      color: text,
    },
  });
};

export default Button;
