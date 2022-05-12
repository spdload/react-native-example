import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Typography from '../Typography';
const Radio = ({
  options = [],
  horizontal = false,
  onChangeSelect,
  selected,
}) => {
  const {colors} = useTheme();


  return (
    <View
      style={horizontal ? styles(colors).horizontal : styles(colors).vertical}>
      {options.map((opt, index) => (
        <TouchableOpacity
          style={styles(colors).optContainer}
          onPress={() => onChangeSelect(opt, index)}>
          <View style={styles(colors).outlineCircle}>
            {selected === index && <View style={styles(colors).innerCircle} />}
          </View>
          <View style={styles(colors).textContainer}>
            <View>
              <Typography
                text={opt.value}
                theme={colors?.typography}
                size={14}
                type="bold"
                custom
              />
            </View>
            {opt.hasOwnProperty('description') ? (
              <View>
                <Typography
                  text={opt.description}
                  theme={colors?.typography}
                  size={14}
                />
              </View>
            ) : (
              <View />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = props =>
  StyleSheet.create({
    horizontal: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },

    optContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    outlineCircle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderColor: '#CBD5E1',
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerCircle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#FFFFFF',
      borderColor: '#1D4ED8',
      borderWidth: 6,
    },
    textContainer: {
      marginLeft: 10,
    },
    title: {
      marginLeft: 7,
    },
  });

export default Radio;
