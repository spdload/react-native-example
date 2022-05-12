import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {interRegular} from '../../../fonts/font';
import Icon from '../Icons';

const ButtonBack = ({text, pressAction}) => {
  const {
    colors: {text: colors},
  } = useTheme();

  return (
    <TouchableOpacity onPress={() => pressAction()}>
      <View style={styles(colors).wrapper}>
        <Icon name="Chevron-left-1" size={15} color={colors.primary} />
        <Text style={styles(colors).text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = props =>
  StyleSheet.create({
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    text: {
      ...interRegular,
      fontSize: 16,
      color: props.primary,
    },
  });

export default ButtonBack;
