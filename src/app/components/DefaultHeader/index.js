import React, {useState, useMemo, useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import DefaultUserImage from '../DefaultUserImage';
import Icon from '../Icons';
import Logo from '../Logo';
import * as routes from '../../constants/routes';
import InputSearch from 'src/components/InputSearch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from '@apollo/client';
import {GET_MY_AVATAR} from '../../queries/queries';

const DefaultHeader = ({imgSrc, navigation}) => {
  const [openSearch, toogleSearch] = useState(false);
  const {
    colors: {text: colors},
  } = useTheme();
  const [accout, setAccount] = useState();

  useEffect(() => {
    AsyncStorage.getItem('@account_id').then(id => {
      setAccount(id);
    });
  }, []);

  const profileAvatar = useQuery(GET_MY_AVATAR, {
    variables: {
      accountId: accout,
    },
  });
  return (
    <View style={css.wrapper}>
      {openSearch ? (
        <InputSearch
          placeholder="Search..."
          handleClose={() => toogleSearch(false)}
        />
      ) : (
        <>
          <TouchableOpacity onPress={() => toogleSearch(true)}>
            <Icon
              name="Icon-37"
              size={30}
              color={colors.primary}
              style={css.searchIcon}
            />
          </TouchableOpacity>

          <Logo size={40} />

          <View style={css.userImage}>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.MY_PROFILE, {accout})}>
              {profileAvatar.loading ? null : profileAvatar.data
                  ?.rearden_profile[0]?.avatar !== null ? (
                <Image
                  source={{
                    uri: profileAvatar.data?.rearden_profile[0]?.avatar?.meta
                      ?.link,
                  }}
                  style={{width: 40, height: 40, borderRadius: 20}}
                />
              ) : (
                <DefaultUserImage size={34} borderRadius={20} />
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const css = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? '10%' : '1%',
    paddingRight: 12,
    paddingLeft: 12,
    height: 55,
  },
  searchIcon: {
    paddingTop: 10,
  },
  userImage: {
    paddingTop: 10,
  },
});

export default DefaultHeader;
