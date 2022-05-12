import React, {useState, useEffect, useCallback} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {bottomNavigationUser, bottomNavigationAdmin} from './data';
import {useRoute} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import Typography from '../Typography';
import {getItem} from '../../helpers';
import {useRole} from 'src/helpers/useRole';

export const BottomNavigation = ({navigation}) => {
  const {colors} = useTheme();
  const {name} = useRoute();
  const [role] = useRole();
  const [tabData, setTabData] = useState();

  useEffect(() => {
    if (role) {
      role === 'user' && setTabData(bottomNavigationUser);
      role === 'admin' && setTabData(bottomNavigationAdmin);
    }
  }, [role]);

  return (
    <>
      {tabData && (
        <View style={css(colors).container}>
          {tabData.map((tab, index) => {
            return (
              <TouchableOpacity
                key={`nav-item-${index}`}
                onPress={() => navigation.navigate(tab.redirectTo)}
                style={css(colors).navItem}>
                <View style={css(colors).icon} key={tab.id}>
                  {name === tab.redirectTo
                    ? tab.iconActive(colors.typography.additional)
                    : tab.icon(colors.typography.nonactive)}
                </View>
                <Typography
                  variant={name === tab.redirectTo ? 'additional' : 'nonactive'}
                  size={13}
                  text={tab.name}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </>
  );
};

const css = props => {
  return StyleSheet.create({
    container: {
      backgroundColor: props.backgroundBtm,
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderRadius: 56,
      bottom: 25,
      left: 0,
      right: 0,
      height: 60,
      shadowOpacity: 0.75,
      shadowRadius: 5,
      shadowColor: 'rgba(15, 23, 42, 0.1)',
      shadowOffset: {height: 0, width: 0},
      marginHorizontal: 25,
    },
    navItem: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '20%',
    },
    icon: {
      marginBottom: '5%',
    },
  });
};
