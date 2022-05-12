import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import PhoneInput from 'react-native-phone-input';
import {interRegular} from 'app/fonts/font';

const InputPhoneNumber = ({values, errors, name, label, setValue, touched}) => {
  const {colors} = useTheme();
  const phoneInput = useRef(null);

  const [phone, setPhone] = useState(values[name]);

  useEffect(() => {
    const isValid = phoneInput?.current?.isValidNumber(phone);
    setValue(name, phone, isValid);
  }, [phone]);

  return (
    <View style={styles(colors).wrapper}>
      <Text style={styles(colors).label}>{label}</Text>
      <View
        style={{
          ...styles(colors).input,
          borderColor:
            touched[name] && errors[name] ? colors.inputErrorBr : 'transparent',
        }}>
        <PhoneInput
          ref={phoneInput}
          r
          initialValue={values[name]}
          autoFormat={true}
          onChangePhoneNumber={value => setPhone(value)}
          initialCountry={'ae'}
          textProps={{
            color: colors.inputText,
          }}
        />
      </View>
      {touched[name] && errors[name] && (
        <Text style={styles(colors).error}>{errors[name]}</Text>
      )}
    </View>
  );
};

const styles = props =>
  StyleSheet.create({
    wrapper: {
      marginBottom: 16,
      position: 'relative',
    },
    label: {
      ...interRegular,
      color: props.inputText,
      fontSize: 12,
      lineHeight: 14,
      textTransform: 'capitalize',
    },
    flagButtonStyle: {
      backgroundColor: props.inputBg,
      color: props.inputText,
      borderTopLeftRadius: 6,
      borderBottomLeftRadius: 6,
      width: 50,
    },
    input: {
      ...interRegular,
      paddingTop: 8,
      paddingLeft: 8,
      paddingBottom: 8,
      height: 40,
      shadowColor: props.inputShadow,
      shadowOpacity: 0.05,
      shadowRadius: 3.84,
      backgroundColor: props.inputBg,
      borderBottomRightRadius: 6,
      borderTopRightRadius: 6,
      color: props.inputText,
      elevation: 8,
      borderBottomWidth: 2,
    },
    error: {
      ...interRegular,
      fontSize: 12,
      lineHeight: 15,
      color: props.inputErrors,
    },
  });

export default InputPhoneNumber;
