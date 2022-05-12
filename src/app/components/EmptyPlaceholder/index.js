import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from '../Icons';
import Typography from '../Typography';

const EmptyPlaceholder = ({icon, title, text, rotate}) => {
  const {
    colors: {text: colors},
  } = useTheme();

  return (
    <View style={rotate ? css.wrapperRotate : css.wrapper}>
      <Icon name={icon} size={48} color={colors.primary} />

      <View style={css.content}>
        <Typography text={title} size={18} customStyles={{marginTop: 14}} />
        <Typography
          text={text}
          size={14}
          customStyles={{marginTop: 10}}
          type="secondary"
        />
      </View>
    </View>
  );
};

const css = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapperRotate: {
    transform: [{scaleY: -1}],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    height: 52,
  },
});

export default EmptyPlaceholder;
