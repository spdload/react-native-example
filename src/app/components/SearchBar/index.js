import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {interRegular} from '../../../fonts/font';
import Icon from '../Icons';

const SearchBar = ({
  isFilter = true,
  error,
  customStyles,
  onChangeText,
  value,
  touched,
}) => {
  const {colors} = useTheme();
  const [isFocused, setFocuse] = useState(false);
  const combineStyles = {
    ...colors,
    customStyles,
  };
  return (
    <View style={styles(combineStyles).searchContainer}>
      <View style={styles(colors).inputContainer}>
        <Icon name="Icon-37" size={25} style={styles(colors).iconSearch} />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocuse(true)}
          onBlur={() => {
            setFocuse(false);
          }}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          placeholder="Search"
          style={{
            ...styles(colors).input,
            borderBottomColor:
              error?.length && touched
                ? colors.inputErrorBr
                : isFocused
                ? colors.inputFocuseBr
                : 'transparent',
          }}
          placeholderTextColor={colors.inputPlaceholder}
        />
      </View>
      {isFilter && (
        <View style={styles(colors).filterWrapper}>
          <TouchableOpacity style={styles(colors).filterButton}>
            <Icon name="Icon-27" style={styles(colors).iconFilter} size={20} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = props => {
  const {customStyles} = props;
  return StyleSheet.create({
    searchContainer: {
      width: '100%',
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 10,
      ...customStyles,
    },
    inputContainer: {
      paddingHorizontal: 5,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginRight: 8,
      backgroundColor: props.inputBg,
      shadowColor: props.inputShadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.2,

      elevation: 5,
    },

    iconSearch: {
      color: props.icon.search,
    },
    iconFilter: {
      color: props.icon.filter,
    },
    filterButton: {
      padding: 10,
      borderRadius: 35,
      backgroundColor: props.inputBg,
      shadowColor: props.inputShadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },

    input: {
      flex: 1,
      ...interRegular,
      backgroundColor: props.inputBg,
      paddingLeft: 10,
      borderRadius: 8,
      color: props.inputText,
      height: 40,
    },
    error: {
      ...interRegular,
      fontSize: 12,
      lineHeight: 15,
      color: props.inputErrors,
    },
  });
};

export default SearchBar;
