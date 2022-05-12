import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {interRegular} from '../../../fonts/font';

const Link = ({text, handleClick, customStyles}) => {
  return (
    <TouchableOpacity onPress={() => handleClick()}>
      <Text style={styles(customStyles).text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = props =>
  StyleSheet.create({
    text: {
      ...interRegular,
      fontSize: 14,
      color: '#60A5FA',
      padding: 10,
      ...props,
    },
  });

export default Link;
