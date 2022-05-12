import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

import {interRegular} from '../../../fonts/font';

const FormCheckBox = ({
  label,
  value = false,
  styles,
  disabled = false,
  handleChange,
}) => {
  const {
    colors: {checkbox: colors},
  } = useTheme();

  const [checked, setChecked] = useState(value);

  useEffect(() => {
    setChecked(value);
  }, [value]);

  return (
    <View style={[css(colors).container]}>
      <View>
        <CheckBox
          onChange={() => {
            if (!disabled) {
              handleChange();
            }
          }}
          value={checked}
          style={css(colors).checkbox}
          tintColors={{true: colors.true, false: colors.false}}
          lineWidth={1}
          tintColor={'rgba(0, 0, 0, 0)'}
          onCheckColor={'#FFFFFF'}
          onFillColor={colors.true}
          onTintColor={colors.true}
          disabled={disabled}
        />
      </View>
      <Text onPress={() => handleChange()} style={css(colors).label}>
        {label}
      </Text>
    </View>
  );
};

const css = (theme, type) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
    },
    checkbox: {
      alignSelf: 'center',
      width: 20,
      height: 20,
      backgroundColor: theme.bg,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.br,
      borderStyle: 'solid',
      marginRight: 8,
    },
    label: {
      ...interRegular,
      fontSize: 14,
      color: theme.label,
    },
  });

export default FormCheckBox;
