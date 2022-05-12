import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {interRegular, interMedium} from '../../../fonts/font';
import {useTheme} from '@react-navigation/native';

const Typography = ({
  text,
  size = 16,
  customStyles,
  variant = 'primary',
  type = 'regular',
  linesNumbers = null,
  theme,
}) => {
  const {
    colors: {typography: colors},
  } = useTheme();

  const combineStyles = {
    ...colors,
    ...theme,
    size,
    customStyles,
    variant,
    type,
  };
  return (
    <Text numberOfLines={linesNumbers} style={styles(combineStyles).text}>
      {text}
    </Text>
  );
};

const styles = props => {
  const {size, type, variant, customStyles} = props;
  const fontStyles = type === 'regular' ? interRegular : interMedium;
  return StyleSheet.create({
    text: {
      ...fontStyles,
      fontSize: size,
      color: props[variant],
      ...customStyles,
    },
  });
};

export default Typography;
