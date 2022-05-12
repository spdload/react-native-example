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

const InputSearch = ({name, placeholder, customStyles, handleClose}) => {
  const {colors} = useTheme();
  const [isFocused, setFocuse] = useState(false);

  return (
    <View style={styles(colors).wrapper}>
      <View style={styles(colors).searchIcon}>
        <Icon name="Icon-37" size={15} color="#CBD5E1" />
      </View>
      <TextInput
        style={{
          ...styles(colors).input,
          ...customStyles,
        }}
        // onChangeText={onChangeText}
        onFocus={() => setFocuse(true)}
        onBlur={() => {
          setFocuse(false);
        }}
        placeholder={placeholder}
        placeholderTextColor={colors.inputPlaceholder}
      />
      {handleClose && (
        <View style={styles(colors).closeIcon}>
          <TouchableWithoutFeedback onPress={() => handleClose()}>
            <Icon name="Icon-36" size={15} color="#CBD5E1" />
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
};

const styles = props =>
  StyleSheet.create({
    wrapper: {
      marginBottom: 16,
      flex: 1,
      borderColor: 'transparent',
      marginTop: 20,
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
      paddingLeft: 32,
      paddingRight: 10,
      color: props.inputText,
      borderRadius: 6,
      height: 40,
      shadowRadius: 3.84,
      elevation: 8,
      position: 'relative',
      shadowColor: 'rgba(15, 23, 42, 0.6)',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.1,
    },
    error: {
      ...interRegular,
      fontSize: 12,
      lineHeight: 15,
      color: props.inputErrors,
    },
    toggle: {
      position: 'absolute',
      right: 0,
      top: 16,
      width: 40,
      height: 40,
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchIcon: {
      position: 'absolute',
      left: 6,
      top: 12,
      zIndex: 10,
    },
    closeIcon: {
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 10,
      height: 40,
      width: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default InputSearch;
