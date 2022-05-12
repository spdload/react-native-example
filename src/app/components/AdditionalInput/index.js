import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import Typography from 'src/components/Typography';
import {interRegular} from 'app/fonts/font';
import Icon from 'src/components/Icons';

const AdditionalInput = ({
  name,
  placeholder,
  onChangeText,
  value,
  removeAction,
  id,
  disabled,
  onConfirm,
  error,
}) => {
  const theme = useTheme();
  const {colors} = theme;
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [inputValue, setInputValue] = useState();

  return (
    <View style={styles(colors).wrapper}>
      {disabled ? (
        <>
          <View
            style={{
              ...styles(colors).input,
              backgroundColor: theme.name === 'dark' ? '#374151' : 'fff',
            }}>
            <Typography text={value} />
          </View>
          {removeAction && (
            <TouchableOpacity
              style={styles(colors).removeButton}
              onPress={() => removeAction(id)}>
              <Icon
                name="Icon-53"
                size={22}
                color={theme.name === 'dark' ? '#F87171' : 'blue'}></Icon>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <>
          <TextInput
            style={{
              ...styles(colors).input,
            }}
            onChangeText={text => {
              setInputValue(text);
              setIsValid(text?.length > 2);
            }}
            placeholder={placeholder}
            placeholderTextColor={colors.inputPlaceholder}
            value={value}
            onBlur={() => setTouched(true)}
          />
          <TouchableOpacity
            style={styles(colors).removeButton}
            onPress={() => isValid && onConfirm(inputValue)}>
            <Icon
              name="Icon-7"
              size={22}
              color={isValid ? '#60A5FA' : 'grey'}></Icon>
          </TouchableOpacity>
          {touched && !isValid && (
            <Text style={styles(colors).error}>{error}</Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = props =>
  StyleSheet.create({
    wrapper: {
      position: 'relative',
      marginBottom: 16,
    },
    input: {
      ...interRegular,
      backgroundColor: props.inputBg,
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 10,
      paddingRight: 10,
      color: props.inputText,
      borderBottomColor: 'transparent',

      borderRadius: 6,
      height: 40,
      shadowColor: props.inputShadow,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 3.84,
      borderBottomWidth: 2,
    },
    error: {
      ...interRegular,
      fontSize: 12,
      lineHeight: 15,
      color: props.inputErrors,
    },
    removeButton: {
      color: 'red',
      position: 'absolute',
      width: 40,
      height: 40,
      top: 0,
      right: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default AdditionalInput;
