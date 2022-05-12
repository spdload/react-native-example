import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {interRegular} from '../../../fonts/font';

import DropDownPicker from 'react-native-dropdown-picker';
import Icon from '../Icons';
import Badge from './Badge';

const Dropdown = ({
  multiple = false,
  disabled = false,
  placeholder = multiple ? 'Select items' : 'Select item',
  handleSelect,
  label = 'Select',
  selectStyles,
  touched,
  error,
  styles,
  isFocused = false,
  zIndex = 1,
  list,
  defaultValue = [],
}) => {
  const {
    colors: {dropdown: colors},
  } = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [items, setItems] = useState(list);

  useEffect(() => {
    handleSelect && handleSelect(value);
  }, [value]);

  const searchable = items.length > 10;

  return (
    <>
      <View style={[css(colors).container, styles]}>
        <Text style={css(colors).label}>{label}</Text>
        <DropDownPicker
          listMode="SCROLLVIEW"
          dropDownDirection="BOTTOM"
          theme="DARK"
          mode="BADGE"
          disabled={disabled}
          placeholder={placeholder}
          multiple={multiple}
          searchable={searchable}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          maxHeight={282}
          style={[
            {
              ...css(colors).select,
              selectStyles,
              borderBottomColor:
                error?.length && touched
                  ? colors.inputErrorBr
                  : isFocused
                  ? colors.inputFocuseBr
                  : 'transparent',
            },
          ]}
          disableBorderRadius={false}
          labelStyle={css(colors).textFilled}
          textStyle={css(colors).textStyle}
          placeholderStyle={css(colors).placeholderText}
          selectedItemLabelStyle={css(colors).textSelected}
          dropDownContainerStyle={css(colors, zIndex).dropdownMenu}
          searchContainerStyle={css(colors).searchContainer}
          searchTextInputStyle={css(colors).searchInput}
          badgeTextStyle={css(colors).badgeTextStyle}
          badgeStyle={css(colors).badgeStyle}
          badgeColors={colors.badgeBg}
          badgeDotStyle={css(colors).badgeDotStyle}
          renderBadgeItem={props => <Badge {...props} />}
          showTickIcon={multiple}
          TickIconComponent={({style}) => (
            <Icon name="Icon-31" size={20} color="#1D4ED8" />
          )}
        />
      </View>
      {error?.length && touched ? (
        <Text style={css(colors).error}>{error}</Text>
      ) : (
        <></>
      )}
    </>
  );
};

const css = (theme, value) => {
  return StyleSheet.create({
    label: {
      ...interRegular,
      fontSize: 12,
      color: theme.label,
      paddingBottom: 4,
      paddingLeft: 4,
    },

    textStyle: {
      ...interRegular,
      color: theme.textStyle,
      fontSize: 14,
    },

    textSelected: {
      ...interRegular,
      color: theme.textSelected,
      fontWeight: 'bold',
    },

    textFilled: {
      ...interRegular,
      color: theme.textFilled,
    },

    placeholderText: {
      ...interRegular,
      color: theme.placeholderText,
      fontSize: 14,
    },

    container: {
      height: 50,
      color: theme.placeholder,
    },

    select: {
      backgroundColor: theme.selectBg,
      borderColor: theme.selectBorder,
      borderBottomColor: theme.selectBorderBottom,
      height: 40,
    },

    dropdownMenu: {
      backgroundColor: theme.selectBg,
      borderColor: theme.selectBorder,
      borderBottomColor: theme.selectBorderBottom,
      marginTop: 2,
      marginBottom: 2,
      maxHeight: 130,
      position: 'relative',
      top: 0,
      zIndex: value,
    },
    badgeStyle: {
      borderRadius: 20,
      flexDirection: 'row-reverse',
    },

    badgeTextStyle: {
      color: theme.badgeText,
    },

    badgeDotStyle: {
      marginRight: 0,
      marginLeft: 5,
      color: theme.badgeIcon,
    },

    searchContainer: {
      padding: 0,
      borderBottomWidth: 0,
      color: theme.textStyle,
    },

    searchInput: {
      color: theme.textStyle,
      borderColor: theme.selectBorder,
      borderBottomColor: theme.selectBorderBottom,
    },
    error: {
      ...interRegular,
      fontSize: 12,
      lineHeight: 15,
      color: theme.errors,
      marginTop: 8,
    },
  });
};

export default Dropdown;
