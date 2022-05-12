import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {interRegular} from '../../../fonts/font';
import Icon from '../Icons';

const Input = ({
  name,
  label,
  placeholder,
  isPassword = false,
  error,
  onBlur,
  onChangeText,
  value,
  touched,
  isNumeric = false,
  multiline = false,
  customHeigth = 40,
  customStyles,
  theme,
}) => {
  const {colors} = useTheme();
  const [isFocused, setFocuse] = useState(false);
  const [isSecure, setSecure] = useState(isPassword);

  return (
    <View style={styles(colors).wrapper}>
      <Text style={styles(theme || colors).label}>{label}</Text>
      <View style={styles(colors).toggle}>
        {isPassword && (
          <TouchableWithoutFeedback onPress={() => setSecure(!isSecure)}>
            <Icon
              name={isSecure ? 'Icon-21' : 'Icon-22'}
              size={18}
              color={'#9CA3AF'}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
      <TextInput
        style={{
          ...styles(theme || colors).input,
          height: customHeigth,
          ...customStyles,
          borderBottomColor:
            error?.length && touched
              ? theme?.inputErrorBr || colors.inputErrorBr
              : isFocused
              ? theme?.inputFocuseBr || colors.inputFocuseBr
              : 'transparent',
        }}
        onChangeText={onChangeText}
        onFocus={() => setFocuse(true)}
        onBlur={() => {
          onBlur();
          setFocuse(false);
        }}
        placeholder={placeholder}
        placeholderTextColor={
          theme?.inputPlaceholder || colors?.inputPlaceholder
        }
        secureTextEntry={isSecure}
        value={value}
        keyboardType={isNumeric ? 'numeric' : 'default'}
        multiline={multiline}
      />
      {error?.length && touched && (
        <Text style={styles(theme || colors).error}>{error}</Text>
      )}
    </View>
  );
};

const styles = props => {
  return StyleSheet.create({
    wrapper: {
      marginBottom: 16,
      position: 'relative',
      marginBottom: 16,
    },
    label: {
      ...interRegular,
      color: props.inputText,
      fontSize: 12,
      lineHeight: 14,
      textTransform: 'capitalize',
    },
    input: {
      // ...interRegular,
      backgroundColor: props.inputBg,
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 10,
      paddingRight: 10,
      color: props.inputText,
      borderRadius: 6,
      height: 40,
      shadowColor: 'rgba(15, 23, 42, 0.6)',
      shadowOffset: {
        width: 0,
        height: 20,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 8,
      borderBottomWidth: 2,
    },
    error: {
      ...interRegular,
      fontSize: 12,
      lineHeight: 15,
      color: props.inputErrors,
    },
    toggle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      right: 0,
      top: 16,
      width: 40,
      height: 40,
      zIndex: 2,
      elevation: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

export default Input;
